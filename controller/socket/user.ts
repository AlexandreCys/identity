import SocketController from '../../../../common/socket/abstract/socketController'

class UserSocketController extends SocketController {
  
  public create(uuid : string) : void {
      console.log('SET RECEIVE MESSAGE');

      //CALLBACK
      this.socket.emit('Identity', 'onCreateUser', [uuid]);
  }

}

export default UserSocketController;