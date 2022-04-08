<template>
    <p class="textColor textContainer" v-html="textDisplay"></p>
</template>

<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import axios from 'axios'

type Entries = {
    base: number
    total: number
    correct: number
}

// Text that will be used as a base.
const baseText = ref<string>('')
const textDisplay = ref<string>(baseText.value)
const splitedText = ref<string[]>([''])

// Represents the current indexation based on the baseText and past typed characters.
const currentIndex = ref<number>(0)

// Reactive object to accumulate the stats from the user typed characters.
const entries: Entries = reactive({
    base: computed(() => splitedText.value.length),
    total: 0,
    correct: 0
})

const emit = defineEmits(['finished'])

// Typed keys to be ignored by the typing verification logic.
const ignoreTyping: string[] = ['CapsLock', 'Shift']

watch(baseText, () => {
    splitedText.value = baseText.value.split('')
})

const marker = '<span class="marker">|</span>'

/**
 * Binds the key strokes on the screen and triggers the logic for the characters verification.
 * 
 * Based on the expected letter and typed letter the current index color will change identifying it 
 * as correct or incorrect and updating the entries statistics.
 * 
 * @param verifier - Used to verify if the text verification logic should be executed based on the current
 * state of the screen elements.
 */
function startTyping(verifier: boolean): void {
    window.onkeydown = (event) => {
        if (!verifier) {
            return
        }

        const typedLetter = event.key

        if (ignoreTyping.includes(typedLetter)) {
            return
        }

        entries.total++

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

        // Checks if the text is completely correct and have nothing left, so the finish logic can be emitted.
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

/**
 * Responsible for emitting the 'finished' event, passing the entries statistics as values.
 */
function emitFinished(): void{
    emit('finished', entries)
}

/**
 * Makes the axios call to get a random quote and disply it on the template.
 */
function startText(): void {
    axios.get('https://favqs.com/api/qotd').then(response => {
        currentIndex.value = 0

        baseText.value = response.data.quote.body
        textDisplay.value = baseText.value
    })
}

/**
 * Logic to specifically handle the backspace key stroke.
 */
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