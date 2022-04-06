<script setup lang="ts">
import { ref } from '@vue/reactivity'
import Timer from '../components/Timer.vue'
import Text from '../components/Text.vue'
import { router } from '../router/index'
import { onMounted } from '@vue/runtime-core'

const timerComponent = ref<any>({})
const textComponent = ref<any>({})
const visible = ref<any>(true)

window.onkeyup = (event) => {
    if (!timerComponent.value?.changeTime && visible.value) {
        startTimer()
    }

    const verifier = !timerComponent.value?.changeTime && !visible.value

    textComponent.value?.startText(verifier)
}

function startTimer() {
    timerComponent.value?.handleTimer()
    visible.value = false
}

function toggleModal() {
    timerComponent.value?.toggleModal()

    visible.value = false
}

function restartTimer() {
    timerComponent.value?.setTime()
    visible.value = true
}

function timesUp() {
    router.push({ name: 'statistics' })
}
</script>

<template>
    <div class="modal-overlay">
        <Timer @times-up="timesUp()" @click="toggleModal" :ref="component => timerComponent = component"></Timer>
        <Text @finished="timesUp()" :ref="component => textComponent = component"/>
        <div class="modal"  v-if="visible">
            <button @click="startTimer">></button>
            Click or press any key to start!
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