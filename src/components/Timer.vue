<template>
    <p class="timer" @click="toggleModal">{{ minutes }}:{{ seconds }}</p>
    <div class="modal-overlay" v-if="changeTime">
        <div class="modal">
            <div class="time-inputs">
                <input class="input" v-model="newMinutes" type="number" min="0">
                <p>:</p>
                <input class="input" v-model="newSeconds" type="number" min="0">
            </div>
            <div class="time-buttons">
                <button @click="setTime">V</button>
                <button @click="toggleModal">X</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Minutes and seconds that will be changed and displayed.
const minutes = ref<string | number>('00')
const seconds = ref<string | number>('00')

// Minutes and seconds setted by the modal to redetermine the timer values.
const newMinutes = ref<string>('')
const newSeconds = ref<string>('')

// Reference for the time interval, so we can control and stop it.
const timerInterval = ref()

const changeTime = ref<boolean>(false)
/**
 * Sets the time interval responsible for changing the time displayed on the screen.
 */
function handleTimer(): void {
    if (minutes.value === '00' && seconds.value === '00') {
        minutes.value = '01'
    }

    timerInterval.value = setInterval(() => {
        seconds.value = Number(seconds.value)
        minutes.value = Number(minutes.value)

        emit('timePassed', timePassed())

        if (seconds.value === 0) {
            if (minutes.value !== 0) {
                minutes.value = minutes.value - 1
                seconds.value = 59
            } else {
                clearTimerInterval(timerInterval.value)
                formatTime()
                emit('timesUp')
                return
            }
        }
        seconds.value = seconds.value - 1

        formatTime()
    }, 1000)
}

/**
 * Responsible for formating the time value to a more visual format.
 */
function formatTime() {
    if (seconds.value.toString().length === 1) {
        seconds.value = `0${ seconds.value }`
    }

    if (minutes.value.toString().length === 1) {
        minutes.value = `0${ minutes.value }`
    }
}

/**
 * Clear the time interval passed when called.
 * 
 * @param intervalName - Time interval to be stoped.
 */
function clearTimerInterval(intervalName: ReturnType<typeof setInterval>): void {
    clearInterval(intervalName)
}

/**
 * Toggle the visibility of the modal that changes the time value.
 */
function toggleModal(): void {
    changeTime.value = !changeTime.value
}

/**
 * Gets the modelValue that was set on the inputs and use it to change the time that will be manipulated.
 */
function setTime():void {
    minutes.value = Number(newMinutes.value)
    seconds.value = Number(newSeconds.value)

    formatTime()
    clearTimerInterval(timerInterval.value)

    if (changeTime.value) {
        changeTime.value = !changeTime.value
    }
}


/**
 * Reuturns the time passed since the running time interval was started.
 * 
 * @returns The total time passed.
 */
function timePassed(): number[]{
    let passedMinutes, passedSeconds
    if (!newMinutes.value && !newSeconds.value) {
        passedMinutes = 1 - Number(minutes.value)
        return [passedMinutes, 0o0]
    } else {
        passedMinutes = Number(newMinutes.value) - Number(minutes.value)
        passedSeconds = (Number(newSeconds.value) - Number(seconds.value))/60

        return [passedMinutes, passedSeconds]
    }
}

const emit = defineEmits(['timesUp', 'timePassed'])

defineExpose({handleTimer, setTime, toggleModal, changeTime})

</script>

<script lang="ts">
export default {};
</script>

<style>
p.timer {
    font-size: 40px;
    color: #E7DE79;
}

.modal-overlay .modal .time-inputs {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 30px;
}

.modal-overlay .modal .time-inputs p{
    margin: 0 3px;
}

.modal-overlay .modal .time-inputs input {
    width: 50px;
    height: 50px;
    font-size: 30px;

    background: #19162200;
    border: 1px solid #FFF;
    color: #FFF
}


.modal-overlay .modal .time-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-left: 8px;
}

.modal-overlay .modal .time-buttons button {
    margin: 4px 4px;
}
</style>