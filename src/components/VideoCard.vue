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
        width: 100%;
        margin-bottom: 70px;
    }

    @media screen and (max-width: 1369px) {

        .videoCard{
            margin-left: 20px;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
        }

        .playerContainer{
            width: 100%;
            margin-bottom: 30px;
        }

    }


</style>