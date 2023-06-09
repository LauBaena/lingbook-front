<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1>Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
                    <h2>Selecciona una llengua disponible</h2>
                    <div class="languagesContainer">
                        <div v-if="authStore.teacherLanguage === ''">
                            <label class="languageRadio"
                                   v-for="language in languagesStore.languages"
                                   :key="language.id_language"
                            >
                                <input type="radio"
                                       :value="language.name"
                                       v-model="picked"
                                       @click="fixLanguage(language.name)"
                                />
                                <span class="languageName">{{ language.name }}</span>
                                <img class="languagePicSmall" :src="getImage(language.image)"
                                     :alt="`${language.name} flag`">
                            </label>
                        </div>
                        <div v-else>L'idioma triat és: <span class="primeraMajuscula">{{ authStore.teacherLanguage }}</span></div>
                    </div>
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
            <template v-slot:firstContent>
                <h2>Selecciona una llengua disponible</h2>
                <div class="languagesContainer">
                    <div class="language" v-for="language in languagesStore.languages" :key="language.id_language"
                         :language="language">
                        <img class="languagePic" :src="getImage(language.image)" :alt="`${language.name} flag`"
                            @click="goToLanguage(language.id_language)">
                        <p>{{ language.name }}</p>
                    </div>
                </div>
            </template>
        </StudentMenu>
        <AdminMenu v-else>
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
import {computed, ref} from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import {useRouter} from "vue-router";

export default {
    name: "SelectLanguageView",
    components: {
        StudentMenu,
        TeacherMenu,
        AdminMenu,
    },
    setup() {
        const languagesStore = useLanguagesStore();
        const authStore = useAuthStore();
        const router = useRouter();
        const picked = ref("");
        const authUser = computed(() => {
            return authStore.authUser;
        });

        onBeforeMount(async () => await languagesStore.fetchAllLanguages());
        onBeforeMount(async () => await authStore.getTeachersLanguage());
        
        function getImage(path) {
            return require(`../assets/${path}`)
        }

        const goToLanguage = (id) => {
            router.push({path: `/language/${id}`});
        };

        function fixLanguage(language) {
            console.log(language)
            authStore.modifyTeachersLanguage(language);
        }

        return {
            languagesStore,
            authStore,
            authUser,
            getImage,
            goToLanguage,
            picked,
            fixLanguage
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
    text-transform: capitalize;
}

.languagePic {
    width: 30%;
    margin-top: 30px;
    border-radius: 50%;
    border: #f4eeee 2px solid;
}

.languageName {
    margin: 15px;
}

.languageRadio {
    width: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    text-transform: capitalize;
}

.languagePicSmall {
    width: 5%;
    margin: 10px 10px 10px 10px;
    border-radius: 50%;
    border: #f4eeee 2px solid;
}

.primeraMajuscula {
    text-transform: capitalize;
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