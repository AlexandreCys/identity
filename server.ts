import * as io from 'socket.io-client'
import Server from '../../common/server/abstract/server'
import getterMessageTransferObject from '../../common/mto/get.mto'

class CmsService extends Server {

  constructor () {
    super();

    this.io = io.connect(`${this.config.base.url}:${this.config.base.port}`, <any>{
      reconnect: true,
      query: "type=cms",
    });

    this.initSocket()
  }

  private initSocket (): void {
    this.io.on('connect', () : void => { 
      console.log('Authenticate service connected')
    
      this.io.emit('action', new getterMessageTransferObject('services', ['authenticate', 1]));
    });
  }
  
}

export default new CmsService()