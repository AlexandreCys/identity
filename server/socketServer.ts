import * as io from 'socket.io-client'
import { get } from 'lodash'
import SocketServer from '../../../common/server/abstract/socketServer'
import SocketController from '../../../common/socket/abstract/socketController'
import socketControllerFactory from "../factory/socketController"

class IdentityService extends SocketServer {

  constructor () {
    super();

    this._io = io.connect(`${this.config.socket.url}:${this.config.socket.port}`, <any>{
      reconnect: true,
      query: "type=identity",
    });

    let patch = require('socketio-wildcard')(io.Manager);
    patch(this._io);
    
    this._logger.debug(`#IDENTITY::Socket Client Launched(${this.config.socket.url}:${this.config.socket.port})`); 

    this.initSocket()
  }

  private initSocket (): void {
    this.io.on('connect', () : void => { 

      this.io.on('*', ((packet : any) : any => {
        let serviceName : string = packet.data[0];
        let methodName : string = packet.data[1];
        let args : any[] = packet.data[2] || [];

        let instance : SocketController = socketControllerFactory.getInstance(serviceName);
        let method : Function = get(instance, methodName);

        try { 
          return method.apply(instance, args);
        } catch(err) { 
          this._logger.error(`#IDENTITY::Method::${serviceName}::${methodName} not found!`);
        }
      }));
    });
  }
  
}

export default IdentityService;