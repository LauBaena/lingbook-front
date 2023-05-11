<template>
    <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
        <template v-slot:firstContent>
            <div class="total-container" v-if="video && video.status === '1'">
                <h1>Títol del video del professor / de la professora: {{messages[messages.length-1].description}}</h1>
                <div class="video-player">
                    <vue-plyr class="video">
                        <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                    </vue-plyr>
                </div>
                <div class="writeMessage">
                    <form @submit.prevent="addMessage()">
                        <div class="container">
                            <h3 class="title">Escriu un missatge: </h3>
                            <textarea
                                v-model="addMessageForm.message"
                                type="message"
                                name="message"
                                id="message"
                                class="form-style"
                                autocomplete="off"
                                required/>
                            <input type="submit" class="message-button" value="Afegir">
                        </div>
                    </form>
                </div>
                <div>
                    <div v-for="message in messages.slice(0, messages.length - 1)" :key="message.id_message" :message="message">
                        <div class="messageCard">
                            <div class="titleContainer">
                                <h3 class="title"> {{ message.name }} {{ message.surname }}</h3>
                                <p>{{ message.created_at }}</p>
                            </div>
                            <p> {{ message.description }} </p>
                            <div class="buttons" v-if="message.id_user === authStore.authUser.id_user">
                                <div class="buttons-link" @click="deleteMessage(message.id_message)">Esborrar</div>
                                <div class="buttons-link" @click="editMessage(message.id_message)">Editar</div>
                            </div>                        
                        </div>
                        <div class="line"></div>
                    </div> 
                </div>
            </div>
            <div v-else>No s'ha trobat el vídeo</div>
        </template>
    </TeacherMenu>

    <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
        <template v-slot:firstContent>
            <div v-if="video && video.status === '1'">
                <h1>Títol del video del professor / de la professora: {{messages[messages.length-1].description}}</h1>
                <div class="video-player">
                    <vue-plyr class="video">
                        <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                    </vue-plyr>
                </div>
                <div class="writeMessage">
                    <form @submit.prevent="addMessage()">
                        <div class="container">
                            <h3 class="title">Escriu un missatge: </h3>
                            <textarea
                                v-model="addMessageForm.message"
                                type="message"
                                name="message"
                                id="message"
                                class="form-style"
                                autocomplete="off"
                                required/>
                            <input type="submit" class="message-button" value="Afegir">
                        </div>
                    </form>
                </div>
                <div>
                    <div v-for="message in messages.slice(0, messages.length - 1)" :key="message.id_message" :message="message">
                        <div class="messageCard">
                            <div class="titleContainer">
                                <h3 class="title">{{ message.name }} {{ message.surname }}</h3>
                                <p>{{ message.created_at }}</p>
                            </div>
                            <p> {{ message.description }} </p>
                            <div class="buttons" v-if="message.id_user === authStore.authUser.id_user">
                                <div class="buttons-link" @click="deleteMessage(message.id_message)">Esborrar</div>
                                <div class="buttons-link" @click="editMessage(message.id_message)">Editar</div>
                            </div>
                        </div>
                        <div class="line"></div>
                    </div> 
                </div>
            </div>
            <div v-else>No s'ha trobat el vídeo</div>
        </template>
    </StudentMenu>

    <AdminMenu v-else >
        <template v-slot:firstContent>
            <div v-if="video">
                <!-- <h1 v-if="video.status === '1'">Títol del video del professor / de la professora: {{message[messages.length-1].description}}</h1> -->
                <h1>Vídeo que es vol eliminar o recuperar del professor / de la professora</h1>
                <p v-if="video.status === '0'">Aquest vídeo ha estat eliminat i la resta d'usuaris no el poden visualitzar</p>
                <div v-if=" video.status === '1'" class="button-delete" @click="modificaStatus('0')">Esborra el vídeo</div>
                <div v-if="video && video.status === '0'" class="button-delete" @click="modificaStatus('1')">Torna'l a publicar</div>
                <div class="video-player">
                    <vue-plyr class="video">
                        <div data-plyr-provider="youtube" :data-plyr-embed-id="video.link"></div>
                    </vue-plyr>
                </div>
                <div>
                    <div v-for="message in messages.slice(0, messages.length - 1)" :key="message.id_message" :message="message">
                        <div class="messageCard">
                            <div class="titleContainer">
                                <h3 class="title"> {{ message.name }} {{ message.surname }}</h3>
                                <p>{{ message.created_at }}</p>
                            </div>
                            <p> {{ message.description }} </p>
                            <p class="delete" @click="deleteMessage(message.id_message)">Esborrar</p>
                        </div>
                        <div class="line"></div>
                    </div> 
                </div>
            </div>
            <div v-else>No s'ha trobat el vídeo</div>  
        </template>
    </AdminMenu>
</template>

<script>

import { useAuthStore } from "@/store/auth";
import { computed, ref } from "vue";

import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import {useRouter} from "vue-router";
import {useVideosStore} from "@/store/videos";
import {useMessagesStore} from "@/store/messages";
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
        const messagesStore = useMessagesStore();
        const authStore = useAuthStore();
        const router = useRouter();
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
        onBeforeMount(async () => await messagesStore.fetchVideoMessages(props.id_video));

        async function modificaStatus(controlStatus) {
            await videosStore.flipStatus(props.id_video, controlStatus);
        }

        const messages = computed(() => {
            return messagesStore.messages;
        });

        const addMessageForm = ref({
            message: "",
            id_user: authStore.authUser.id_user,
            id_video: props.id_video,
        });

        async function addMessage() {
            await messagesStore.addMessage(addMessageForm.value);
            addMessageForm.value.message = "";
            await messagesStore.fetchVideoMessages(props.id_video);
        }

        async function deleteMessage(message_id) {
            await messagesStore.deleteMessage(message_id);
            await messagesStore.fetchVideoMessages(props.id_video);
        }

        function editMessage(message_id) {
            router.push({path: `/editMessage/${message_id}`});
        }
        
        return {
            video,
            videosStore,
            authStore,
            authUser,
            modificaStatus,
            messages,
            addMessage,
            addMessageForm,
            deleteMessage,
            editMessage
        };
    }

    };

</script>

<style scoped>
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
        letter-spacing: .8px;
        text-align: center;
    }
    .button-delete:hover {
        cursor: pointer  !important;;
        background-color: #fff;
        border: 1px solid #55b1df;
        color: #55b1df;
        cursor: pointer;
    }

    .messageCard{
        margin-bottom: 10px;
        border-radius: 10px;
        padding: 10px 0px 10px 0px;
    }
    .titleContainer{
        display: flex;
        flex-direction: row; 
        align-items: baseline;
    }
    .title{
        text-decoration: inherit;
        color: #05a5d4;
        margin-right: 10px;
    }
    .delete{
        text-decoration: inherit;
        color: #05a5d4;
        padding-top: 10px;
        cursor: pointer;
        margin-right: 25px;
        margin-bottom: 15px;
    }
    .buttons{
        display: flex;
        flex-direction: row; 
        align-items: center; 
    }
    .buttons-link{
        text-decoration: inherit;
        color: #05a5d4;
        margin-bottom: 15px;
        padding-top: 20px;
        cursor: pointer;
        margin-right: 25px;
    }
    .line {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 250px;
        height: 1px;
        background-color: rgb(234, 230, 230);
    }
    .clicable {
        font-weight: bold;
        margin-top: 10px;
        cursor: default;
    }

    .container {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }

    textarea {
        color: #8a8a8a;
        height: 60px;
        padding: 5px 2%;
        border: 1px solid #ccc;
        border-radius: 27px;
        font-size: 100%;
        letter-spacing: .8px;
        margin-bottom: 20px;
    }

    textarea:focus {
        outline: none;
        border: 1px solid #58bff6;
        color: #58bff6;
    }

    .message-button {
        width: 112px;
        height: 40px;
        border-radius: 20px;
        background-color: #55b1df;
        border: none;
        color: #fff;
        font-weight: bold;
        align-self: flex-end;
    }

    .message-button:hover {
        background-color: #fff;
        border: 1px solid #55b1df;
        color: #55b1df;
        cursor: pointer;
    }

    .message-button-icon {
        font-size: 15px;
        font-weight: bold;
    }
</style>