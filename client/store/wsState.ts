import { defineStore } from 'pinia'
import {identifyAction} from "~/actions/utils/IdentifyAction";
import IAction from '~/actions/Action'
import { useActionObservableStore } from './actionsObservableStore';


function instanceOfAction(object: any): object is IAction {
    return 'payload' in object && 'message' in object && 'method' in object;
}

export const onReceive = (m: MessageEvent) => {
    const incomingMessage: unknown = JSON.parse(m.data)

    if (instanceOfAction(incomingMessage)) {
        identifyAction(incomingMessage).then((concreteAction: IAction) => {
            concreteAction.receive(incomingMessage.payload)
            useActionObservableStore().emit(concreteAction)
        }).catch((err) => {
            console.error(err)
        })
    }
}

export const useWS = defineStore({
    id: 'ws',
    state: () => ({
        ws: null as WebSocket
    }),
    actions: {
        registerWS(socket: string): WebSocket {
            this.ws = new WebSocket(socket)
            this.ws.onmessage = (m: MessageEvent) => onReceive(m)
            return this.ws
        },
        async sendAction(action: IAction): Promise<void> {
            await Promise.resolve(this.ws.send(JSON.stringify(action)))
        }
    }
})


