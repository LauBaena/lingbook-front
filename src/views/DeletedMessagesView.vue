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
                <h2>Tots els missatges eliminats</h2>
                <div v-if="messages.length!=0">
                    <div v-for="message in messages" :key="message.id_message" :message="message">
                        <div class="messageCard">
                            <div class="titleContainer">
                                <h3 class="title"> {{ message.name }} {{ message.surname }}</h3>
                                <p>{{ message.created_at }}</p>
                            </div>
                            <p> {{ message.description }} </p>
                            <div class="buttons">
                                <p class="buttons-link" @click="goToVideoView(message.id_video)">Ves al vídeo</p> 
                                <p class="buttons-link" @click="recoverMessage(message.id_message)">Recuperar</p>
                            </div>
                        </div>
                        <div class="line"></div>
                    </div> 
                </div>
                <div v-else><p>No has eliminat cap missatge</p></div> 
            </template>
        </AdminMenu>
    </div>
</template>
  
<script>
    import { useAuthStore } from "@/store/auth";
    import { useMessagesStore } from "@/store/messages";
    import { onBeforeMount } from "@vue/runtime-core";
    import { computed } from "vue";
    import StudentMenu from "@/components/StudentMenu.vue";
    import TeacherMenu from "@/components/TeacherMenu.vue";
    import AdminMenu from "@/components/AdminMenu.vue";

    import {useRouter} from "vue-router";

    export default {
        name: "DeletedMessagesView",
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
            const messagesStore = useMessagesStore();
            const authStore = useAuthStore();
            const inactiveStatus = "0";
            const activeStatus = "1";

            onBeforeMount(async () => await messagesStore.fetchAllMessages(inactiveStatus));
        
            const authUser = computed(() => {
                return authStore.authUser;
            });

            const goToVideoView = (id_video) => {
                router.push({path: `/teacher/${props.id}/video/${id_video}`});
            };

            const messages = computed(() => {
                return messagesStore.messages;
            });

            async function recoverMessage(message_id) {
                await messagesStore.deleteOrRecoverMessage(message_id, activeStatus);
                await messagesStore.fetchAllMessages(inactiveStatus);
            }

            return {
                messagesStore,
                authStore,
                authUser,
                goToVideoView,
                messages,
                recoverMessage
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