<script lang="ts" setup>
import { useActionsMessagesState } from "~/store/actionMessagesState";
const actionMessagesState = useActionsMessagesState();
</script>

<template>
 <div class="dialog">
    <ul class="dialog__list">
        <li class="dialog__message" v-for="message in actionMessagesState.messagesShowInActivity" :key="message.id">
            {{ message.createdAt }}: {{ message.text }}
            <hr class="line">
        </li>
    </ul>
 </div>
</template>

<style lang="scss" scoped>
    .dialog {
        height: 100%;
        overflow-y : auto;
        &__message {
            margin-left: 4px;
        }
    }

    .line {
        width: 90%;
        border: none;
        border: 0.5px solid lightgrey;
    }
</style>