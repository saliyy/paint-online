import Brush from "~/canvas-tools/Brush";
import {Coords} from "~/canvas-tools/types/Coords";

export default class Eraser extends Brush {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    protected draw(x: Coords, y: Coords) {
        this.ctx.strokeStyle = '#E5E5E5'
        this.ctx.lineWidth = 10
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}
