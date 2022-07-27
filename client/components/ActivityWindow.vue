<script lang="ts" setup>
import { useActionsState } from "~/store/actionMessagesState";
import { useWS } from "@/store/wsState";
const ws = useWS()
const actionsState = useActionsState();
</script>

<template>
 <div>
    <ul>
        <li v-for="action in actionsState.actionsInActivityWin" :key="action.message">
            {{ action.message.getMessage() }}
        </li>
    </ul>
 </div>
</template>