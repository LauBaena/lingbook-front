<template>
    <div class="footerLinks">
        <a class="pull-left"><router-link :to="{ name: 'home' }">Inici</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'about' }">Sobre nosaltres</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'login' }">Entra</router-link></a>
        <a class="pull-left"><router-link :to="{ name: 'register' }">Registra't</router-link></a>
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
        width: 99%;
        display: flex;
        position: absolute;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #dcdada;
        padding: 1rem;
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
