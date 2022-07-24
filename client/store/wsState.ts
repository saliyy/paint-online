import { useUserStore } from '@/store/userStore';
import { useActionsState } from './actionsState';
import { defineStore } from 'pinia'

export const onReceieve = (m: MessageEvent) => {
    const data = JSON.parse(m.data) 
    useActionsState().addAction({
        method: data.method,
        message: data.message,
        payload: data.payload
    })  
}


export const useWS = defineStore({
    id: 'ws',
    state: () => ({
        ws: null as WebSocket
    }),
    actions: {
        registerWS(socket): WebSocket {
            this.ws = new WebSocket(socket)
            this.ws.onmessage = (m: MessageEvent) => onReceieve(m)
            return this.ws
        },
        async sendAction(data: any) {
            data.user = useUserStore().getUser
            await Promise.resolve(this.ws.send(JSON.stringify(data)))
        }
    }
})
