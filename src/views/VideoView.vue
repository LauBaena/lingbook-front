<template>
    <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
        <template v-slot:firstContent>
            <div v-if="video && video.status === '1'">
                <h1>Aquí ha d'anar el títol del video, que es el description (aka missatge 0) </h1>
                <div class="video-player">
                    <vue-plyr class="video">
                        <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                    </vue-plyr>
                </div>
            </div>
            <div v-else>No s'ha trobat el vídeo</div>
        </template>
    </TeacherMenu>

    <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
        <template v-slot:firstContent>
            <div v-if="video && video.status === '1'">
                <h1>Aquí ha d'anar el títol del video, que es el description (aka missatge 0) </h1>
                <div class="video-player">
                    <vue-plyr class="video">
                        <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                    </vue-plyr>
                </div>
            </div>
            <div v-else>No s'ha trobat el vídeo</div>
        </template>
    </StudentMenu>

    <AdminMenu v-else >
        <template v-slot:firstContent>
            <div v-if="video">
                <div v-if="video.status === '0'">Aquest vídeo ha estat eliminat i la resta d'usuaris no el poden visualitzar</div>
                <h1>Aquí ha d'anar el títol del video, que es el description (aka missatge 0) </h1>
                <div v-if=" video.status === '1'" class="button-delete" @click="modificaStatus('0')">Esborra el vídeo</div>
                <div v-if="video && video.status === '0'" class="button-delete" @click="modificaStatus('1')">Torna'l a publicar</div>
                <div class="video-player">
                    <vue-plyr class="video">
                        <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                    </vue-plyr>
                </div>
            </div>
            <div v-else>No s'ha trobat el vídeo</div>
        </template>
    </AdminMenu>

</template>

<script>

import { useAuthStore } from "@/store/auth";
import { computed } from "vue";

import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";

import {useVideosStore} from "@/store/videos";
import {onBeforeMount} from "@vue/runtime-core";

    export default {
    name: "TeacherVideoView",
    components: {
        TeacherMenu,
        StudentMenu,
        AdminMenu,

    },

    props: {
        id_video: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        console.log("EL props 1", props.id_video)
        const videosStore = useVideosStore();
        const authStore = useAuthStore();
        const authUser = computed(() => {
            return authStore.authUser;
        });

        const video = computed(() => {
            // Afegim condició de que han de coincidir props id_video i el de la videoStore. Si no, es mostra el video anterior que l'usuari ha vist i ha de premer f5
            if (props.id_video !== videosStore.video.id_video) {
                return null; 
            }
            return videosStore.video;
        });

        onBeforeMount(async () => await videosStore.viewSelectedVideo(props.id_video));

        function modificaStatus(controlStatus) {
            videosStore.flipStatus(props.id_video, controlStatus);
        }
        return {
            video,
            videosStore,
            authStore,
            authUser,
            modificaStatus,
        };

    }

    };

</script>

<style>

    .video-player {
        width: 75%;
    }

    .button-delete {
        width: min-content;
        min-width: 14%;
        font-weight: bold;
        margin-bottom: 10px;
        cursor: default;
        background-color: #55b1df;
        max-width: 20%; 
        color: white;
        padding: 13px 1%;
        border: 1px solid #ccc;
        border-radius: 27px;
        /* font-size: 100%; */
        letter-spacing: .8px;
    }
    .button-delete:hover {
        cursor: pointer  !important;;
        background-color: #fff;
        border: 1px solid #55b1df;
        color: #55b1df;
        cursor: pointer;
    }


</style>