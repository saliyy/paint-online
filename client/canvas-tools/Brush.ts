import { BrushActionPayload } from './../actions/BrushAction';
import { useToolStore } from './../store/toolState';
import { useCanvasContext2DStore } from './../store/canvasContextState';
import Tool from "./Tool";
import {Coords} from "~/canvas-tools/types/Coords";
import BrushAction from "~~/actions/BrushAction";

async function sendToWs(brushPayload: BrushActionPayload) {
    const brushAction = new BrushAction(brushPayload);
    await brushAction.send()
}

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
            const x = e.clientX - this.ctx.canvas.offsetLeft
            const y = e.clientY - this.ctx.canvas.offsetTop
            sendToWs({x , y})
            Brush.draw(x, y)
        }
    }

    public static draw(x: Coords, y: Coords, ctx: CanvasRenderingContext2D = useCanvasContext2DStore().getCtx) {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}
