import { defineStore } from 'pinia'
import Tool from '~~/canvas-tools/Tool'

export const useToolStore = defineStore({
    id: 'tool',
    state: () => ({
        selectedTool: null as Tool
    }),
    getters: {
        getTool(): Tool {
            return this.selectedTool
        }
    },
    actions: {
        setTool(tool: Tool) {
            this.selectedTool = tool
        }
    }
})
