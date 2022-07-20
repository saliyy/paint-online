<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <div class="window">
      <Window />
    </div>
    <aside class="aside">activity</aside>
  </div>
</template>

<style lang="scss">
.window {
  border: 1px solid black;
  border-radius: 7px;
  margin: 10px;
  width: 75%;
  height: 80vh;
}
.aside {
  border: 1px solid black;
  width: 15vw;
  height: 80vh;
  border-radius: 7px;
  margin: 10px;
}
</style>
