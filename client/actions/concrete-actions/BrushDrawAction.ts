import { Coords } from "~/canvas-tools/types/Coords";
import IAction from "~/actions/IAction";
import Brush from "~/canvas-tools/Brush";
import ActionStrategy from "~/actions/ActionStrategy";

export interface BrushActionPayload {
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