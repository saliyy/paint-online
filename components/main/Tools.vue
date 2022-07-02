<script lang="ts" setup>
import { useCanvasContext2DStore } from "~~/store/canvas-context";
import { useToolStore } from "~~/store/tool";
import Brush from "~~/tools/Brush";
import Tool from "~~/tools/Tool";

const toolState = useToolStore();
const ctx = useCanvasContext2DStore().getCtx;

function setTool(tool: Tool) {
  toolState.setTool(tool);
}
</script>

<template>
  <div class="toolbar">
    <button class="toolbar__button brush" @click="setTool(new Brush(ctx))" />
    <button class="toolbar__button circle" />
    <button class="toolbar__button rect" />
    <button class="toolbar__button eraser" />
    <button class="toolbar__button line" />
    <button class="toolbar__button undo" />
    <button class="toolbar__button redo" />
    <button class="toolbar__button save" />
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  display: flex;
  justify-content: flex-start;
  height: 40px;
  width: 100%;

  &__button {
    margin-top: 5px;
    height: 25px;
    width: 25px;
    border: none;
    outline: none;
    margin: 0px 5px 0px 5px;
    cursor: pointer;
    background-image: cover;
  }

  .brush {
    background: url("~/assets/img/brush.svg") no-repeat center center;
  }
  .circle {
    background: url("~/assets/img/circle.svg") no-repeat center center;
  }
  .rect {
    background: url("~/assets/img/rect.svg") no-repeat center center;
  }
  .eraser {
    background: url("~/assets/img/eraser.svg") no-repeat center center;
  }
  .line {
    background: url("~/assets/img/line.svg") no-repeat center center;
  }

  .undo {
    background: url("~/assets/img/undo.svg") no-repeat center center;
  }

  .redo {
    background: url("~/assets/img/undo.svg") no-repeat center center;
    transform: scaleX(-1);
  }

  .save {
    background: url("~/assets/img/save.svg") no-repeat center center;
  }
}
</style>
