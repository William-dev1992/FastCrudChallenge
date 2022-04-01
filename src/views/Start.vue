<script setup lang="ts">
import { ref } from '@vue/reactivity'
import Timer from '../components/Timer.vue'
const teste = ref<any>({})
const visible = ref<any>(true)

function startTimer() {
    teste.value?.handleTimer()
    visible.value = false
}

function changeTime() {
    teste.value?.setTime()
    visible.value = false
}

</script>

<template>
  <Timer @click="changeTime" :ref="component => teste = component"></Timer>
  <div class="modal-overlay" v-if="visible">
      <div class="modal">
        Clique aqui para iniciar!
        <button @click="startTimer">></button>
      </div>
  </div>
</template>

<style>

.testText {
  width: 75%;
  align-self: center;

  }
</style>
