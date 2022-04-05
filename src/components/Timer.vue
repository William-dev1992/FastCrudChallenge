<script setup lang="ts">
import { watch, ref } from 'vue'

const minutes = ref<string | number>('00')
const seconds = ref<string | number>('00')
const changeTime = ref<boolean>(false)

const newMinutes = ref('')
const newSeconds = ref('')
const timerInterval = ref()

function handleTimer() {
    if (minutes.value === '00' && seconds.value === '00') {
        minutes.value = '01'
    }

    timerInterval.value = setInterval(() => {
        seconds.value = Number(seconds.value)
        minutes.value = Number(minutes.value)

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

function formatTime() {
    if (seconds.value.toString().length === 1) {
        seconds.value = `0${ seconds.value }`
    }

    if (minutes.value.toString().length === 1) {
        minutes.value = `0${ minutes.value }`
    }
}

function clearTimerInterval(intervalName: any) {
    clearInterval(intervalName)
}

function toggleModal() {
    changeTime.value = !changeTime.value
}

function setTime() {
    minutes.value = Number(newMinutes.value)
    seconds.value = Number(newSeconds.value)

    formatTime()
    clearTimerInterval(timerInterval.value)

    if (changeTime.value) {
        changeTime.value = !changeTime.value
    }
}

const emit = defineEmits(['timesUp'])

defineExpose({handleTimer, setTime, toggleModal, changeTime})

</script>

<template>
    <p class="timer" @click="toggleModal">{{ minutes }}:{{ seconds }}</p>
    <div class="modal-overlay" v-if="changeTime">
        <div class="modal">
            <div class="time-inputs">
                <input class="input" v-model="newMinutes" type="number">
                <p>:</p>
                <input class="input" v-model="newSeconds" type="number">
            </div>
            <div class="time-buttons">
                <button @click="setTime">V</button>
                <button @click="toggleModal">X</button>
            </div>
        </div>
    </div>
</template>

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