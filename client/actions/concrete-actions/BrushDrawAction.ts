import { useWS } from '../../store/wsState';
import { Coords } from "~/canvas-tools/types/Coords";
import IAction from "~/actions/IAction";
import {ActionMessage} from "~/actions/ActionMessage";
import Brush from "~/canvas-tools/Brush";

export interface BrushActionPayload {
    x: Coords;
    y: Coords;
}

export default class BrushDrawAction implements IAction {

    readonly method: string = this.constructor.name

    message: ActionMessage

    payload: BrushActionPayload;

    constructor(payload: BrushActionPayload) {
        this.payload = payload
    }

    public async send() {
        return await useWS().sendAction(this)
    }

    public async receive(payload: BrushActionPayload) {
        await Brush.draw(payload.x, payload.y)
    }
}