import Action, {Payload} from "~~/actions/Action";
import IAction from "~/actions/IAction";
import ActionMessage from "~/actions/ActionMessage";

export interface ChatMessageActionPayload extends Payload {
    textMessage: string;
}

export default class ChatMessageAction extends Action implements IAction {
    constructor(payload: ChatMessageActionPayload) {
        super(payload);
    }

    public async send() {
        await super.send()
    }

    public static async send(payload: ChatMessageActionPayload): Promise<ActionMessage> {
        const messageAction = new this(payload)

        console.log(messageAction)
        await messageAction.send()

        return messageAction.message
    }

    public receive(payload: Payload) {

    }
}

