import { useCanvasContext2DStore } from './../../store/canvasContextState';
import { Payload } from "../Action";
import IAction from "../IAction";
import Action from "../Action";

export default class BrushMouseUpAction extends Action implements IAction {
    constructor(payload: Payload) {
        super(payload);
    }

    async send(): Promise<void> {
        await super.send()
    }

    receive(payload: Payload): void {
        const ctx = useCanvasContext2DStore().getCtx
        ctx.beginPath()
    }
    
}