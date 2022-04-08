<template>
    <p class="textColor textContainer" v-html="textDisplay"></p>
</template>

<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import axios from 'axios'

const baseText = ref<string>('')
const textDisplay = ref<string>(baseText.value)
const splitedText = ref<string[]>([''])
const currentIndex = ref<number>(0)

const entries = reactive({
    base: computed(() => splitedText.value.length),
    total: 0,
    correct: 0
})

const emit = defineEmits(['finished'])

const ignoreTyping: string[] = ['CapsLock', 'Shift']

watch(baseText, () => {
    splitedText.value = baseText.value.split('')
})

const marker = '<span class="marker">|</span>'

function startTyping(verifier: boolean) {
    window.onkeydown = (event) => {
        if (!verifier) {
            return
        }

        const typedLetter = event.key
        entries.total++
        
        if (ignoreTyping.includes(typedLetter)) {
            return
        }

        const fromIndex = splitedText.value.indexOf(marker)
        splitedText.value.splice(fromIndex, 1)

        if (typedLetter === 'Backspace') {
            handleBackspace()
            return
        }

        splitedText.value.splice(currentIndex.value + 1, 0, marker)

        const colorClass = typedLetter !== splitedText.value[currentIndex.value] ? 'wrong' : 'right'

        if (colorClass === 'right') {
            entries.correct++
        }

        splitedText.value.splice(currentIndex.value, 1, `<span class='${colorClass}'>${splitedText.value[currentIndex.value]}</span>`);

        textDisplay.value = splitedText.value.join('')
        currentIndex.value++

        if(currentIndex.value === baseText.value.length -1) {
            const allCorrect = document.getElementsByClassName('wrong')
            if (allCorrect.length === 0) {
                emitFinished()
            } else {
                return
            }
        }
    }
}

function emitFinished(): void{
    emit('finished', entries)
}

function startText(): void {
    axios.get('https://favqs.com/api/qotd').then(response => {
        currentIndex.value = 0

        baseText.value = response.data.quote.body
        textDisplay.value = baseText.value
    })
}

function handleBackspace(): void {
    if (currentIndex.value === 0) {
        return
    }
    
    currentIndex.value = currentIndex.value - 1
    splitedText.value.splice(currentIndex.value, 0, marker)
    splitedText.value.splice(currentIndex.value + 1, 1, `${baseText.value.split('')[currentIndex.value]}`)
    textDisplay.value = splitedText.value.join('')
}

defineExpose({startTyping, startText, emitFinished})

</script>

<script lang="ts">
export default {};
</script>

<style>
.textColor {
    color: #41414D
}

.marker {
    color: #E7DE79;
}

.wrong {
    color: #E96379;
}

.right {
    color: #E1E1E6;
}

.textContainer {
    max-width: 650px;

    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
}
</style>