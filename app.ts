import logger from '../../common/logger/logger'
import socketServer from './server/socketServer'

class IdentityServer {

  constructor () {
    (<any>global).logger = new logger('identity.log');
    (<any>global).socketServer = new socketServer();
  }

}

export default new IdentityServer();