import { Coords } from '~/canvas-tools/types/Coords';
import IAction from '~/actions/IAction';
import Action, { Payload } from '~~/actions/Action';
import Rect from '~~/canvas-tools/Rect';

export interface RectDrawPayload extends Payload {
    x: Coords,
    y: Coords,
    width: number,
    height: number;
}

export default class RectDrawAction extends Action implements IAction {
    constructor(payload: RectDrawPayload) {
        super(payload);
    }

    public async send() {
        await super.send()
    }

    public receive(payload: RectDrawPayload) {
        Rect.draw(payload.x, payload.y, payload.height, payload.width)
    }
}