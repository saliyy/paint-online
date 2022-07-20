import Tool from "./Tool";
import {Coords} from "~/canvas-tools/types/Coords";

export default class Brush extends Tool {
    private isMouseDown: boolean = false;

    constructor(ctx: CanvasRenderingContext2D) {
       super(ctx)
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
    }

    private onMouseEventHandler(e: MouseEvent) {
        if (this.isMouseDown) {
            this.draw(e.clientX - this.ctx.canvas.offsetLeft, e.clientY - this.ctx.canvas.offsetTop)
        }
    }

    public draw(x: Coords, y: Coords) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}
