<template>
    <div class="videoCard">
        <div class="playerContainer">
            <vue-plyr>
                <div data-plyr-provider="youtube" :data-plyr-embed-id="video.shortLink"></div>
            </vue-plyr>
            <p>Data creació: {{ video.created_at }}</p>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            video:{
                type: Object,
                required: true,
            }
        },
        setup(){

            return{

            }
        }
    })
</script>

<style scoped>
    .videoCard{
        margin-left: 20px;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
    }

    .playerContainer{
        width: 80%;
        margin-bottom: 70px;
    }

</style>