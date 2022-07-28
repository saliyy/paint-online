import { defineStore } from 'pinia'
import {computed, reactive} from "@vue/reactivity";
import ActionMessage from "~/actions/ActionMessage";

export const useActionsMessagesState = defineStore('actions', () => {
    const actionMessages: ActionMessage[] = reactive([])

    const messagesShowInActivity = computed(() => {
        return actionMessages.filter(message => message.showInActivityWindow)
    })

    function addActionMessage(message: ActionMessage) {
        actionMessages.push(message)
    }

    return {
        actionMessages,
        messagesShowInActivity,
        addActionMessage
    }
})