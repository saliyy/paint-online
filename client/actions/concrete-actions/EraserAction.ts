import { Coords } from './../../canvas-tools/types/Coords';
import Action, {Payload} from "~~/actions/Action";
import IAction from "~/actions/IAction";
import Eraser from '~~/canvas-tools/Eraser';

export interface EraserPayload extends Payload {
    x: Coords;
    y: Coords;
}

export default class EraserAction extends Action implements IAction {
    constructor(payload: EraserPayload) {
        super(payload);
    }

    public async send() {
        await super.send()
    }

    public receive(payload: EraserPayload) {
        Eraser.draw(payload.x, payload.y)
    }
}

