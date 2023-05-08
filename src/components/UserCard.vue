<template>
    <div class="userCard">
        <img src="../assets/student1.jpg" class="cardImage" :alt="user.name">
        <div class="userInfo">
            <!-- <a @click="goToProfile(user.id_user)"><h3>{{ user.name }} {{ user.surname }}</h3></a> -->
            <h3>{{ user.name }} {{ user.surname }}</h3>
            <p>Data creació: {{ user.created_at }}</p>
            <p>Rol: {{ user.type }}</p>
            <div v-if=" user.status === '1'" class="button-delete" @click="modificaStatus()">Elimina perfil</div>
            <div v-if=" user.status === '0'" class="button-delete" @click="modificaStatus()">Restitueix perfil</div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    // import {useRouter} from "vue-router";
    import { useUsersStore } from "@/store/users";
    
    export default defineComponent({
        props: {
            user:{
                type: Object,
                required: true,
            }
        },
        setup(props){

            const usersStore = useUsersStore();

            function modificaStatus() {
                usersStore.flipStatus(props.user.id_user);
            }
            // const router = useRouter();

            // const goToProfile = (id) => {
            //     router.push({path: `/profile/${id}`});
            // };
            return{
                usersStore,
                modificaStatus,

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
        margin-bottom: 20px;
        background-color: #d9d9d9;
        border-radius: 10px;
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
    .button-delete {
        width: min-content;
        min-width: 60%;
        font-weight: bold;
        margin-bottom: 10px;
        cursor: default;
        background-color: #55b1df;
        max-width: 20%; 
        color: white;
        padding: 13px 1%;
        border: 1px solid #ccc;
        border-radius: 15px;
        text-align: center;
        letter-spacing: .8px;
    }
    .button-delete:hover {
        cursor: pointer  !important;;
        background-color: #fff;
        border: 1px solid #55b1df;
        color: #55b1df;
        cursor: pointer;
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