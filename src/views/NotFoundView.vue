<template>
    <div>
        <h1>Error 404: Pàgina no trobada</h1>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "NotFoundView"
})
</script>

<style scoped>
    div{
        margin: 20px;
        display: flex;
        flex-direction: column;
        min-height: 62.7vh;
    }
    h1{
        font-size: 34px;
    }
</style>