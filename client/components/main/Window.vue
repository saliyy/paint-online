<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCanvasContext2DStore } from "@/store/canvasContextState";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let canvas: HTMLCanvasElement = ref(null);
const canvasState = useCanvasContext2DStore();

function pushToUndo() {
  if (canvasState.canvasIsAvailable) {
    canvasState.pushToUndo();
  }
}

onMounted(() => {
  canvas = canvasRef.value;
  canvasState.setCanvas(canvas);
});

onUnmounted(() => {
  canvas.onmousedown = null;
});
</script>

<template>
  <div>
    <div class="window__header">
      <MainTools v-if="canvasState.canvasIsAvailable" />
    </div>
    <canvas @mousedown="pushToUndo" :width="1000" :height="600" ref="canvasRef" />
  </div>
</template>

<style>
.window__header {
  margin: 5px 0px 0px 10px;
}
</style>
