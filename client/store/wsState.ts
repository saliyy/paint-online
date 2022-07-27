import { defineStore } from 'pinia'
import {identifyAction} from "~/actions/utils/IdentifyAction";
import {useActionsMessagesState} from "~/store/actionMessagesState";
import IAction from "~/actions/IAction";

export const onReceive = (m: MessageEvent) => {
    const data = JSON.parse(m.data)

    identifyAction(data).then((concreteAction: IAction) => {
        concreteAction.receive(data.payload)
        if (concreteAction.message && concreteAction.message.text.length) {
            useActionsMessagesState().addActionMessage(concreteAction.message)
        }
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


