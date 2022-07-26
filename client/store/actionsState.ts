import Brush from '@/canvas-tools/Brush';
import { defineStore } from 'pinia'

export interface Action {
    method: string,
    payload?: any
    message: string
}

const identifyAction = (action: Action): void => {
    switch (action.method) {
        case "Brush":
            Brush.draw(action.payload.x, action.payload.y)
            break;
        default:

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
         addAction(action: Action) {
             this.actions.push(action)
            try {
                 identifyAction(action)
            } catch (e) {
                
            }
        }
    }
}) 