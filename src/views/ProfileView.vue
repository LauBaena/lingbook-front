<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1 class="profilePrivate">Espai personal de {{ authStore.authUserCompleteName }}
                ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
                <h2>Les meves properes classes</h2>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Descripció</th>
                        <th>Capacitat</th>
                        <th>Data</th>
                    </tr>
                    <tr v-for="classe in classes" :key="classe.id_room" :classe="classe">
                        <td>{{ classe.name }}</td>
                        <td>{{ classe.description }}</td>
                        <td>{{ classe.capacity }}</td>
                        <td>{{ classe.DATA }}</td>
                    </tr>
                </table>
            </template>
            <template v-slot:secondContent>
                <h2>Els meus darrers vídeos que han rebut comentaris</h2>
                <p>Espai en construcció</p>
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
            <template v-slot:firstContent>
                <h2>Les meves properes classes</h2>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Descripció</th>
                        <th>Capacitat</th>
                        <th>Data</th>
                    </tr>
                    <tr v-for="classe in classes" :key="classe.id_room" :classe="classe">
                        <td>{{ classe.name }}</td>
                        <td>{{ classe.description }}</td>
                        <td>{{ classe.capacity }}</td>
                        <td>{{ classe.DATA }}</td>
                    </tr>
                </table>
            </template>
            <template v-slot:secondContent>
                <h2>Els darrers vídeos on he comentat</h2>
                <p>Espai en construcció</p>
            </template>
        </StudentMenu>
        <AdminMenu v-else>
            <template v-slot:firstContent>
                <h2>Darrers vídeos publicats a la plataforma</h2>
                <p>Espai en construcció</p>
            </template>
            <template v-slot:secondContent>
                <h2>Darrers vídeos que han rebut missatges</h2>
                <p>Espai en construcció</p>
            </template>
        </AdminMenu>
    </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import { useClassesStore } from "@/store/classes";
import {computed} from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import {onBeforeMount} from "@vue/runtime-core";

export default {
    name: "ProfileView",
    components: {
        StudentMenu,
        TeacherMenu,
        AdminMenu,
    },
    setup() {
        const classesStore = useClassesStore();
        const authStore = useAuthStore();

        onBeforeMount(async () => await classesStore.fetchTeacherClasses(authStore.authUser.id_user));
        onBeforeMount(async  () => await classesStore.fetchAlumnsClasses(authStore.authUser.id_user));

        const classes = computed(() => {
            return classesStore.classes;
        });

        const authUser = computed(() => {
            return authStore.authUser;
        });

        return {
            classesStore,
            authStore,
            authUser,
            classes,
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
