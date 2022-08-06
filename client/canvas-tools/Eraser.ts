import EraserAction, { EraserPayload } from './../actions/concrete-actions/EraserAction';
import {Coords} from "~/canvas-tools/types/Coords";
import Tool from "./Tool";

async function sendToWs(payload: EraserPayload) {
    const eraserAction = new EraserAction(payload)
    await eraserAction.send()
}

export default class Eraser extends Tool {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
        this.ctx.strokeStyle = '#E5E5E5'
        this.ctx.lineWidth = 15
        this.listen()
    }

    private isMouseDown: boolean = false;

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
    }

    private onMouseEventHandler(e: MouseEvent) {
        if (this.isMouseDown) {
            const x = e.clientX - this.ctx.canvas.offsetLeft
            const y = e.clientY - this.ctx.canvas.offsetTop
            sendToWs({x , y})
            Eraser.draw(x, y)
        }
    }


    public static draw(x: Coords, y: Coords) {
        this.ctx.strokeStyle = '#E5E5E5'
        this.ctx.lineWidth = 15
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}
