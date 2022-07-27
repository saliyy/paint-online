import IAction from "~/actions/IAction";
import {User, useUserStore} from "~/store/userStore";
import {useWS} from "~/store/wsState";

export default abstract class ActionStrategy implements IAction {
    message: string;

    readonly method: string = this.constructor.name;

    user: User = useUserStore().getUser;

    payload: any;

    protected constructor(payload: any) {
        this.payload = payload
    }

    public async send() {
        await useWS().sendAction(this)
    }

    receive(payload: any): void {
    }
}