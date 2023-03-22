<template>
    <div class="footerLinks">
        <a class="pull-left"><router-link :to="{ name: 'home' }">Home</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'about' }">About</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'login' }">Login</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'register' }">Register</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'termsOfUse' }">Termes d'ús</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'legalWarning' }">Avís legal</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'privacyPolicy' }">Política de privacitat</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'cookiesPolicy' }">Política de cookies</router-link></a>
    </div>
</template>

<script>
    import { defineComponent } from "vue";
    import { useRouter } from "vue-router";
    export default defineComponent({
        name: "publicFooter",
        setup() {
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

<style scoped>
    .footerLinks {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #dcdada;
        padding: 1rem;
        width: 100%;
        height: 100px;
        margin-left: -10px;
        margin-bottom: -10px;
    }
    a{
        color:#58bff6;
        text-decoration: none;
        margin-right: 20px;
    }
    a:hover{
        Color:#aaa; 
    }
</style>
