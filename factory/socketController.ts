import { get } from 'lodash'
import UserSocketController from "../controller/socket/user"

class socketControllerFactory {

    private static classList : any = {
      User : new UserSocketController(),
    }

    public static getInstance(className : string) : any {
      return get(socketControllerFactory.classList, className);
    }

}

export default socketControllerFactory;