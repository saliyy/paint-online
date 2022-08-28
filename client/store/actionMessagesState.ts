import { defineStore } from 'pinia'
import {computed, reactive} from "@vue/reactivity";
import ActionMessage from "~/actions/ActionMessage";

export const useActionsMessagesState = defineStore('actions', () => {
    const actionMessages: ActionMessage[] = reactive([])

    const messagesShowInActivity = computed(() => {
        return actionMessages.filter(message => message.showInActivityWindow)
    })

    const messageInCanvasActivity = ref<ActionMessage>();

    function addActionMessage(message: ActionMessage) {
        actionMessages.push(message)
    }

    const hasActivityMessage = computed((): boolean => {
        return !!messageInCanvasActivity.value
    })

    const getActivityMessage = computed((): ActionMessage | '' => {
        if (hasActivityMessage) {
            return messageInCanvasActivity.value
        }

        return ''
    })

    function setActivityMessage(message: ActionMessage) {
        messageInCanvasActivity.value = message
    }

    return {
        actionMessages,
        messagesShowInActivity,
        addActionMessage,
        hasActivityMessage,
        getActivityMessage,
        setActivityMessage
    }
})