<template>
    <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
        <template v-slot:firstContent>
            <h1>Aquí ha d'anar el títol del video, que es el description (aka missatge 0) </h1>
            <div class="video-player">
                <vue-plyr v-if="video" class="video">
                    <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                </vue-plyr>
            </div>
        </template>
    </TeacherMenu>

    <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
        <template v-slot:firstContent>
            <h1>Aquí ha d'anar el títol del video, que es el description (aka missatge 0) </h1>
            <div class="video-player">
                <vue-plyr v-if="video" class="video">
                    <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                </vue-plyr>
            </div>
        </template>
    </StudentMenu>

    <AdminMenu v-else >
        <template v-slot:firstContent>
            <h1>Aquí ha d'anar el títol del video, que es el description (aka missatge 0) </h1>
            <div class="video-player">
                <vue-plyr v-if="video" class="video">
                    <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                </vue-plyr>
            </div>
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
        const videosStore = useVideosStore();
        const authStore = useAuthStore();
        const authUser = computed(() => {
            return authStore.authUser;
        });

        const video = computed(() => {
            console.log("HI HA ALGU AQUI",videosStore.video)
            return videosStore.video;
        });

        onBeforeMount(async () => await videosStore.viewSelectedVideo(props.id_video));

        return {
            video,
            videosStore,
            authStore,
            authUser,
        };

    }

    };

</script>

<style>

.video-player {
    width: 75%;
}


</style>