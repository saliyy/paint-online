<template>
  <div>
    <header>
      <BaseTheHeader />
    </header>
    <main class="wrapper">
      <div class="window">
        <Main />
      </div>
      <aside class="aside">activity</aside>
    </main>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
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
