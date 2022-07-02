import { defineStore } from 'pinia'

export const useCanvasContext2DStore = defineStore({
    id: 'ctx',
    state: () => ({
        ctx: null as CanvasRenderingContext2D
    }),
    getters: {
        getCtx(): CanvasRenderingContext2D {
            return this.ctx
        }
    },
    actions: {
        setCtx(ctx: CanvasRenderingContext2D) {
            this.ctx = ctx
        }
    }
}) 