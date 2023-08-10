<template>
    <div class="teacherCard">
        <img src="../assets/student2.jpg" class="cardImage" :alt="teacher.name">
        <div>
            <h3>{{ teacher.name }} {{ teacher.surname }}</h3>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            teacher:{
                type: Object,
                required: true,
            }
        },
        setup(){

            return{

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