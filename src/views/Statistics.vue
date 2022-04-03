<script setup lang="ts">

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
                <p>90%</p>
            </div>
            <div>
                <h3>WPM</h3>
                <p>30</p>
            </div>
            <div class="secondRow">
                <div>
                    <h3>WORDS</h3>
                    <p>250/300</p>
                </div>
                <div>
                    <h3>TIME</h3>
                    <p>01:00</p>
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