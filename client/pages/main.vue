<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="wrapper">
    <div class="window">
      <MainWindow />
    </div>
    <aside class="aside">
      <ActivityWindow />
    </aside>
  </div>
</template>

<style lang="scss" scoped>

.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  max-height: 100%;
  width: 100%;
  min-width: 100%;
}
.window {
  border: 1px solid black;
  border-radius: 7px;
  margin: 10px;
  width: 90vw;
  height: 80vh;
}
.aside {
  border: 1px solid black;
  width: 50vh;
  height: 80vh;
  border-radius: 7px;
  margin: 10px;
}
</style>
