<script setup lang="ts">
import { ref } from '@vue/reactivity'

const baseText = ref('oh-yes-boy')

const text = ref(baseText.value)
const textDisplay = ref(text.value)
const currentIndex = ref<number>(0)

const splitedText = ref(text.value.split(''))
function startText(verifier: boolean) {
    window.onkeydown = (event) => {
        if (!verifier) {
            return
        }

        const typedLetter = event.key

        if (typedLetter !== splitedText.value[currentIndex.value]) {
            splitedText.value.splice(currentIndex.value, 1, `<span class='red'>${splitedText.value[currentIndex.value]}</span>`);
        } else {
            splitedText.value.splice(currentIndex.value, 1, `<span class='green'>${splitedText.value[currentIndex.value]}</span>`);
        }

        textDisplay.value = splitedText.value.join('')
        currentIndex.value++
    }
}

defineExpose({startText})

</script>

<template>
    <p v-html="textDisplay"></p>
</template>

<style>
.red {
    color: red !important;
}

.green {
    color: green !important;
}
</style>