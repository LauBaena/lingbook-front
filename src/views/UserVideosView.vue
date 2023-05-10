<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1 class="profilePrivate">Espai personal de {{ authStore.authUserCompleteName }}
                ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
                <h2>Tots els vídeos</h2>
                <form @submit.prevent="afegirVideo()">
                    <div class="container">
                        <p>Afegeix un vídeo: </p>
                        <p class="formLabel">&nbsp;&nbsp;&nbsp;Url: </p>
                        <input
                                v-model="addVideoForm.url"
                                type="url"
                                name="url"
                                id="url"
                                class="form-style"
                                autocomplete="off"
                                required/>
                        <input type="submit" class="video-button" value="Afegir">
                    </div>
                </form>
                <div class="videosContainer">
                    <VideoCard class="video" v-for="video in videosStore.videos" :key="video.id_video" :video="video"/>
                </div>
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
            <template v-slot:firstContent>
                <h2>No pots accedir a aquesta vista</h2>
            </template>
        </StudentMenu>
        <AdminMenu v-else>
            <template v-slot:firstContent>
                <h2>Tots els vídeos</h2>
                <!-- <vue-plyr>
                    <div data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY"></div>
                </vue-plyr> -->
                <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/8Eu3jmEUlzc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
                <div class="videosContainer">
                    <VideoCard class="video" v-for="video in videosStore.videos" :key="video.id_video" :video="video"/>
                </div>
            </template>
        </AdminMenu>
    </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import {useVideosStore} from "@/store/videos";
import {onBeforeMount} from "@vue/runtime-core";
import {computed} from "vue";
import VideoCard from '../components/VideoCard.vue';
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";

// Importem component per crear plantilles:
import {ref} from "vue";

export default {

    name: "AllVideosView",

    components: {
        VideoCard,
        StudentMenu,
        TeacherMenu,
        AdminMenu,
    },
    setup() {
        const videosStore = useVideosStore();
        const authStore = useAuthStore();
        const addVideoForm = ref({
            url: "",
            id_user: JSON.parse(JSON.stringify(authStore.authUser.id_user)),
        });


        console.log("El id del authstore " + JSON.stringify(authStore.authUser.id_user))

        function afegirVideo() {
            videosStore.addVideo(addVideoForm.value)
            videosStore.addVideo(addVideoForm.value)
        }

        onBeforeMount(async () => await videosStore.fetchUserVideos(addVideoForm.value.id_user));

        const authUser = computed(() => {
            return authStore.authUser;
        });

        return {
            videosStore,
            authStore,
            authUser,
            addVideoForm, // -> formulari
            afegirVideo, // -> funció afegir video
        };
    }
};
</script>

<style scoped>
.studentPic {
    width: 10%;
    margin: 40px;
    border-radius: 50%;
    border: #d9d9d9 6px solid;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.videosContainer {
    display: flex;
    flex-flow: wrap;
    padding: 20px;
}

.container {
    display: flex;
    align-items: center;
}

input {
    margin-left: 5px;
    color: #8a8a8a;
    height: 20px;
    padding: 3px 1%;
    border: 1px solid #ccc;
    border-radius: 27px;
    font-size: 100%;
    letter-spacing: .8px;
}

input:focus {
    outline: none;
    border: 1px solid #58bff6;
    color: #58bff6;
}

.video {
    width: 30%;
}

.video-button {
    margin-left: 30px;
    width: 112px;
    height: 40px;
    border-radius: 20px;
    background-color: #55b1df;
    border: none;
    color: #fff;
    font-weight: bold;

}

.video-button:hover {
    background-color: #fff;
    border: 1px solid #55b1df;
    color: #55b1df;
    cursor: pointer;
}

.video-button-icon {
    font-size: 15px;
    font-weight: bold;
}

@media screen and (max-width: 1369px) {

    .header {
        width: 70%;
    }

    .studentPic {
        width: 30%;
        margin: 10px;
        border-radius: 50%;
        border: #d9d9d9 6px solid;
    }

    .profilePrivate {
        width: 20%;
        margin-right: 80px;
    }

    .video {
        width: 100%;
    }
}

</style>