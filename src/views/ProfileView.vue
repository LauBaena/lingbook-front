<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1 class="profilePrivate">Espai personal de {{ authStore.authUserCompleteName }}
                ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
                <h2>Les meves properes classes</h2>
                <div v-if="classes == ''">
                    <p>No has creat cap classe</p>
                </div>
                <div v-else>
                    <table>
                        <tr>
                            <th>Nom</th>
                            <th>Descripció</th>
                            <th>Capacitat</th>
                            <th>Data</th>
                            <th>Esborrar</th>
                        </tr>
                        <tr v-for="classe in classes" :key="classe.id_room" :classe="classe">
                            <td class="primeraMajuscula">{{ classe.name }}</td>
                            <td class="primeraMajuscula">{{ classe.description }}</td>
                            <td>{{ classe.capacity }}</td>
                            <td>{{ classe.DATA }}</td>
                            <td><p class="deleteRoom" @click="deleteClassroom(classe.id_room)">Esborrar</p></td>
                        </tr>
                    </table>
                </div>
            </template>
            <template v-slot:secondContent>
                <h2>Els meus darrers vídeos</h2>
                <div v-if="teacherVideos.length!=0" class="videosContainer">
                    <div class="videoCard" v-for="video in teacherVideos.slice(-3)" :key="video.id_video"
                         :video="video">
                        <div class="playerContainer">
                            <vue-plyr>
                                <div data-plyr-provider="youtube" :data-plyr-embed-id="video.shortLink"></div>
                            </vue-plyr>
                            <p>Data creació: {{ video.created_at }}</p>
                            <a class="clicable" @click="goToVideoView(video.id_video)">Ves al vídeo</a>
                        </div>
                    </div>
                </div>
                <div v-else><p>No has pujat cap video</p></div> 
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
            <template v-slot:firstContent>
                <h2>Les meves properes classes</h2>
                <div v-if="classesStudent == ''">
                    <p>No tens cap classe reservada</p>
                </div>
                <div v-else>
                    <table>
                        <tr>
                            <th>Nom</th>
                            <th>Descripció</th>
                            <th>Capacitat</th>
                            <th>Data</th>
                            <th>Anul·lar reserva</th>
                        </tr>
                        <tr v-for="classe in classesStudent" :key="classe.id_room" :classe="classe">
                            <td class="primeraMajuscula">{{ classe.name }}</td>
                            <td class="primeraMajuscula">{{ classe.description }}</td>
                            <td>{{ classe.capacity }}</td>
                            <td>{{ classe.DATA }}</td>
                            <td><p class="deleteRoom" @click="cancelClassroom(classe.id_room)">Anul·lar reserva</p></td>
                        </tr>
                    </table>
                </div>
            </template>
            <template v-slot:secondContent>
                <h2 class="messagesTitle"> Els darrers comentaris que he fet</h2>
                <div v-if="messages.length!=0" class="messagesContainer">
                    <MessageCard class="message" v-for="message in messages.slice(-3)" :key="message.id_message" :message="message" @deleteMessage="deleteMessage"/>
                </div>
                <div v-else><p>No has escrit cap missatge</p></div>  
            </template>
        </StudentMenu>
        <AdminMenu v-else>
            <template v-slot:firstContent>
                <h2>Darrers vídeos publicats a la plataforma</h2>
                <div class="videosContainer">
                    <div class="videoCard" v-for="video in allVideos.slice(-6)" :key="video.id_video"
                         :video="video">
                        <div class="playerContainer">
                            <vue-plyr>
                                <div data-plyr-provider="youtube" :data-plyr-embed-id="video.shortLink"></div>
                            </vue-plyr>
                            <p>Data creació: {{ video.created_at }}</p>
                            <a class="clicable" @click="goToVideoView(video.id_video)">Ves al vídeo</a>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:secondContent>
                <h2>Darrers usuaris registrats</h2>
                <div class="usersContainer">
                    <UserCard class="user" v-for="user in computedUsers.slice(-6)" :key="user.id_user" :user="user"/>
                </div>
            </template>
        </AdminMenu>
    </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import {useClassesStore} from "@/store/classes";
import {useVideosStore} from "@/store/videos";
import {computed} from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import {onBeforeMount} from "@vue/runtime-core";
import {useRouter} from "vue-router";
import MessageCard from '../components/MessageCard.vue';
import { useMessagesStore } from "@/store/messages";
import UserCard from '../components/UserCard.vue';
import { useUsersStore } from "@/store/users";

export default {
    name: "ProfileView",
    components: {
        StudentMenu,
        TeacherMenu,
        AdminMenu,
        MessageCard,
        UserCard,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const classesStore = useClassesStore();
        const router = useRouter();
        const authStore = useAuthStore();
        const videosStore = useVideosStore();
        const messagesStore = useMessagesStore();
        const usersStore = useUsersStore();

        onBeforeMount(async () => await messagesStore.fetchUserMessages(authStore.authUser.id_user));
        onBeforeMount(async () => await classesStore.fetchTeacherClasses(authStore.authUser.id_user));
        onBeforeMount(async () => await classesStore.fetchAlumnsClasses(authStore.authUser.id_user));
        // Agafem tots els vídeos. Enviem "1" per l'statusControl (que el video estigui publicat)
        onBeforeMount(async () => await videosStore.fetchAllVideos("0"));
        onBeforeMount(async () => await usersStore.fetchAllUsers("0"));
        onBeforeMount(async () => await videosStore.fetchLastUserVideos(props.id));

        const classes = computed(() => {
            return classesStore.classes;
        });
        const classesStudent = computed(() => {
            return classesStore.classesStudent;
        });
        const authUser = computed(() => {
            return authStore.authUser;
        });

        const messages = computed(() => {
            return messagesStore.messages;
        });

        const allVideos = computed(() => {
            return videosStore.videos;
        });

        const teacherVideos = computed(() => {
            return videosStore.lastTeacherVideos;
        });

        console.log(allVideos)

        const computedUsers = computed(() => {
            // Filtrem els users
            return usersStore.users.filter(user => user.status === '1');
        });

        async function deleteMessage(message_id) {
            await messagesStore.deleteMessage(message_id);
            await messagesStore.fetchUserMessages(authStore.authUser.id_user);
        }

        const goToVideoView = (id_video) => {
            router.push({path: `/teacher/${props.id}/video/${id_video}`});
        };

        async function deleteClassroom(id_room) {
            await classesStore.deleteClass(id_room, authStore.authUser.id_user)
            await classesStore.fetchTeacherClasses(authStore.authUser.id_user)
        }

        async function cancelClassroom(id_room) {
            await classesStore.cancelClass(id_room, authStore.authUser.id_user)
            await classesStore.fetchAlumnsClasses(authStore.authUser.id_user)
        }

        return {
            classesStore,
            authStore,
            authUser,
            classes,
            classesStudent,
            allVideos,
            videosStore,
            goToVideoView,
            deleteClassroom,
            cancelClassroom,
            messages,
            deleteMessage,
            teacherVideos,
            usersStore,
            computedUsers
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
    .messagesTitle{
        margin-top: 50px;
    }
    .messagesContainer{
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .message{
        cursor:pointer;
        margin-right:40px
    }
    .videosContainer {
        display: flex;
        flex-flow: wrap;
        padding: 20px;
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

    .usersContainer{
        display:flex;
        flex-flow: row wrap;
        
    }

    .user{
        flex-basis: 30%; /* eEstableix un ample bàsic */
        min-width: 385px; 
        max-width: 33.33%; 
    } 
    .clicable {
        font-weight: bold;
        margin-top: 10px;
        cursor: default;
    }

    .clicable:hover {
        cursor: pointer !important;
    }


table {
    border: 2px solid;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
}

table caption {
    font-size: 1.5em;
    margin: .5em 0 .75em;
}

table tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .35em;
}

table td, table th {
    border: 1px solid;
    padding: .625em;
    text-align: center;
}

table th {
    font-size: .85em;
    letter-spacing: .1em;
    text-transform: uppercase;
}


.primeraMajuscula {
    text-transform: capitalize;
}

.deleteRoom {
    color: #05a5d4;
    cursor: pointer;
}

@media screen and (max-width: 600px) {
    table {
        border: 0;
    }

    table caption {
        font-size: 1.3em;
    }

    table tr {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: .625em;
    }


    table td, table th {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: .8em;
        text-align: right;
    }
}
    @media screen and (min-width: 601px) and (max-width: 1000px) {
        table {
            border: 0;
            width: 85vw;
        }

        table caption {
            font-size: 1.0em;
        }

        table tr {
            border-bottom: 3px solid #ddd;
            display: block;
            margin-bottom: .625em;
        }

        table td, table th {
            border-bottom: 1px solid #ddd;
            display: block;
            font-size: .8em;
            text-align: left;
        }

        table td::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }

        table td:last-child {
            border-bottom: 0;
        }

        table th::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }

        table th:last-child {
            border-bottom: 0;
        }
    }
    @media screen and (max-width: 1369px) {

        table th::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }

        table th:last-child {
            border-bottom: 0;
        }
    }

    @media screen and (min-width: 601px) and (max-width: 1000px) {
        table {
            border: 0;
            width: 85vw;
        }

        table caption {
            font-size: 1.0em;
        }

        table tr {
            border-bottom: 3px solid #ddd;
            display: block;
            margin-bottom: .625em;
        }

        table td, table th {
            border-bottom: 1px solid #ddd;
            display: block;
            font-size: .8em;
            text-align: left;
        }

        table td::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }

        table td:last-child {
            border-bottom: 0;
        }

        table th::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }

        table th:last-child {
            border-bottom: 0;
        }
    }

    @media screen and (max-width: 1369px) {

        .studentPic {
            width: 20%;
            margin: 10px;
            border-radius: 50%;
            border: #d9d9d9 6px solid;
        }

        .profilePrivate {
            width: 10%;
            margin-right: 80px;
        }
        
        .user{
            width: 40%;
        }

    }
</style>