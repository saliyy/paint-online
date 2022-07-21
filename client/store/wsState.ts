import { defineStore } from 'pinia'
 
export const useWS = defineStore({
    id: 'ws',
    state: () => ({
        ws: null as WebSocket
    }),
    actions: {
        registerWS(socket): WebSocket {
            this.ws = new WebSocket(socket)
            return this.ws
        }
    }
})
