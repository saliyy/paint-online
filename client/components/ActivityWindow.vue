<script lang="ts" setup>
import { useActionsMessagesState } from "~/store/actionMessagesState";
import ChatMessageAction from "~/actions/concrete-actions/ChatMessageAction";
import { useActionObservableStore } from "~~/store/actionsObservableStore";
import IAction from '~~/actions2/actions/Action'
import { Subscription } from "rxjs";

const actionMessagesState = useActionsMessagesState();

const message = ref<string>('');

let observableId$: Subscription | null = null;

onMounted(() => {
  observableId$ = useActionObservableStore()
  .getObservableOf(ChatMessageAction)
  .subscribe({
      next: (value: ChatMessageAction) => {
        console.log(value)
        if (value.message) {
          actionMessagesState.addActionMessage(value.message)
        }
      }
    })
})

onBeforeUnmount(() => { 
  observableId$.unsubscribe()
})

const sendMessageToChat = () => {
  ChatMessageAction.send({ textMessage: message.value }).then(() => {
    message.value = ''
  })
}
</script>

<template>
 <div class="dialog">
    <ul class="dialog__list">
        <li class="dialog__message" v-for="message in actionMessagesState.messagesShowInActivity" :key="message.id">
            {{ message.createdAt }}: {{ message.text }}
            <hr class="line">
        </li>
    </ul>
   <div class="dialog__bottom">
     <textarea class="message-input" v-model="message" placeholder="type a message" />
     <button class="send-button" @click="sendMessageToChat">send</button>
   </div>
 </div>
</template>

<style lang="scss" scoped>
    .dialog {
        height: 100%;
      &__list {
        height: 100%;
        overflow-y : auto;
      }

        &__message {
            margin-left: 4px;
            word-break: break-word;
        }

      &__bottom{
        display: flex;
        margin-top: 10px;
        margin-bottom: auto;
      }
    }

    .line {
        width: 90%;
        border: none;
        border: 0.5px solid lightgrey;
    }

    .send-button {
      width: 100px;
      margin-left: 10px;
    }

    .message-input {
      width: 300px;
    }
</style>