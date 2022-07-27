import IAction from "~/actions/IAction";
import ActionStrategy from "~/actions/ActionStrategy";

export default class UserConnectedAction extends ActionStrategy implements IAction {
    constructor(payload: []) {
        super(payload);
    }

    public receive(payload: []) {

    }

    async send() {
        await super.send()
    }
}