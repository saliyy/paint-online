import { useCanvasContext2DStore } from './../store/canvasContextState';
import { useUserStore } from '@/store/userStore';
import { useWS } from './../store/wsState';
import { Coords } from "@/canvas-tools/types/Coords";

export interface BrushActionPayload {
    x: Coords;
    y: Coords;
    strokeStyle?: string | CanvasGradient | CanvasPattern,
    lineWidth?: number,
    ctx?: CanvasRenderingContext2D
}

export default class BrushAction {

    private method: string = 'Brush'

    private message: string = `Пользователь ${useUserStore().getUser.name} рисует кистью`

    private payload: BrushActionPayload;

    constructor(payload: BrushActionPayload) {
        const ctx = useCanvasContext2DStore().getCtx
        this.payload.strokeStyle = ctx.strokeStyle
        this.payload.lineWidth   = ctx.lineWidth
        this.payload = payload 
    }

    public async send() {
        return await useWS().sendAction(this)
    }

    public receive() {
        
    }
}