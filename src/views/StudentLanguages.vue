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
                <h2>Les meves llengües</h2>
                <div class="languagesContainer">
                    <div class="language" v-for="language in languages" :key="language.id_language"
                         :language="language">
                        <img class="languagePic" :src="getImage(language.image)" :alt="`${language.name} flag`"
                            @click="goToLanguage(language.id_language)">
                        <p>{{ language.name }}</p>
                    </div>
                </div>
            </template>
            <template v-slot:secondContent>

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
import {useAuthStore} from "@/store/auth";
import {useLanguagesStore} from "@/store/languages";
import {onBeforeMount} from "@vue/runtime-core";
import {computed} from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import {useRouter} from "vue-router";

export default {
  name: "TeacherView",
  components: {
    StudentMenu,
    TeacherMenu,
    AdminMenu,
  },
  setup() {
    const languagesStore = useLanguagesStore();
    const authStore = useAuthStore();
    const router = useRouter();

    onBeforeMount(async () => await languagesStore.fetchStudentLanguages(authStore.authUser.id_user));

    const authUser = computed(() => {
        return authStore.authUser;
    });

    const languages = computed(() => {
        return languagesStore.studentLanguages;
    });


    function getImage(path) {
        //console.log(`../assets/${path}`)
        return require(`../assets/${path}`)
    }

    const goToLanguage = (language_id) => {
        router.push({path: `/language/${language_id}`});
    };

    return {
        languagesStore,
        authStore,
        authUser,
        getImage,
        goToLanguage,
        languages,
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

.languagesContainer {
    display: flex;
    flex-flow: wrap;
}

.language {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.languagePic {
    width: 30%;
    margin-top: 30px;
    border-radius: 50%;
    border: #f4eeee 2px solid;
}

@media screen and (max-width: 1369px) {

    .studentPic {
        width: 30%;
        margin: 40px;
        border-radius: 50%;
        border: #d9d9d9 6px solid;
    }

    .languagePic {
        width: 70%;
        margin-top: 30px;
        border-radius: 50%;
        border: #f4eeee 2px solid;
    }

}

</style>