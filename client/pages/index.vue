<script setup lang="ts">
const userName = ref("");

const auth = () => {} 
</script>

<template>
  <div>
    <Dialog>
      <template #header> You need to authorize to continue</template>
      <template #body>
        Enter your name
        <input v-model="userName" />
      </template>
      <template #footer="{ confim, close }">
        <button @click="auth; confim">auth</button>
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
</style>
