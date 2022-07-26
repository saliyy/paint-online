import IAction from "~/actions/IAction";
import {ActionMessage} from "~/actions/ActionMessage";
import {useWS} from "~/store/wsState";
import {User, useUserStore} from "~/store/userStore";

export default class UserConnectedAction implements IAction {

    readonly method: string = this.constructor.name

    user: User = useUserStore().getUser;

    message: ActionMessage

    payload: [];

    constructor(payload: []) {
        this.payload = payload
        this.message = new ActionMessage()
    }

    public async send() {
        this.message.setMessage(`Пользователь ${this.user.name} подключился к системе`)
        await useWS().sendAction(this)
    }

    public async receive(payload: []) {

    }
}