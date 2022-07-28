import Action, {Payload} from "~~/actions/Action";
import IAction from "~/actions/IAction";

export interface UserConnectionPayload extends Payload {}

export default class UserConnectedAction extends Action implements IAction {
    constructor(payload: UserConnectionPayload) {
        super(payload);
    }

    async send() {
        await super.send()
    }

    public receive(payload: UserConnectionPayload) {
        // maybe some code for other users
    }
}