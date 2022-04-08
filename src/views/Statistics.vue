<script setup lang="ts">
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import { useRoute } from "vue-router"

const route: Record<string, any> = useRoute()
const entriesData = JSON.parse(route.params.data)
const timePassed = JSON.parse(route.params.time)

const stats = reactive({
    accuracy: Math.round((entriesData.correct/entriesData.total)*100),
    WPM: Math.round(((entriesData.total/5))/timePassed),
    correct: Math.round((entriesData.correct/5)),
    base: Math.round((entriesData.base/5))
})

</script>

<template>
    <div>
        <h1>Time's Up!</h1>
        <div class="statsGrid">
            <div>
                <h3>CON</h3>
                <p>80%</p>
            </div>
            <div>
                <h3>ACC</h3>
                <p>{{ stats.accuracy }}%</p>
            </div>
            <div>
                <h3>WPM</h3>
                <p>{{ stats.WPM }}</p>
            </div>
            <div class="secondRow">
                <div>
                    <h3>WORDS</h3>
                    <p>{{ stats.correct }}/{{ stats.base }}</p>
                </div>
                <div>
                    <h3>TIME</h3>
                    <p>{{ timePassed }} minutes</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1, p {
    color: #E7DE79;
    font-size: 50px;
}

h3 {
    font-size: 40px;
    margin-bottom: 0;
}

p {
    font-size: 30px;
    margin: 0;
}

div.statsGrid {
    margin-top: 100px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    column-gap: 40px;
}

div.secondRow {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    grid-column: span 3;
}
</style>