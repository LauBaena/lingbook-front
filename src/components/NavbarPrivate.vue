<template>
        <div class="header">
            <div>
                <img class="logo" src="@/assets/logoNegre.png" @click="handleRedirectSelector"/>
            </div>
            <div class="links">
                <a class="pull-left">
                    <img class="icon" src="@/assets/logout_icon.png" @click="logout"/>
                </a>
                <a class="pull-left">
                    <router-link :to="{ path: `/profile/${authStore.authUser.id_user}` }"><img class="icon" src="@/assets/user_icon.png"/></router-link>
                </a>
            </div>
        </div>

</template>

<script>
import {onMounted, defineComponent} from "vue";
import {updateBreakpoints} from "vue3-mq";
import {useRouter} from "vue-router";
import { useAuthStore } from "@/store/auth";
    
export default defineComponent({
    name: "publicNavbar",

    data () {
      return {

      }
    },

    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        onMounted(() => {
            updateBreakpoints({
                preset: "bootstrap5"
            })
        })

        const handleRedirectSelector = () => {
            return router.push("/");
        };

        const logout = () => {
            authStore.handleLogout();
        }

        return {
            handleRedirectSelector,
            logout,
            authStore,
        };

    }
})
</script>


<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    /*align-items: center;*/
}

.logo {
    cursor: pointer;
    /* width: 350px; */
    width: 35%;
    margin: 40px;
}

.icon {
    cursor: pointer;
    width: 15%;
    margin: 45px;
}

a {
    font-size: 24px !important;
    color: #58bff6;
    text-decoration: none;
    padding-right: 40px;
    /* margin-left: 30px; */
}

.links {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px;
    padding: 0;
}

.links a {
    margin-left: 20px;
 /*   font-size: 18px;*/
}

@media screen and (max-width: 1369px) {

    .logo {
        cursor: pointer;
        /* width: 350px; */
        width: 100%;
        margin: 40px;
    }

    .icon {
        cursor: pointer;
        width: 30%;
    }

}

</style>
