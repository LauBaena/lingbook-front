<template>
    <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
        <template v-slot:firstContent>
            <div class="writeMessage">
                <div>
                    <h3 class="title">Missatge a modificar:</h3>
                    <p>{{ message.description }}</p>
                </div>
                <form @submit.prevent="editMessage(message.id_message)">
                    <div class="container">
                        <h3 class="title">Nou missatge: </h3>
                        <textarea
                            v-model="editMessageForm.message"
                            type="message"
                            name="message"
                            id="message"
                            autocomplete="off"
                            required/>
                        <input type="submit" class="message-button" value="Modificar">
                    </div>
                </form>
            </div>
        </template>
    </TeacherMenu>

    <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
        <template v-slot:firstContent>
            <div class="writeMessage">
                <div>
                    <h3 class="title">Missatge a modificar:</h3>
                    <p>{{ message.description }}</p>
                </div>
                <form @submit.prevent="editMessage(message.id_message)">
                    <div class="container">
                        <h3 class="title">Nou missatge: </h3>
                        <textarea
                            v-model="editMessageForm.message"
                            type="message"
                            name="message"
                            id="message"
                            autocomplete="off"
                            required/>
                        <input type="submit" class="message-button" value="Modificar">
                    </div>
                </form>
            </div>
        </template>
    </StudentMenu>

    <AdminMenu v-else >
        <template v-slot:firstContent>
            <h2>No pots accedir a aquesta vista</h2>
        </template>
    </AdminMenu>
</template>

<script>

import { useAuthStore } from "@/store/auth";
import { computed, ref } from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import { useVideosStore } from "@/store/videos";
import {useRouter} from "vue-router";
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
        id: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const messagesStore = useMessagesStore();
        const authStore = useAuthStore();
        const videoStore = useVideosStore();
        const router = useRouter();
        const authUser = computed(() => {
            return authStore.authUser;
        });

        onBeforeMount(async () => await messagesStore.fetchMessageById(props.id));

        const message = computed(() => {
            return messagesStore.message;
        });

        const editMessageForm = ref({
            message: "",
        });

        async function editMessage(id_message) {
            await messagesStore.editMessage(editMessageForm.value, id_message);
            await videoStore.viewSelectedVideo(messagesStore.message.id_video);
            goToVideo(videoStore.video.id_user, videoStore.video.id_video);
        }

        function goToVideo(id_user, id_video){
            router.push({path: `/teacher/${id_user}/video/${id_video}`});
        }

        return {
            authStore,
            authUser,
            message,
            editMessage,
            editMessageForm
        };
    }

};

</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
    }
    .title{
        text-decoration: inherit;
        color: #05a5d4;
        margin-right: 10px;
    }
    textarea {
        color: #8a8a8a;
        height: 5vw;
        width: 40vw;
        padding: 15px 3%;
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
    }

    .message-button:hover {
        background-color: #fff;
        border: 1px solid #55b1df;
        color: #55b1df;
        cursor: pointer;
    }


    @media screen and (max-width: 1369px) {
        textarea {
            color: #8a8a8a;
            height: 70px;
            width: 65vw;
            padding: 15px 3%;
            border: 1px solid #ccc;
            border-radius: 27px;
            font-size: 100%;
            letter-spacing: .8px;
            margin-bottom: 20px;
        }
/*
        .message-button {
            margin-bottom: 22em;
        }

 */
    }

</style>