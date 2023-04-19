<template>
        <div class="header">
            <div>
                <img class="logo" src="@/assets/logoNegre.png" @click="handleRedirectSelector"/>
            </div>
            <div class="links">
                <a class="pull-left">
                    <router-link :to="{ name: 'about' }">Sobre nosaltres</router-link>
                </a>
                <a class="pull-left">
                    <router-link :to="{ name: 'login' }">Entra</router-link>
                </a>
            </div>
        </div>

</template>

<script>
import {onMounted, defineComponent} from "vue";
import {updateBreakpoints} from "vue3-mq";
import {useRouter} from "vue-router";

export default defineComponent({
    name: "publicNavbar",

    data () {
      return {
      }
    },

    setup() {
        onMounted(() => {
            updateBreakpoints({
                preset: "bootstrap5"
            })
        })

        const router = useRouter();

        const handleRedirectSelector = () => {
            return router.push("/");
        };
        return {
            handleRedirectSelector,
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
    justify-content: space-between;
    align-items: center;
}

.logo {
    cursor: pointer;
    /* width: 350px; */
    width: 35%;
    margin: 40px;
}

a {
    font-size: 24px !important;
    color: #58bff6;
    text-decoration: none;
    padding-right: 10px;
    /* margin-left: 30px; */
}

a:hover {
    Color: #aaa;
}

.links {
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 0;
}

.links a {
    margin-right: 10px;
    font-size: 18px;
}

/*
Media queries
 */
@media screen and (max-width: 1199px) {

    .logo {
        cursor: pointer;
        width: 100%;
        margin: 40px;
    }

    .links {
        display: flex;
        align-items: center;
        margin: 40px;
        padding-left: 80px;
    }

}


</style>
