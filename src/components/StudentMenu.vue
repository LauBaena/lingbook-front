<template>
    <div class="content">
        <div class="sideMenu">    
            <h3>Espai personal</h3>
            <ul>
                <li><a><router-link :to="{ name: 'userClasses' }">Properes classes</router-link></a></li>
                <li><a><router-link :to="{ name: 'studentLanguages' }">Les meves llengües</router-link></a></li>
                <li><a><router-link :to="{ name: 'userMessages' }">Els meus missatges</router-link></a></li>
            </ul>
            <a><router-link :to="{ name: 'allLanguages' }"><p>Cerca un professor</p></router-link></a>
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
    name: "StudentMenu",
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
        padding: 5px 0px 10px 10px;
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

        .sideMenu p{
            padding-left: 5.5%;
            padding-top: 2%;
            border-top: #d9d9d9 4px solid;
        }
    }

    @media screen and (max-width: 969px) {
        .sideMenu p{
            padding-left: 5.5%;
            padding-top: 3.5%;
            border-top: #d9d9d9 4px solid;
        }
    }

    @media screen and (max-width: 600px) {
        .sideMenu p{
            padding-left: 5.5%;
            padding-top: 6.5%;
            border-top: #d9d9d9 4px solid;
        }
    }
</style>