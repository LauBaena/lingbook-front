<template>
    <div class="section">
        <h1>Parla, escolta, apren... i torna a parlar!</h1>
        <p class="sectionText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolores, vero quo aut placeat illum porro tenetur consequatur sequi. Nihil itaque cum nostrum libero facilis nemo a, odit quaerat quidem.</p>
        <div class="bottonsRegister">
            <button class="registerButton"><router-link :to="{ name: 'register' }" class="routerlink">Vols aprendre una llengua?</router-link></button>
            <button class="registerButton"><router-link :to="{ name: 'register' }" class="routerlink">Vols ensenyar una llengua?</router-link></button>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from "vue";
            
    export default defineComponent({
        name: "SectionRegister",
        
        setup() {

        },
    });
</script>

<style scoped>
    h1{
        font-size: 34px;
    }
    .section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 150px;
    }
    .sectionText{
        width: 65%;
    }
    .bottonsRegister{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .registerButton{
        float:right;
        width: 60%;
        height: 55px;
        margin: 10px;
        -moz-border-radius: 19px;
        -webkit-border-radius: 19px;
        border-radius: 27px;
        -moz-background-clip: padding;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        background-color: #55b1df;
        border:1px solid #55b1df;
        border:none;
        color: #fff;
        font-weight: bold;
    }
    .registerButton:hover{
        background-color: #fff; 
        border:1px solid #55b1df; 
        color:#55b1df; 
        cursor:pointer;
    }
    .registerButton:focus{
        outline: none;
    }
    .routerlink{
    text-decoration: none;
    color:#104b68;
    }
</style>
