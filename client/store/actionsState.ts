import Brush from '@/canvas-tools/Brush';
import { defineStore } from 'pinia'

export interface Action {
    method: string,
    payload?: any
    message: string
}

const identifyAction = (action: Action): void => {
    if (action.method === 'Brush') {
        Brush.draw(action.payload.x, action.payload.y)
    }
}


export const useActionsState = defineStore({
    id: 'action-state',
    state: () => ({
        actions: [] as Action[]
    }),
    getters: {
        
    },
    actions: {
        async addAction(action: Action) {
            await this.actions.push(action)
            try {
                identifyAction(action)
            } catch (e) {
                
            }
        }
    }
}) 