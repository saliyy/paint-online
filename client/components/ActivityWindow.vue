<script lang="ts" setup>
import { useActionsState } from "@/store/actionsState";
import { useWS } from "@/store/wsState";
const ws = useWS()
const actionsState = useActionsState();
</script>

<template>
 <div>
    <ul>
        <li v-for="action in actionsState.$state.actions" :key="action.message">
            {{ action.message }}
        </li>
    </ul>
 </div>
</template>