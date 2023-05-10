<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1>Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
              <h2>Els meus missatges</h2>
              <div v-if="messages.length!=0" class="messagesContainer">
                <MessageCard class="message" v-for="message in messages" :key="message.id_message" :message="message" @deleteMessage="deleteMessage"/>
              </div>    
              <div v-else><p>No has escrit cap missatge</p></div>  
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'" >
            <template v-slot:firstContent>
              <h2>Els meus missatges</h2>
              <div v-if="messages.length!=0" class="messagesContainer">
                <MessageCard class="message" v-for="message in messages" :key="message.id_message" :message="message" @deleteMessage="deleteMessage"/>
              </div>  
              <div v-else><p>No has escrit cap missatge</p></div>            
            </template>
        </StudentMenu>
        <AdminMenu v-else >
            <template v-slot:firstContent>
            <h2>No pots accedir a aquesta vista</h2>
            </template>
        </AdminMenu>
    </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useMessagesStore } from "@/store/messages";
import { computed } from "vue";
import {onBeforeMount} from "@vue/runtime-core";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import MessageCard from '../components/MessageCard.vue';

export default {
  name: "MessagesView",
  components: {
    StudentMenu,
    TeacherMenu,
    AdminMenu,
    MessageCard
  },
  props: {
        id: {
            type: String,
            required: true,
        },
  },
  setup() {
    const authStore = useAuthStore();
    const messagesStore = useMessagesStore();
    const authUser = computed(() => {
      return authStore.authUser;
    });

    onBeforeMount(async () => await messagesStore.fetchUserMessages(authStore.authUser.id_user));

    const messages = computed(() => {
      return messagesStore.messages;
    });

    async function deleteMessage(message_id) {
      await messagesStore.deleteMessage(message_id);
      await messagesStore.fetchUserMessages(authStore.authUser.id_user);
    }

    return {
      authStore,
      messagesStore,
      authUser,
      messages,
      deleteMessage,
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
    .header{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

  .messagesContainer{
    display:flex;
    flex-direction: column;
  }

  .message{
    
    cursor:pointer;
  }
</style>