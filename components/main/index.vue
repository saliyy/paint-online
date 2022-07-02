<script lang="ts" setup>
import {onMounted, ref} from "vue";

const canvasRef = ref(null)

onMounted(() => {
  console.log(canvasRef)
})
</script>

<template>
  <div class="canvas-main">
    <MainTools />
    <canvas ref="canvasRef" />
  </div>
</template>

<style lang="scss" scoped>
.canvas-main {
  padding: 5px;
}
</style>
