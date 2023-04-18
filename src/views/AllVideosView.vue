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
            <!-- <vue-plyr>
                <div data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY"></div>
            </vue-plyr> -->
            <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/8Eu3jmEUlzc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
            <div class="videosContainer">
                <VideoCard class="video" v-for="video in videosStore.videos" :key="video.id_video" :video="video"/>
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
  import VideoCard from '../components/VideoCard.vue';
  import StudentMenu from "@/components/StudentMenu.vue";
  import TeacherMenu from "@/components/TeacherMenu.vue";
  import AdminMenu from "@/components/AdminMenu.vue";
  
  export default {
    name: "AllVideosView",
    components: {
        VideoCard,
        StudentMenu,
        TeacherMenu,
        AdminMenu,
    },
    setup() {
        const videosStore = useVideosStore();
        const authStore = useAuthStore();
        onBeforeMount(async () => await videosStore.fetchAllVideos());
    
        const authUser = computed(() => {
            return authStore.authUser;
        });
    
        return {
            videosStore,
            authStore,
            authUser,
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
  
    .videosContainer{
      display:flex;
      flex-flow: wrap;
      padding: 20px;
    }
  
    .video{
      width: 30%;
    }

    @media screen and (max-width: 1369px) {

        .header{
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

        .video{
            width: 100%;
        }
    }

  </style>