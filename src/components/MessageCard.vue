<template>
    <div class="messageCard">
        <div class="messageCard">
            <div class="titleContainer">
                <h3 class="title">{{ message.username }}</h3>
                <p>{{ message.created_at }}</p>
            </div>
            <p> {{ message.description }} </p>
            <div class="buttons">
                <p class="buttons-link" @click="goToVideoView(message.id_video)">Ves al vídeo</p> 
                <p class="buttons-link" @click="emitDeleteMessage(message.id_message)">Esborrar</p>
            </div>
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import { useAuthStore } from "@/store/auth";
    import {useMessagesStore} from "@/store/messages";
    import { useVideosStore } from "@/store/videos";
    import {useRouter} from "vue-router";

    export default defineComponent({
        props: {
            message:{
                type: Object,
                required: true,
            }
        },
        setup(props, context){
            const messagesStore = useMessagesStore();
            const authStore = useAuthStore();
            const router = useRouter();
            const videoStore = useVideosStore();

            async function goToVideoView(id_video){
                await videoStore.viewSelectedVideo(id_video);
                router.push({path: `/teacher/${videoStore.video.id_user}/video/${id_video}`});
            }

            const emitDeleteMessage = (message_id) => {
                context.emit("deleteMessage", message_id)
            }

            return{
                emitDeleteMessage,
                messagesStore,
                authStore,
                goToVideoView
            }
        }
    })
</script>

<style scoped>

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
    .line {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 250px;
        height: 1px;
        background-color: rgb(234, 230, 230);
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
  
    @media screen and (max-width: 1369px) {

    }
</style>