import BrushMouseUpAction from '~~/actions/concrete-actions/BrushMouseUpAction';
import { BrushActionPayload } from '../actions/concrete-actions/BrushDrawAction';
import Tool from "./Tool";
import BrushDrawAction from "~/actions/concrete-actions/BrushDrawAction";

async function sendToWs(brushPayload: BrushActionPayload): Promise<void> {
    const brushDrawAction = new BrushDrawAction(brushPayload);
    await brushDrawAction.send()
}


async function sendMouseWasUp() {
    const brushMouseUpAction = new BrushMouseUpAction({})
    await brushMouseUpAction.send()
}


export default class Brush extends Tool {
    private isMouseDown: boolean = false;

    constructor(ctx: CanvasRenderingContext2D) {
       super(ctx)
       this.ctx.strokeStyle = '#000000';
       this.ctx.lineWidth = 1
       this.listen()
    }

    private listen() {
        this.ctx.canvas.onmousemove = this.onMouseEventHandler.bind(this)
        this.ctx.canvas.onmousedown = this.onMouseDownHandler.bind(this)
        this.ctx.canvas.onmouseup = this.onMouseUpHandler.bind(this)
    }


    private onMouseDownHandler(e: MouseEvent) {
        this.isMouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.clientX - this.ctx.canvas.offsetLeft, e.clientY - this.ctx.canvas.offsetTop)
    }

    private onMouseUpHandler() {
        this.isMouseDown = false
        sendMouseWasUp()
    }


    private onMouseEventHandler(e: MouseEvent) {
        if (this.isMouseDown) {
            const x = e.clientX - this.ctx.canvas.offsetLeft
            const y = e.clientY - this.ctx.canvas.offsetTop
            sendToWs({x , y})
            Brush.draw({ x, y })
        }
    }

    public static draw(payload: BrushActionPayload) {
        // временная реализация
        this.ctx.lineTo(payload.x, payload.y)
        this.ctx.stroke()
    }
}
