<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCanvasContext2DStore } from "~~/store/canvas-context";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D = ref(null);
const ctxState = useCanvasContext2DStore();

function resizeListener(): void {
  window.addEventListener("resize", () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  });
}

onMounted(() => {
  ctx = canvasRef.value.getContext("2d");
  resizeListener();
  ctxState.setCtx(ctx);
});
</script>

<template>
  <div>
    <MainTools v-if="ctxState.getCtx" />
    <canvas :width="1000" :height="600" ref="canvasRef" />
  </div>
</template>
