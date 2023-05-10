<template>
    <div class="content">
        <div class="sideMenu">    
            <h3>Espai personal</h3>
            <ul>
                <li><a><router-link :to="{ name: 'userClasses' }">Les meves classes</router-link></a></li>
                <li><a><router-link :to="{ name: 'teacherView' }">Els meus vídeos</router-link></a></li>
                <li><a><router-link :to="{ name: 'userMessages' }">Els meus missatges</router-link></a></li>
                <li><a><router-link :to="{ name: 'allLanguages' }">Idioma que ensenyo</router-link></a></li>
            </ul>
        </div>
        <div class="centralMenu">
            <slot name="firstContent"></slot>
            <slot name="secondContent"></slot>
            <slot name="thirdContent"></slot>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "TeacherMenu",
    setup() {
    },
});
</script>

<style scoped>
    .content{
        display: flex;
        flex-direction: row;
        margin: 20px;
    }
    .sideMenu{
        display: flex;
        flex-direction: column;
        margin: 20px;
        border: #d9d9d9 4px solid;
        height: 350px;
    }

    .centralMenu{
        display: flex;
        flex-direction: column;
        padding: 0px 0px 20px 20px;
    }

    ul{
        list-style-type: none;
        width: 250px;
    }

    a{
        text-decoration: inherit;
        color: inherit;
    }

    ul a{
        display: block;
        padding: 5px 0px 15px 10px;
    }

    a:hover{
        text-decoration: inherit;
        color: #05a5d4;
    }

    h2{
        color: #05a5d4;
    }

    .centralMenu p{
        margin-bottom: 80px;
    }

    h3{
        background-color: #05a5d4;
        padding: 20px;
        margin-top: 0;
        border-bottom: #d9d9d9 4px solid;
    }

    .sideMenu p{
        padding-left: 7%;
        padding-top: 7%;
        border-top: #d9d9d9 4px solid;
    }

    @media screen and (max-width: 1369px) {

        .content{
            display: flex;
            flex-direction: column;
            margin: 20px;
        }

    }
</style>