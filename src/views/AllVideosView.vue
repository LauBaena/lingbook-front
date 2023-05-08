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
            <h2>Tots els vídeos</h2>
            <div class="videosContainer">
                <div class="videoCard" v-for="video in videosStore.videos" :key="video.id_video" :video="video">
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
        </AdminMenu>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "@/store/auth";
  import { useVideosStore } from "@/store/videos";
  import { onBeforeMount } from "@vue/runtime-core";
  import { computed } from "vue";
//   import VideoCard from '../components/VideoCard.vue';
  import StudentMenu from "@/components/StudentMenu.vue";
  import TeacherMenu from "@/components/TeacherMenu.vue";
  import AdminMenu from "@/components/AdminMenu.vue";

  import {useRouter} from "vue-router";

  export default {
    name: "AllVideosView",
    components: {
        // VideoCard,
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
        const authStore = useAuthStore();
        onBeforeMount(async () => await videosStore.fetchAllVideos("0"));
    
        const authUser = computed(() => {
            return authStore.authUser;
        });
        const goToVideoView = (id_video) => {
         router.push({path: `/teacher/${props.id}/video/${id_video}`});
        };
        return {
            videosStore,
            authStore,
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
  
      .videoCard{
          margin-left: 20px;
          margin-bottom: 40px;
          display: flex;
          flex-flow: row wrap;
          /* align-items: center;
          width: 100%;  */
      }
  }
  
  </style>