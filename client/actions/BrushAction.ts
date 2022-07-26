import { useUserStore } from '@/store/userStore';
import { useWS } from './../store/wsState';
import { Coords } from "@/canvas-tools/types/Coords";

export interface BrushActionPayload {
    x: Coords;
    y: Coords;
}

export default class BrushAction {

    private method: string = 'Brush'

    private message: string = `Пользователь ${useUserStore().getUser.name} рисует кистью`

    private payload: BrushActionPayload;

    constructor(payload: BrushActionPayload) {
        this.payload = payload
    }

    public async send() {
        return await useWS().sendAction(this)
    }

    public receive() {
        
    }
}