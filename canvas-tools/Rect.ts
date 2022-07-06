import Tool from "~/canvas-tools/Tool";
import {Coords} from "~/canvas-tools/types/Coords";

export default class Rect extends Tool {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
        this.listen()
    }

    private isMouseDown = false;

    /*
     * Mouse has down on some x or y coordinate
     */
    private xWhereMouseStart: Coords;

    private yWhereMouseStart: Coords;

    private savedImageUrl: string;

    private listen(): void {
        this.ctx.canvas.onmousedown   = this.onMouseDown.bind(this)
        this.ctx.canvas.onmouseup     = this.onMouseUp.bind(this)
        this.ctx.canvas.onmousemove   = this.onMouseMove.bind(this)
    }

    private onMouseDown(e: MouseEvent) {
        this.isMouseDown = true
        this.ctx.beginPath()
        this.xWhereMouseStart = e.pageX - this.ctx.canvas.offsetLeft
        this.yWhereMouseStart = e.pageY - this.ctx.canvas.offsetTop
        this.savedImageUrl = this.ctx.canvas.toDataURL()
    }

    private onMouseMove(e: MouseEvent) {
        if (this.isMouseDown) {
            let xNow = e.pageX - this.ctx.canvas.offsetLeft
            let yNow = e.pageY - this.ctx.canvas.offsetTop
            let width = xNow - this.xWhereMouseStart
            let height = yNow - this.xWhereMouseStart
            this.draw(this.xWhereMouseStart, this.yWhereMouseStart, width, height)
        }
    }

    private onMouseUp(e: MouseEvent) {
        this.isMouseDown = false
    }

    private draw(x: Coords, y: Coords, width: number, height: number) {
        const img = new Image()
        img.src = this.savedImageUrl
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, width, height)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
}
