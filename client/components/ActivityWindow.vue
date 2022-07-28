<script lang="ts" setup>
import { useActionsMessagesState } from "~/store/actionMessagesState";
const actionMessagesState = useActionsMessagesState();
</script>

<template>
 <div>
    <ul>
        <li v-for="message in actionMessagesState.messagesShowInActivity" :key="message.id">
            {{ message.createdAt }}: {{ message.text }}
        </li>
    </ul>
 </div>
</template>