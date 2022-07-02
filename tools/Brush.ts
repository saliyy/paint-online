import Tool from "./Tool";

type Coords = number;

export default class Brush extends Tool {
    private isMouseDown: boolean = false;

    constructor(ctx: CanvasRenderingContext2D) {
       super(ctx)
       this.listen()
    }

    private listen() {
        this.ctx.canvas.onmousemove = this.onMouseEventHandler.bind(this)
        this.ctx.canvas.onmousedown = this.onMouseDownHendler.bind(this)
        this.ctx.canvas.onmouseup = this.onMouseUpHendler.bind(this)
    }


    private onMouseDownHendler(e: MouseEvent) {
        this.isMouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.clientX - this.ctx.canvas.offsetLeft, e.clientY - this.ctx.canvas.offsetTop)
    }

    private onMouseUpHendler() {
        this.isMouseDown = false
    }

    private onMouseEventHandler(e: MouseEvent) {
        if (this.isMouseDown) {
            this.draw(e.clientX - this.ctx.canvas.offsetLeft, e.clientY - this.ctx.canvas.offsetTop)
        }
    }

    private draw(x: Coords, y: Coords) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        console.log("hey hey")
    }
}