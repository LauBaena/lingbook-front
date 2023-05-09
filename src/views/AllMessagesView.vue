<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1 class="profilePrivate">Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
            <h2>No pots accedir a aquesta vista</h2>
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'" >
            <template v-slot:firstContent>
            <h2>No pots accedir a aquesta vista</h2>
            </template>
        </StudentMenu>
        <AdminMenu v-else >
            <template v-slot:firstContent>
                <h2>Tots els missatges</h2>
                <div>
                    <div v-for="message in messages" :key="message.id_message" :message="message">
                        <div class="messageCard">
                            <div class="titleContainer">
                                <h3 class="title"> {{ message.name }} {{ message.surname }}</h3>
                                <p>{{ message.created_at }}</p>
                            </div>
                            <p> {{ message.description }} </p>
                            <div class="buttons">
                                <p class="buttons-link" @click="goToVideoView(message.id_video)">Ves al vídeo</p> 
                                <p class="buttons-link" @click="deleteMessage(message.id_message)">Esborrar</p>
                            </div>                        
                        </div>
                        <div class="line"></div>
                    </div> 

                    <!-- <div v-for="message in messages" :key="message.id_message" :message="message">
                        <div class="messageCard">
                            <h3 class="title">{{ message.name }} {{ message.surname }}</h3>
                            <h4> {{ message.description }} </h4>
                            <p>{{ message.created_at }}</p>
                            <div class="buttons">
                                <p class="buttons-link" @click="goToVideoView(message.id_video)">Ves al vídeo</p> 
                                <p class="buttons-link" @click="deleteMessage(message.id_message)">Esborrar</p>
                            </div>
                        </div>
                        <div class="line"></div>
                    </div>  -->
                </div>
            </template>
        </AdminMenu>
    </div>
</template>
  
<script>
    import { useAuthStore } from "@/store/auth";
    import { useMessagesStore } from "@/store/messages";
    import { useVideosStore } from "@/store/videos";
    import { onBeforeMount } from "@vue/runtime-core";
    import { computed } from "vue";
    import StudentMenu from "@/components/StudentMenu.vue";
    import TeacherMenu from "@/components/TeacherMenu.vue";
    import AdminMenu from "@/components/AdminMenu.vue";
    import {useRouter} from "vue-router";

    export default {
        name: "AllMessagesView",
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
        setup() {
            const router = useRouter();
            const messagesStore = useMessagesStore();
            const authStore = useAuthStore();
            const videoStore = useVideosStore();
            const inactiveStatus = "0";
            const activeStatus = "1";

            onBeforeMount(async () => await messagesStore.fetchAllMessages(activeStatus));
        
            const authUser = computed(() => {
                return authStore.authUser;
            });

            async function goToVideoView(id_video){
                await videoStore.viewSelectedVideo(id_video);
                router.push({path: `/teacher/${videoStore.video.id_user}/video/${id_video}`});
            }

            const messages = computed(() => {
                return messagesStore.messages;
            });

            async function deleteMessage(message_id) {
                await messagesStore.deleteOrRecoverMessage(message_id, inactiveStatus);
                await messagesStore.fetchAllMessages(activeStatus);
            }

            return {
                messagesStore,
                authStore,
                authUser,
                goToVideoView,
                messages,
                deleteMessage
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
.messageCard{
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 10px 20px 10px 20px;
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
.buttons{
    display: flex;
    flex-direction: row; 
    align-items: center; 
}
.buttons-link{
    text-decoration: inherit;
    color: #05a5d4;
    margin-bottom: 15px;
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

}
</style>