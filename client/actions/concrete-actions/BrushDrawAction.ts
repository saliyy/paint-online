import ActionMessage from '~/actions/ActionMessage';
import { Coords } from "~/canvas-tools/types/Coords";
import Brush from "~/canvas-tools/Brush";
import Action, {Payload} from "~~/actions/Action";
import IAction from "~/actions/IAction";

export interface BrushActionPayload extends Payload {
    x: Coords;
    y: Coords;
}

export default class BrushDrawAction extends Action implements IAction {
    constructor(payload: BrushActionPayload) {
        super(payload);
    }

    public async send() {
        await super.send()
    }

    public receive(payload: BrushActionPayload) {
        Brush.draw(payload.x, payload.y)
    }
}