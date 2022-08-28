<script lang="ts" setup>
import { useCanvasContext2DStore } from "~~/store/canvasContextState";
import { useToolStore } from "~~/store/toolState";
import Brush from "~~/canvas-tools/Brush";
import Tool from "~~/canvas-tools/Tool";
import Eraser from "~~/canvas-tools/Eraser";
import Rect from "~~/canvas-tools/Rect";
import { onMounted } from "vue";
import { downloadCanvas } from "~/utils/downloadCanvas";
import { useActionsMessagesState } from "~~/store/actionMessagesState";

const toolState = useToolStore();
const canvasState = useCanvasContext2DStore();
const ctx = canvasState.getCtx;
const actionMessageState = useActionsMessagesState()

function setTool(tool: Tool) {
  toolState.setTool(tool);
}

function setStrokeColor(e: Event) {
  toolState.setStrokeColor(e.target.value);
}

function setLineWidth(e: Event) {
  toolState.setLineWidth(e.target.value);
}

onMounted(() => {
  setTool(new Brush(ctx));
});

function save() {
  downloadCanvas(ctx.canvas);
}
</script>

<template>
<div class="panel">
  <div class="toolbar">
    <button class="toolbar__button brush" @click="setTool(new Brush(ctx))" />
    <button class="toolbar__button rect" @click="setTool(new Rect(ctx))" />
    <button class="toolbar__button eraser" @click="setTool(new Eraser(ctx))" />
    <button class="toolbar__button undo" @click="canvasState.undo()" />
    <button class="toolbar__button redo" @click="canvasState.redo()" />
    <button class="toolbar__button save" @click="save()" />

    <div class="toolbar__styles">
      outline color
      <input type="color" class="toolbar__button" @change="setStrokeColor" />
      line width
      <input
        type="number"
        min="0"
        max="100"
        value="1"
        class="toolbar__button line-width"
        @change="setLineWidth"
      />
    </div>
  </div>

    <div class="activity">
      <span v-if="actionMessageState.hasActivityMessage">
          {{ actionMessageState.getActivityMessage.text }}
      </span>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import "~~/assets/css/tools/tools.scss";
</style>
