import Tool from "~/canvas-tools/Tool";

export default class Eraser extends Tool {

    protected readonly DEFAULT_LINE_WIDTH = 15;

    constructor(ctx: CanvasRenderingContext2D, lineWidth?: number) {
        super(ctx);

        ctx.globalCompositeOperation = "destination-out";

        ctx.lineWidth = lineWidth ?? this.DEFAULT_LINE_WIDTH;
    }
}
