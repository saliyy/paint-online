<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D = ref(null)

onMounted(() => {
  ctx = canvasRef.value.getContext("2d")
  ctx.rect(10, 100, 20, 30)
  ctx.fill()
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
