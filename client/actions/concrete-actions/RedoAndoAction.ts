import IAction from "~/actions/IAction";
import Action, {Payload} from "~/actions/Action";
import {useCanvasContext2DStore} from "~/store/canvasContextState";

export interface UndoRedoActionPayload extends Payload {
    type: "Undo" | "Redo",
    id: string,
    IsMakeSnapShot?: false
}

export default class RedoAndoAction extends Action implements IAction {
    constructor(payload: UndoRedoActionPayload) {
        super(payload);
    }

    public async send(): Promise<void> {
        await super.send()
    }

    public static async sendSnapShot(payload: UndoRedoActionPayload) {
        const action = new this(payload)
        action.payload.IsMakeSnapShot = true
        await action.send()
    }

    public static async send(payload: UndoRedoActionPayload) {
        const action = new this(payload)
        action.payload.IsMakeSnapShot = false
        await action.send()
    }

    public receive(payload: UndoRedoActionPayload): void {
        const canvasStore = useCanvasContext2DStore()

        if ('IsMakeSnapShot' in payload && payload.IsMakeSnapShot) {
            canvasStore.setSnapShot(payload)
        } else {
            canvasStore.receiveUndoRedoAction(payload)
        }

    }

}