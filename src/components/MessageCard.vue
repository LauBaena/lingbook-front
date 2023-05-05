<template>
    <div class="messageCard">
        <div>
            <!-- <a @click="goToProfile(user.id_user)"><h3>{{ user.name }} {{ user.surname }}</h3></a> -->
            <h3>Data creació: {{ message.created_at }}</h3>
            <p> {{ message.description }} </p>
            <p>Anar al vídeo</p>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    // import {useRouter} from "vue-router";

    export default defineComponent({
        props: {
            message:{
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
    .teacherCard{
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

    @media screen and (max-width: 1369px) {

        .teacherCard{
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