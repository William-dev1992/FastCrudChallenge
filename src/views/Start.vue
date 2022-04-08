<template>
    <div class="modal-overlay">
        <Timer 
            @time-passed="(value) => timePassed = value" 
            @times-up="timesUp" 
            @click="toggleModal" 
            :ref="component => timerComponent = component" />
        <Text 
            @finished="finished" 
            :ref="component => textComponent = component"/>
        <div class="modal"  v-if="visible">
            <vue-feather class="play" @click="startTimer" type="play"></vue-feather>
            Press any key to start!
        </div>
        <vue-feather class="restart" v-if="!visible" @click="restartTimer" type="rotate-cw"></vue-feather>
    </div>
</template>

<script setup lang="ts">
import Text from '../components/Text.vue'
import Timer from '../components/Timer.vue'
import VueFeather from 'vue-feather'
import { Entries } from '../components/Text.vue'
import { ref } from '@vue/reactivity'
import { router } from '../router/index'
import { onMounted } from '@vue/runtime-core'

// Creates a reference for the components.
const timerComponent = ref<any>({})
const textComponent = ref<any>({})

const visible = ref<boolean>(true)
const timePassed = ref<number>(0)

// Bind the keyUp event to start the timer and typing logic.
window.onkeyup = () => {
    if (!timerComponent.value?.changeTime && visible.value) {
        startTimer()
    }

    const verifier = !timerComponent.value?.changeTime && !visible.value

    textComponent.value?.startTyping(verifier)
}

// Triggers the start text on the component.
onMounted(() => {
    textComponent.value?.startText()
})

/**
 * Triggers the timer and changes the visibility state of the modal.
 */
function startTimer(): void {
    timerComponent.value?.handleTimer()
    visible.value = false
}

/**
 * Triggers modal toggle on the timer component.
 */
function toggleModal(): void {
    timerComponent.value?.toggleModal()
    visible.value = false
}

/**
 * Responsible for triggeting the restart proccess of the time and text.
 */
function restartTimer(): void {
    timerComponent.value?.setTime()
    visible.value = true
    textComponent.value?.startText()
}

/**
 * Handle for the timesUp event, when the timer comes to zero and forces the text component to emit the finish event.
 */
function timesUp(): void {
    textComponent.value?.emitFinished()
}

/**
 * Handle for the timesUp event, when the timer comes to zero and forces the text component to emit the finish event.
 * 
 * @entries - Value returned from text component on the emission of the 'finished' event.
 */
function finished(entries: Entries): void {
    router.push({ name: 'statistics', params: { data: JSON.stringify(entries), time: timePassed.value } })
}
</script>

<style>
.play {
    color: #67E480;
}

.restart {
    color: #E7DE79;
}

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