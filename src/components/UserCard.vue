<template>
    <div class="userCard">
        <img src="../assets/student1.jpg" class="cardImage" :alt="user.name">
        <div class="userInfo">
            <!-- <a @click="goToProfile(user.id_user)"><h3>{{ user.name }} {{ user.surname }}</h3></a> -->
            <h3>{{ user.name }} {{ user.surname }}</h3>
            <p>Data creació: {{ user.created_at }}</p>
            <p>Rol: {{ user.type }}</p>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    // import {useRouter} from "vue-router";

    export default defineComponent({
        props: {
            user:{
                type: Object,
                required: true,
            }
        },
        setup(){
            // const router = useRouter();

            // const goToProfile = (id) => {
            //     router.push({path: `/profile/${id}`});
            // };
            return{
                // goToProfile
            }
        }
    })
</script>

<style scoped>
    .userCard{
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .cardImage{
        width: 100px;
        margin: 40px;
        border-radius: 50%;
        border: #d9d9d9 6px solid;
    }

    h3{
        text-decoration: inherit;
        color: #05a5d4;
        margin-bottom: 10px;
    }
    /* a{
        text-decoration: inherit;
        color: #05a5d4;
        margin-bottom: 10px;
    }

    a:hover{
        text-decoration: inherit;
        color: inherit;
        cursor: pointer;
    } */

    @media screen and (max-width: 1369px) {

        .userCard{
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .cardImage{
            width: 100px;
            border-radius: 50%;
            border: #d9d9d9 6px solid;
        }

    }
</style>