<script setup lang="ts">
import { useUserStore } from "@/store/userStore";
import { useWS } from "@/store/wsState";

const userName = ref("");
const isAuthError = ref(false);
const userState = useUserStore();
const wsState = useWS();

const auth = () => {
  isAuthError.value = false
  if (!userName.value || userName.value.length <= 1) {
    isAuthError.value = true
  } else {
    userState.setUser({name: userName.value})
    const ws = wsState.registerWS(`ws://127.0.0.1:5000/`)
    ws.onopen = () => {
      ws.send(JSON.stringify({
        user: userState.getUser,
        method: 'connection'
      }))
    }

    ws.onmessage = (m: MessageEvent) => {
      console.dir(m)
    }
  }
};
</script>

<template>
  <div>
    <Dialog>
      <template #header> You need to authorize to continue</template>
      <template #body>
        Enter your name
        <input v-model="userName" />
        <span v-show="isAuthError">name cannot be empty or less then 1!!!</span>
      </template>
      <template #footer="{ confirm, close }">
        <button
          @click="
            auth();
            confirm;
          "
        >
          auth
        </button>
        <button @click="close">cancel</button>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
input {
  color: #5d5d5d;
}
button + button {
  margin-left: 10px;
}

span {
  color: darkred;
}
</style>
