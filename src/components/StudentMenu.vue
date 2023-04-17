<template>
    <div class="content">
        <div class="sideMenu">    
            <h3>Espai personal</h3>
            <ul>
                <li><a href="" >Properes classes</a></li>
                <li><a href="">Les meves llengües</a></li>
                <li><a href="">Els meus comentaris</a></li>
            </ul>
            <a href=""><p>Cerca un professor</p></a>
        </div>
        <div class="centralMenu">
            <div>
                <h2>Les meves properes classes</h2>
                <p>Espai en construcció</p>
            </div>
            <div>
                <h2>Els darrers vídeos que he comentat</h2>
                <p>Espai en construcció</p>
            </div>
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
    }

    .centralMenu{
        display: flex;
        flex-direction: column;
        margin: 20px;
    }

    ul{
        list-style-type: none;
    }

    a{
        text-decoration: inherit;
        color: inherit;
        margin-bottom: 10px;
    }

    ul a{
        display: block;
        padding: 0px 80px 10px 10px;
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
</style>