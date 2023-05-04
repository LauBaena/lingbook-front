<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1 class="profilePrivate">Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
                <h2>Les meves classes</h2>
                <h3>Les meves properes classes</h3>
                <div v-for="classe in classesStore.classes" :key="classe.id_room"></div>
                <div>{{ classesStore.classes.id_room }}</div>
                <h3>Afegeix una nova classe</h3>
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'" >
            <template v-slot:firstContent>
                <h2>No pots accedir a aquesta vista</h2>
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
import { useClassesStore } from "@/store/classes";
import {onBeforeMount} from "@vue/runtime-core";
import { computed } from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";


export default {

    name: "UserClassView",

    components: {
        StudentMenu,
        TeacherMenu,
        AdminMenu,
    },
    setup() {
        const classesStore = useClassesStore();
        const authStore = useAuthStore();

        onBeforeMount(async  () => await classesStore.fetchUserClasses(authStore.authUser.id_user));

        const authUser = computed(() => {
            return authStore.authUser;
        });

        return {
            classesStore,
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

input{
    margin-left: 5px;
    color:#8a8a8a;
    height: 20px;
    padding: 3px 1%;
    border:1px solid #ccc;
    border-radius: 27px;
    font-size: 100%;
    letter-spacing: .8px;
}
input:focus{
    outline: none;
    border:1px solid #58bff6;
    color:#58bff6;
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

}

</style>