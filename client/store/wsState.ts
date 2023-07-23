import { defineStore } from 'pinia'
import {identifyAction} from "~/actions/utils/IdentifyAction";
import {useActionsMessagesState} from "~/store/actionMessagesState";
import IAction from '~~/actions2/actions/Action'
import { useActionObservableStore } from './actionsObservableStore';

export const onReceive = (m: MessageEvent) => {
    const data = JSON.parse(m.data)

    identifyAction(data).then((concreteAction: IAction) => {
        useActionObservableStore().emit(concreteAction)
      
    }).catch((err) => {
        console.error(err)
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
            this.ws.onmessage = (m: MessageEvent) => onReceive(m)
            return this.ws
        },
        async sendAction(action: IAction) {
            await Promise.resolve(this.ws.send(JSON.stringify(action)))
        }
    }
})


