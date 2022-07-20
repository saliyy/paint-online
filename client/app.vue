<template>
  <div>
    <header>
      <BaseTheHeader />
    </header>
    <main class="wrapper">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  max-height: 100%;
  width: 100%;
  min-width: 100%;
}
</style>
