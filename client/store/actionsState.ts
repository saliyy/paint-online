import { defineStore } from 'pinia'
import IAction from "~/actions/IAction";
import {computed, reactive} from "@vue/reactivity";

export const useActionsState = defineStore('actions', () => {
    const actions: IAction[] = reactive([])

    const actionsInActivityWin = computed(() => {
        return actions.filter((action: IAction) => action.message.showInActivityWindow)
    })

    function addAction(action: IAction) {
        actions.push(action)
    }

    return {
        actions,
        actionsInActivityWin,
        addAction
    }
})