<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1>Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
            <h2>No pots accedir a aquesta vista</h2>
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'" >
            <template v-slot:firstContent>
              <div class="languageTitle">
                <h2>{{ languagesStore.language.name }}</h2>
                <div class="followSection">
                  <div v-if="!languagesStore.imFollowing">
                  <!-- <div v-if="!isFollowing"> -->
                    <button class="followButton" @click="followOrUnfollow()" :disabled="!isFinished">
                      Seguir
                    </button>
                  </div>
                  <div v-else>
                    <button class="followButton" @click="followOrUnfollow()" :disabled="!isFinished">
                      Deixar de seguir
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:secondContent>
                <h4>Llistat de professors</h4>
                <div class="teachersContainer">
                  <TeacherCard class="teacher" v-for="teacher in teachers" :key="teacher.id_user" :teacher="teacher" @click="goToTeacherView(teacher.id_user)"/>
                </div>
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
import { useLanguagesStore } from "@/store/languages";
import { useUsersStore } from "@/store/users";
import { computed } from "vue";
import { onBeforeMount, ref } from "@vue/runtime-core";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import TeacherCard from '../components/TeacherCard.vue';
import {useRouter} from "vue-router";

export default {
  name: "LanguageView",
  components: {
    StudentMenu,
    TeacherMenu,
    AdminMenu,
    TeacherCard,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const languagesStore = useLanguagesStore();
    const authStore = useAuthStore();
    const usersStore = useUsersStore();
    const authUser = computed(() => {
        return authStore.authUser;
    });

    onBeforeMount(async () => await languagesStore.fetchLanguage(props.id));
    onBeforeMount(async () => await usersStore.fetchTeachersByLanguage(props.id));
    onBeforeMount(async () => await languagesStore.fetchStudentLanguages(authStore.authUser.id_user));
    onBeforeMount(async () => await languagesStore.amIFollowing(props.id));

    // Filtrem si el professor ha estat eliminat
    const teachers = computed(() => {
        return usersStore.teachersByLanguage;
    });

    const goToTeacherView = (id) => {
            router.push({path: `/teacher/${id}`});
    };

    //FOLLOW AND UNFOLLOW
    // let isFollowing = ref(false);
    let isFinished = ref(true);

    function delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    const followOrUnfollow = async () => {
      isFinished.value = false;
      // isFollowing.value = await languagesStore.amIFollowing(props.id, authStore.authUser.id_user);
      await languagesStore.followOrUnfollowLanguage(props.id, authStore.authUser.id_user);
      // isFollowing.value = !isFollowing.value;
      // console.log(isFollowing.value)
      delay(1000).then(() => (isFinished.value = true));
    };

    return {
      languagesStore,
      authStore,
      authUser,
      teachers,
      goToTeacherView,
      followOrUnfollow,
      // isFollowing,
      isFinished,
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
  .languageTitle{
    display:flex;
    flex-direction: row;
    align-items: center;
  }
  .followSection{
    align-content: center;
    margin-left: 50px;
    margin-top: -30px;
  }
  .teachersContainer{
    display:flex;
    flex-flow: row wrap;
  }
  .teacher{
    width: 30%;
    cursor:pointer;
  }
  .followButton{
    margin-top: 35px;
    float:right;
    width: 112px;
    height: 40px;
    border-radius: 20px;
    background-color: #55b1df;
    border:none;
    color: #fff;
    font-weight: bold;
  }
  .followButton:hover{
    background-color: #fff; 
    border:1px solid #55b1df; 
    color:#55b1df; 
    cursor:pointer;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
</style>