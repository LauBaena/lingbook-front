<template>
    <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
        <template>
            <div>Aquí aniran les meves properes clases</div>
        </template>
    </TeacherMenu>
    <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'">
        <template>
            <div>Aquí aniran les meves properes classes</div>
        </template>
    </StudentMenu>
    <AdminMenu v-else>
        <template v-slot:firstContent>
            <h2>No pots accedir a aquesta vista</h2>
        </template>
    </AdminMenu>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import {computed} from "vue";

export default {
    name: "SelectLanguageView",
    components: {
        StudentMenu,
        TeacherMenu,
        AdminMenu,
    },
    setup() {
        const authStore = useAuthStore();

        const authUser = computed(() => {
            return authStore.authUser;
        });

        return {
            authStore,
            authUser,
        }
    },
}
</script>