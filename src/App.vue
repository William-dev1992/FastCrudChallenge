<script setup lang="ts">
import { ref } from '@vue/reactivity'
import Timer from './components/Timer.vue'

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
          <button @click="startTimer">start</button>
        </div>
    </div>
</template>

<style>
.app {
  position: relative;
}

.testText {
  width: 75%;
  align-self: center;
}

html,
body {
  height: 100%;
  background-color: #191622;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #FFFFFF;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
</style>
