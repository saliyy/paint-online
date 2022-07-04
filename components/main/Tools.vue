<script lang="ts" setup>
import { useCanvasContext2DStore } from "~~/store/canvas-context";
import { useToolStore } from "~~/store/tool";
import Brush from "~~/canvas-tools/Brush";
import Tool from "~~/canvas-tools/Tool";
import Eraser from "~~/canvas-tools/Eraser";
import {onMounted} from "vue";
import {downloadCanvas} from "~/lib/downloadCanvas";

const toolState = useToolStore();
const ctx = useCanvasContext2DStore().getCtx;

function setTool(tool: Tool) {
  toolState.setTool(tool);
}

onMounted(() => {
  setTool(new Brush(ctx))
})

function save() {
  downloadCanvas(ctx.canvas)
}
</script>

<template>
  <div class="toolbar">
    <button class="toolbar__button brush" @click="setTool(new Brush(ctx))" />
    <button class="toolbar__button circle" />
    <button class="toolbar__button rect" />
    <button class="toolbar__button eraser" @click="setTool(new Eraser(ctx))" />
    <button class="toolbar__button line" />
    <button class="toolbar__button undo" />
    <button class="toolbar__button redo" />
    <button class="toolbar__button save" @click="save()"/>
  </div>
</template>

<style scoped lang="scss">
@import "~~/assets/css/tools/tools.scss";
</style>
