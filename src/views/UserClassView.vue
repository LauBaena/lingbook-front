<template>
    <div>
        <div class="header">
            <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
            <h1 class="profilePrivate">Espai personal de {{ authStore.authUserCompleteName }}
                ({{ authStore.authUser.type }})</h1>
        </div>
        <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
            <template v-slot:firstContent>
                <h2>Les meves classes</h2>
                <h3>Les meves properes classes</h3>
                <table class="tableRooms">
                    <tr>
                        <th>Nom</th>
                        <th>Descripció</th>
                        <th>Capacitat</th>
                        <th>Data</th>
                        <th>Esborrar</th>
                    </tr>
                    <tr v-for="classe in classes" :key="classe.id_room" :classe="classe">
                        <td>{{ classe.name }}</td>
                        <td>{{ classe.description }}</td>
                        <td>{{ classe.capacity }}</td>
                        <td>{{ classe.DATA }}</td>
                        <td><p class="deleteRoom" @click="deleteClassroom(classe.id_room)">Esborrar</p></td>
                    </tr>
                </table>
                <h3>Afegeix una nova classe</h3>
                <form @submit.prevent="addRoom()">
                    <div class="container">
                        <p>Capacitat</p>
                        <input
                                v-model="addRoomForm.capacity"
                                type="text"
                                name="capacity"
                                id="capacity"
                                class="form-style"
                                autocomplete="off"
                                required/>
                        <p>&nbsp;Descripció: </p>
                        <input
                                v-model="addRoomForm.description"
                                type="text"
                                name="description"
                                id="description"
                                class="form-style"
                                autocomplete="off"
                                required/>
                        <p>Data</p>
                        <input
                                v-model="addRoomForm.data"
                                type="datetime-local"
                                name="data"
                                id="data"
                                class="form-style"
                                autocomplete="off"
                                required/>
                        <input type="submit" value="Afegir">
                    </div>
                </form>
            </template>
        </TeacherMenu>
        <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
            <template v-slot:firstContent>
                <h2>Les meves classes</h2>
                <h3>Les meves properes classes</h3>
                <table class="tableRooms">
                    <tr>
                        <th>Nom</th>
                        <th>Descripció</th>
                        <th>Capacitat</th>
                        <th>Data</th>
                        <th>Anul·lar reserva</th>
                    </tr>
                    <tr v-for="classe in classesStudent" :key="classe.id_room" :classe="classe">
                        <td>{{ classe.name }}</td>
                        <td>{{ classe.description }}</td>
                        <td>{{ classe.capacity }}</td>
                        <td>{{ classe.DATA }}</td>
                        <td><p class="deleteRoom" @click="cancelClassroom(classe.id_room)">Anul·lar reserva</p></td>
                    </tr>
                </table>

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
import {useClassesStore} from "@/store/classes";
import {onBeforeMount} from "@vue/runtime-core";
import {computed, ref} from "vue";
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
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup() {
        const classesStore = useClassesStore();
        const authStore = useAuthStore();
        const addRoomForm = ref(
            {
                capacity: "",
                description: "",
                DATA: "",
                id_user: authStore.authUser.id_user,
            });

        async function addRoom() {
            await classesStore.addClass(addRoomForm.value)
            await classesStore.fetchTeacherClasses(authStore.authUser.id_user)
        }

        async function deleteClassroom(id_room){
            await classesStore.deleteClass(id_room, authStore.authUser.id_user)
            await classesStore.fetchTeacherClasses(authStore.authUser.id_user)
        }

        async function cancelClassroom(id_room){
            await classesStore.cancelClass(id_room, authStore.authUser.id_user)
            await classesStore.fetchAlumnsClasses(authStore.authUser.id_user)
        }

        onBeforeMount(async () => await classesStore.fetchTeacherClasses(authStore.authUser.id_user));
        onBeforeMount(async () => await classesStore.fetchAlumnsClasses(authStore.authUser.id_user));

        const classes = computed(() => {
            return classesStore.classes;
        });

        const classesStudent = computed(() => {
            return classesStore.classesStudent;
        });

        const authUser = computed(() => {
            return authStore.authUser;
        });

        return {
            classesStore,
            authStore,
            authUser,
            classes,
            addRoom,
            addRoomForm,
            deleteClassroom,
            classesStudent,
            cancelClassroom
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

.tableRooms {
    border: 2px solid;
    border-collapse: collapse;
    text-align: center;
}

td, th {
    border: 1px solid;
    padding: 1em;
}

.deleteRoom {
    color: #05a5d4;
    cursor: pointer;
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

}

</style>