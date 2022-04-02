<script setup lang="ts">
import { ref } from '@vue/reactivity'
import Timer from '../components/Timer.vue'
const teste = ref<any>({})
const visible = ref<any>(true)

function startTimer() {
    teste.value?.handleTimer()
    visible.value = false
}

function toggleModal() {
    teste.value?.toggleModal()

    visible.value = false
}

function restartTimer() {
    teste.value?.setTime()
}
</script>

<template>
    <div class="modal-overlay">
        <Timer @click="toggleModal" :ref="component => teste = component"></Timer>
        <div class="modal"  v-if="visible">
            Clique aqui para iniciar!
            <button @click="startTimer">></button>
        </div>
        <button v-if="!visible" @click="restartTimer">Restart</button>
    </div>
</template>

<style>
.testText {
  width: 75%;
  align-self: center;
}

.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.modal-overlay .modal {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>