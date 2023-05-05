<template>
    <div class="videoCard">
        <div class="playerContainer">
            <div class="playerContainer">
                <vue-plyr>
                    <div data-plyr-provider="youtube" :data-plyr-embed-id="video.shortLink"></div>
                </vue-plyr>
                <p>Data creació: {{ video.created_at }}</p>
                <a @click="goToVideoView(video.id_video)">Ves al vídeo</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import {useRouter} from "vue-router";
    import { computed } from "vue";
    import { useUsersStore } from "@/store/users";

    export default defineComponent({
        props: {
            video:{
                type: Object,
                required: true,
            },
            id: {
                type: String,
                required: true,
            }
        },

        setup(props){
            const usersStore = useUsersStore();
            const router = useRouter();
            const teachers = computed(() => {
                return usersStore.teachersByLanguage;
            });
            const goToVideoView = (id_video) => {
                router.push({path: `/teacher/${props.id}/video/${id_video}`});
            };
            return{
                goToVideoView,
                teachers,
                props,
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