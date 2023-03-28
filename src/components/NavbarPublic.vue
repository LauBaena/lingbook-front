<template>
    <div class="header">
        <div>
            <img class="logo" src="@/assets/logoNegre.png" @click="handleRedirectSelector" />
        </div>
        <div class="links">
            <a class="pull-left"><router-link :to="{ name: 'about' }">About</router-link></a>
            <a class="pull-left"><router-link :to="{ name: 'login' }">Login</router-link></a>
            <a class="pull-left"><router-link :to="{ name: 'about' }">Català</router-link></a>
        </div>
    </div>

</template>

<script>
    import { defineComponent } from "vue";
    import { useRouter } from "vue-router";
    export default defineComponent({
        name: "publicNavbar",
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
    .header {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .logo{
        cursor: pointer; 
        /* width: 350px; */
        width: 35%;
        margin: 40px;
    }
    a {
        font-size: 24px !important ;
        color:#58bff6;
        text-decoration: none;
        padding-right:40px;
        /* margin-left: 30px; */
    }
    a:hover{
        Color:#aaa; 
    }

    .links {
        display: flex;
        align-items: center;
        margin: 40px;
        padding: 0;
    }
    
    .links a {
        margin-right: 20px;
        font-size: 18px;
    }

</style>
