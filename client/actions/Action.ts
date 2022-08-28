import IAction from "~/actions/IAction";
import {User, useUserStore} from "~/store/userStore";
import {useWS} from "~/store/wsState";
import ActionMessage from "~/actions/ActionMessage";

export interface Payload extends Record<string | number, any>{}

export default abstract class Action implements IAction {
    message?: ActionMessage = null;

    readonly method: string = this.constructor.name;

    user: User;

    payload: Payload;

    protected constructor(payload: Payload) {
        this.user = useUserStore().getUser
        this.payload = payload
    }

    public async send() {
        await useWS().sendAction(this)
    }

    public receive(payload: Payload): void {
        // will some basic code
    }
}