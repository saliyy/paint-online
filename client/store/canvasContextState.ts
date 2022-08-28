import { defineStore } from 'pinia'
import RedoAndoAction, {UndoRedoActionPayload} from "~/actions/concrete-actions/RedoAndoAction";
import makeId from "~/utils/randomId";

async function sendSnapShotToWs(payload: UndoRedoActionPayload) {
    await RedoAndoAction.sendSnapShot(payload)
}

async function sendUndoRedoAction(payload: UndoRedoActionPayload) {
    await RedoAndoAction.send(payload)
}

export interface CanvasState {
    canvas: null | HTMLCanvasElement,
    ctx: null | CanvasRenderingContext2D,
    undoList: UndoRedoItem[],
    redoList: UndoRedoItem[]
}

export interface UndoRedoItem {
    id: string,
    dataUrl: string
}

const state = (): CanvasState => ({
  canvas: null,
  ctx: null,
  undoList: [],
  redoList: []
})

const getters = {
    canvasIsAvailable(): boolean {
        return !!this.canvas
    },
    getCtx(): CanvasRenderingContext2D {
        return this.ctx
    }
}

const actions = {
    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
    },
    async pushToUndo() {
        const snapShotId = makeId()

        await sendSnapShotToWs({ type: "Undo", id: snapShotId})

        this.undoList.push({ id: snapShotId, dataUrl: this.canvas.toDataURL()})
    },
    async pushToRedo() {
        const snapShotId = makeId()

        await sendSnapShotToWs({ type: "Redo", id: snapShotId})

        this.redoList.push({ id: snapShotId, dataUrl: this.canvas.toDataURL()})
    },
    setSnapShot(payload: UndoRedoActionPayload) {
        if (payload.type === 'Undo') {
            return this.undoList.push({ id: payload.id, dataUrl: this.canvas.toDataURL()})
        }

        return this.redoList.push({ id: payload.id, dataUrl: this.canvas.toDataURL()})
    },
    undo() {
        if (this.undoList.length > 0) {
            let undoItem = this.undoList.pop()
            this.pushToRedo()
            let img = new Image()
            img.src = undoItem.dataUrl
            img.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
            }

            sendUndoRedoAction({ type: "Undo" , id: undoItem.id})

        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    },
    redo() {
        if (this.redoList.length > 0) {
            let redoItem = this.redoList.pop()
            this.pushToUndo()
            let img = new Image()
            img.src = redoItem.dataUrl
            img.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
            }
            sendUndoRedoAction({ type: "Redo" , id: redoItem.id})
        }
    },
    receiveUndoRedoAction(payload: UndoRedoActionPayload) {
        if (payload.type === "Undo") {
            if (this.undoList.length > 0) {
                let undoItem = this.undoList.find((item) => item.id === payload.id)
                let img = new Image()
                img.src = undoItem.dataUrl
                img.onload = () => {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
                }
            }
        } else {
            if (this.redoList.length > 0) {
                let redoItem = this.redoList.find((item) => item.id === payload.id)
                let img = new Image()
                img.src = redoItem.dataUrl
                img.onload = () => {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
                }
            }
        }
    }
}



export const useCanvasContext2DStore = defineStore('canvas', {
    state,
    getters,
    actions
})
