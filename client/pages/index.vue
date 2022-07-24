<script setup lang="ts">
import { useUserStore } from "@/store/userStore";
import { useWS } from "@/store/wsState";

const userName = ref("");
const isAuthError = ref(false);
const userState = useUserStore();
const wsState = useWS();
const dialogVisible = ref(true);

const auth = () => {
  isAuthError.value = false;
  if (!userName.value || userName.value.length <= 1) {
    isAuthError.value = true;
  } else {
    userState.setUser({ name: userName.value });
    const ws = wsState.registerWS(`ws://127.0.0.1:5000/`);
    ws.onopen = () => {
      wsState.sendAction({
          method: 'connection',
          payload: [],
          message: `User ${userState.getUser.name} has connected!`
      })
    };

    navigateTo({ path: "/main" });
  }
};
</script>
<template>
  <div>
    <span class="not-auth" v-if="!userState.isAuth"
      >You are not logged in <button class="auth-btn" @click="dialogVisible = true">Log in</button></span
    >
    <Dialog :visible.sync="dialogVisible" @close="dialogVisible = false">
      <template #header>Log in to continue</template>
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

<style scoped lang="scss">
input {
  color: #5d5d5d;
}
button + button {
  margin-left: 10px;
}

span {
  color: darkred;
  button: {
    margin-left: 5px; 
  } 
}

.not-auth {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}

.auth-btn {
  margin-left: 10px;
  font-size: 14px;
}
</style>
