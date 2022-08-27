import { Coords } from '~/canvas-tools/types/Coords';
import IAction from '~/actions/IAction';
import Action, { Payload } from '~~/actions/Action';
import Rect from '~~/canvas-tools/Rect';
import Tool from "~/canvas-tools/Tool";


export type RectDrawStyle =
    Pick<CanvasPathDrawingStyles, "lineWidth">
    & Pick<CanvasFillStrokeStyles, "strokeStyle">;

export interface RectDrawPayload extends Payload {
    x: Coords,
    y: Coords,
    width: number,
    height: number;
    style?: RectDrawStyle
}

export default class RectDrawAction extends Action implements IAction {
    constructor(payload: RectDrawPayload) {
        super(payload);
    }

    public async send() {

        this.payload.style = {
            lineWidth: Tool.ctx.lineWidth,
            strokeStyle: Tool.ctx.strokeStyle
        }

        await super.send()
    }

    public receive(payload: RectDrawPayload) {

        if (payload.style) {
            Tool.ctx.strokeStyle = payload.style.strokeStyle
            Tool.ctx.lineWidth = payload.style.lineWidth
        }

        Rect.draw(payload)
    }
}