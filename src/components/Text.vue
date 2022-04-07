<script setup lang="ts">
import { ref } from '@vue/reactivity'

const baseText = ref('|oh yes boy')

const text = ref(baseText.value)
const textDisplay = ref(text.value)
const currentIndex = ref<number>(0)

const emit = defineEmits(['finished'])

const splitedText = ref(text.value.split(''))
function startText(verifier: boolean) {
    window.onkeydown = (event) => {
        if (!verifier) {
            return
        }

        const typedLetter = event.key

        const fromIndex = splitedText.value.indexOf('|')

        if (typedLetter === 'Backspace') {
            currentIndex.value = currentIndex.value - 1

            splitedText.value.splice(fromIndex, 1)
            splitedText.value.splice(currentIndex.value, 0, '|')

            splitedText.value.splice(currentIndex.value + 1, 1, `${baseText.value.split('')[currentIndex.value + 1]}`)


            textDisplay.value = splitedText.value.join('')

            return        
        }

        splitedText.value.splice(fromIndex, 1)
        splitedText.value.splice(currentIndex.value + 1, 0, '|')

        if (typedLetter !== splitedText.value[currentIndex.value]) {
            splitedText.value.splice(currentIndex.value, 1, `<span class='red'>${splitedText.value[currentIndex.value]}</span>`);
        } else {
            splitedText.value.splice(currentIndex.value, 1, `<span class='green'>${splitedText.value[currentIndex.value]}</span>`);
        }

        textDisplay.value = splitedText.value.join('')
        currentIndex.value++

        if(currentIndex.value === baseText.value.length -1) {
            const allCorrect = document.getElementsByClassName('red')
            if (allCorrect.length === 0) {
                emit('finished')
            } else {
                return
            }
        }
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