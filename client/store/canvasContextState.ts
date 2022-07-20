import { defineStore } from 'pinia'

export const useCanvasContext2DStore = defineStore({
    id: 'canvas',
    state: () => ({
        canvas: null as HTMLCanvasElement,
        ctx: null as CanvasRenderingContext2D,
        undoList: [],
        redoList: []
    }),
    getters: {
        getCanvas(): HTMLCanvasElement {
            return this.canvas
        },
        canvasIsAvailable(): boolean {
            return !!this.canvas
        },
        getCtx(): CanvasRenderingContext2D {
            return this.ctx
        }
    },
    actions: {
        setCanvas(canvas: HTMLCanvasElement) {
            this.canvas = canvas
            this.ctx = this.canvas.getContext('2d')
        },
        pushToUndo() {
            this.undoList.push(this.canvas.toDataURL())
        },
        pushToRedo() {
            this.redoList.push(this.canvas.toDataURL())
        },
        undo() {
           if (this.undoList.length > 0) {
                let dataUrl = this.undoList.pop()
                this.pushToRedo()
                let img = new Image()
                img.src = dataUrl
                img.onload = () => {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
                }
           } else {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
           }
        },
        redo() {
            if (this.redoList.length > 0) {
                let dataUrl = this.redoList.pop()
                this.pushToUndo()
                let img = new Image()
                img.src = dataUrl
                img.onload = () => {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
                }
           }
        }
    }
}) 