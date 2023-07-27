import { Coords } from "~/canvas-tools/types/Coords";
import Brush from "~/canvas-tools/Brush";
import Action, {Payload} from "~~/actions/Action";
import IAction from '~~/actions/Action'
import Tool from "~/canvas-tools/Tool";
import ActionMessage from "../ActionMessage";

export type BrushStyle =
    Pick<CanvasPathDrawingStyles, "lineWidth">
    & Pick<CanvasFillStrokeStyles, "strokeStyle">;

export interface BrushActionPayload extends Payload {
    x: Coords;
    y: Coords;
    style?: BrushStyle;
}

export default class BrushDrawAction extends Action implements IAction {
    constructor(payload: BrushActionPayload) {
        super(payload);
    }

    public async send() {

        this.payload.style = {
            lineWidth: Tool.ctx.lineWidth,
            strokeStyle: Tool.ctx.strokeStyle
        }

        await super.send()
    }

    public receive(payload: BrushActionPayload) {

        if (payload.style) {
            Tool.ctx.strokeStyle = payload.style.strokeStyle
            Tool.ctx.lineWidth = payload.style.lineWidth
        }

        Brush.draw(payload)
    }
}