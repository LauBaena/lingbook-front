<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1>Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
                <h2>Tots els meus vídeos</h2>
                <form @submit.prevent="afegirVideo()">
                    <div class="container">
                        <p>Afegeix un vídeo: </p>
                        <p class="formLabel">&nbsp;Url: </p>
                        <input
                                v-model="addVideoForm.url"
                                type="url"
                                name="url"
                                id="url"
                                class="form-style"
                                autocomplete="off"
                                required/>
                        <p class="formLabel">&nbsp;Títol: </p>
                        <input
                                v-model="addVideoForm.titol"
                                type="text"
                                name="description"
                                id="description"
                                class="form-style"
                                autocomplete="off"
                                required/>
                        <input type="submit" class="video-button" value="Afegir">
                    </div>
                </form>
                <div class="videosContainer">
                    <!-- <VideoCard class="video" v-for="video in videosStore.videos" :key="video.id_video" :video="video"/> -->
                    <div class="videoCard" v-for="video in videosStore.videos" :key="video.id_video" :video="video">
                        <div class="playerContainer">
                            <vue-plyr>
                                <div data-plyr-provider="youtube" :data-plyr-embed-id="video.shortLink"></div>
                            </vue-plyr>
                            <!-- <p>Data creació: {{ video.created_at }}</p> -->
                            <div class="clicable" @click="goToVideoView(video.id_video)">Ves al vídeo</div>
                        </div>
                    </div>
                </div>
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
            <template v-slot:firstContent>
                <h1 v-for="teacher in teachers" :key="teacher.id" >Els vídeos de del/la professor/a {{teacher.name}} {{teacher.surname}}</h1>
                <div class="videosContainer">
                    <div class="videoCard" v-for="video in videosStore.videos" :key="video.id_video" :video="video">
                        <div class="playerContainer">
                            <vue-plyr class="">
                                <div data-plyr-provider="youtube" :data-plyr-embed-id="video.shortLink"></div>
                            </vue-plyr>
                            <!-- <p>Data creació: {{ video.created_at }}</p> -->
                            <div class="clicable" @click="goToVideoView(video.id_video)">Ves al vídeo</div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:secondContent>
                <h1 v-for="teacher in teachers" :key="teacher.id">Les classes de {{ teacher.name }}
                    {{ teacher.surname }}</h1>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Descripció</th>
                        <th>Capacitat</th>
                        <th>Data</th>
                    </tr>
                    <tr v-for="classe in classes" :key="classe.id_room" :classe="classe">
                        <td>{{ classe.name }}</td>
                        <td>{{ classe.description }}</td>
                        <td>{{ classe.capacity }}</td>
                        <td>{{ classe.DATA }}</td>
                    </tr>
                </table>
            </template>
        </StudentMenu>
        <AdminMenu v-else>
            <template v-slot:firstContent>
                <h1 v-for="teacher in teachers" :key="teacher.id" >Els vídeos de del/la professor/a {{teacher.name}} {{teacher.surname}}</h1>
                <div class="videosContainer">
                    <div class="videoCard" v-for="video in videosStore.videos" :key="video.id_video" :video="video">
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
        </AdminMenu>
    </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import {computed} from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";

import {useVideosStore} from "@/store/videos";
import {onBeforeMount} from "@vue/runtime-core";

import {useUsersStore} from "@/store/users";

import {ref} from "vue";

import {useRouter} from "vue-router";
import {useClassesStore} from "@/store/classes";


export default {
    name: "TeacherView",
    components: {
        StudentMenu,
        TeacherMenu,
        AdminMenu,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const router = useRouter();
        const videosStore = useVideosStore();
        const classesStore = useClassesStore();
        const authStore = useAuthStore();
        const authUser = computed(() => {
            return authStore.authUser;
        });

        const goToVideoView = (id_video) => {
            router.push({path: `/teacher/${props.id}/video/${id_video}`});
        };

        const usersStore = useUsersStore();
        const addVideoForm = ref({
            url: "",
            titol: "",
            id_user: JSON.parse(JSON.stringify(authStore.authUser.id_user)),
        });

        async function afegirVideo() {
            await videosStore.addVideo(addVideoForm.value);
            await videosStore.fetchUserVideos(props.id);
        }

        // onBeforeMount(async () => await videosStore.fetchUserVideos(props.id));
        // onBeforeMount(async () => await usersStore.fetchUser(props.id));

        onBeforeMount(async () => {
            await usersStore.fetchUser(props.id);
            await videosStore.fetchUserVideos(props.id);
        });

        const teachers = computed(() => {
            return usersStore.teachersByLanguage;
        });

        onBeforeMount(async () => await classesStore.fetchTeacherClasses(props.id));

        const classes = computed(() => {
            return classesStore.classes;
        });

        return {
            authStore,
            authUser,
            videosStore,
            props,
            teachers,
            addVideoForm,
            afegirVideo,
            goToVideoView,
            classesStore,
            classes
        };
    }
}
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

.videoCard {
    margin-left: 20px;
    margin-bottom: 40px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    width: 30%;

}

.playerContainer {
    width: 100%;
}

.clicable {
    font-weight: bold;
    margin-top: 10px;
    cursor: default;
}

.clicable:hover {
    cursor: pointer !important;;
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

    .videoCard {
        margin-left: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-flow: row wrap;
        /* align-items: center;
        width: 100%;  */
    }
}

</style>