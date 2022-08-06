import { useCanvasContext2DStore } from './../store/canvasContextState';
export default abstract class Tool {
    protected ctx: CanvasRenderingContext2D;
    
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.destroyEvents()
    }

    set strokeColor(color: string) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width
    }

    static get ctx(): CanvasRenderingContext2D  {
        return useCanvasContext2DStore().getCtx
    }

    destroyEvents(): void {
        this.ctx.canvas.onmousedown = null
        this.ctx.canvas.onmousemove = null
        this.ctx.canvas.onmouseup = null
    }
}
