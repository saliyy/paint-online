import { useUserStore } from '@/store/userStore';
import { defineStore } from 'pinia'
import {identifyAction} from "~/actions/utils/IdentifyAction";
import IAction from "~/actions/IAction";
import {useActionsState} from "~/store/actionsState";

export const onReceive = (m: MessageEvent) => {
    const data = JSON.parse(m.data)

    identifyAction(data).then((concreteAction: IAction) => {
        concreteAction.receive(data.payload)
        useActionsState().addAction(concreteAction)
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
        async sendAction(data: IAction) {
            if (!data.user) {
                data.user = useUserStore().getUser
            }

            await Promise.resolve(this.ws.send(JSON.stringify(data)))
        }
    }
})


