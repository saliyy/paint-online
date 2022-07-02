<template>
  <div>
    <header>
      <BaseTheHeader />
    </header>
    <main class="main">
      <div class="main_window">
        <Main />
      </div>
      <aside class="aside">
        activity
      </aside>
    </main>
    <footer>footer</footer>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  max-height: 100vh;
  width: 100vw;
  min-width: 100vw;
}

.main_window {
  border: 1px solid black;
  border-radius: 7px;
  margin: 10px;
  display: flex;
  width: 75vw;
  height: 80vh;
  justify-content: center;
}
.aside {
  border: 1px solid black;
  width: 15vw;
  height: 80vh;
  border-radius: 7px;
  margin: 10px;
}
</style>
