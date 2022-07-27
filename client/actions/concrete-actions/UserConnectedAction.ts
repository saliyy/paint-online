import ActionStrategy, {Payload} from "~/actions/ActionStrategy";
import IAction from "~/actions/IAction";
import ActionMessage from "~/actions/ActionMessage";

export interface UserConnectionPayload extends Payload {}

export default class UserConnectedAction extends ActionStrategy implements IAction {
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