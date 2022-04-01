<script setup lang="ts">
import { ref } from "@vue/reactivity";

const minutes = ref<string | number>('0')
const seconds = ref<string | number>('5')

function startTimer() {
    const handleTimer = setInterval(() => {
        seconds.value = Number(seconds.value)
        minutes.value = Number(minutes.value)
        seconds.value = seconds.value - 1

        if (seconds.value === 0 && minutes.value !== 0) {
            minutes.value = minutes.value - 1
            seconds.value = 59
        }

        if (!seconds.value) {
            clearTimerInterval(handleTimer)
        }
    }, 1000)
}

function clearTimerInterval(intervalName: any) {
    clearInterval(intervalName)
}

startTimer()

function test() {
    console.log('sad')
}

</script>

<template>
    <p @click="test()">{{ minutes }}:{{ seconds }}</p>
</template>