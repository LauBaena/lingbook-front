<template>
  <div>
    <div class="header">
      <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
      <h1 class="profilePrivate">Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
    </div>
    <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'" >
      <template v-slot:firstContent>
        <h2>Les meves properes classes</h2>
        <p>Espai en construcció</p>
      </template>
      <template v-slot:secondContent>
        <h2>Els meus darrers vídeos que han rebut comentaris</h2>
        <p>Espai en construcció</p>
      </template>
    </TeacherMenu>
    <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'" >
      <template v-slot:firstContent>
        <h2>Les meves properes classes</h2>
        <p>Espai en construcció</p>
      </template>
      <template v-slot:secondContent>
        <h2>Els darrers vídeos on he comentat</h2>
        <p>Espai en construcció</p>
      </template>
    </StudentMenu>
    <AdminMenu v-else >
      <template v-slot:firstContent>
        <h2>Darrers vídeos publicats a la plataforma</h2>
        <div class="videosContainer">
          <div class="videoCard" v-for="video in videosStore.videos.slice(-6)" :key="video.id_video" :video="video">
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
        <h2>Darrers vídeos que han rebut missatges</h2>
        <p>Espai en construcció</p>
      </template>
    </AdminMenu>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import {useVideosStore} from "@/store/videos";
import {onBeforeMount} from "@vue/runtime-core";
import {useRouter} from "vue-router";

export default {
  name: "ProfileView",
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
    const authStore = useAuthStore();
    const videosStore = useVideosStore();
    const authUser = computed(() => {
        return authStore.authUser;
    });

    onBeforeMount(async () => {
        // Agafem tots els vídeos. Enviem "1" per l'statusControl (que el video estigui publicat)
      await videosStore.fetchAllVideos("0");
      console.log("videostore",videosStore)
    });

    const goToVideoView = (id_video) => {
      
         router.push({path: `/teacher/${props.id}/video/${id_video}`});
        };

    return {
      authStore,
      videosStore,
      authUser,
      goToVideoView,
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
  .videosContainer {
      display: flex;
      flex-flow: wrap;
      padding: 20px;
  }
  .videoCard{
      margin-left: 20px;
      margin-bottom: 40px;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      width: 30%; 
  
  }
  .playerContainer{
      width: 100%;    
  }
  
  .clicable {
      font-weight: bold;
      margin-top: 10px;
      cursor: default;
   }
  .clicable:hover {
      cursor: pointer  !important;;
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


  }

</style>
