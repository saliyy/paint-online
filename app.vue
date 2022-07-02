<template>
  <div>
    <header>
      <BaseTheHeader />
    </header>
    <main class="main">
      <div class="canvas">
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
  position: relative;
  height: 80vh;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.canvas {
  position: relative;
  border: 1px solid black;
  border-radius: 7px;
  border-color: #AFAFAF;
  height: 100%;
  width: 140vh;
  margin: 0px 10px 0px 10px
}

.aside {
  border: 1px solid black;
  border-radius: 7px;
  border-color: #AFAFAF;
  width: 40vh;
}
</style>
