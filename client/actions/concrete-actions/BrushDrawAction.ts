import { Coords } from "~/canvas-tools/types/Coords";
import Brush from "~/canvas-tools/Brush";
import ActionStrategy, {Payload} from "~/actions/ActionStrategy";
import IAction from "~/actions/IAction";

export interface BrushActionPayload extends Payload {
    x: Coords;
    y: Coords;
}

export default class BrushDrawAction extends ActionStrategy implements IAction {
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