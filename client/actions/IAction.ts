import {User} from "~/store/userStore";
import ActionMessage from "~/actions/ActionMessage";
import {Payload} from "~~/actions/Action";

export default interface IAction {
    readonly method: string
    user: User,
    payload: Payload
    message?: ActionMessage,
    send(): Promise<void>
    receive(payload: Payload): void
}