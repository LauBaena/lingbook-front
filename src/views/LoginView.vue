<template>
    <div id="formWrapper">
        <div id="form">
            <div class="logo">
                <img class="logoImage" src="../assets/bafarading.png">
            </div>
            <form @submit.prevent="loginUser()">
                <div class="form-item">
                    <p class="formLabel">Correu Electrònic</p>
                    <input 
                        v-model="userForm.mail" 
                        @focusin="emailFocus=true" 
                        @focusout="emailFocus=false" 
                        type="email" 
                        name="email" 
                        id="email" 
                        class="form-style" 
                        :class="{formTop: emailFocus}"
                        autocomplete="off" 
                        required/>
                </div>
                <div class="form-item">
                    <p class="formLabel">Contrasenya</p>
                    <input 
                        v-model="userForm.password" 
                        @focusin="passFocus=true" 
                        @focusout="passFocus=false" 
                        type="password" 
                        name="password" 
                        id="password" 
                        class="form-style" 
                        :class="{formTop: passFocus}"
                        required/>
                    <p><a href="#"><small>T'has oblida't de la contrasenya?</small></a></p>  
                </div>
                <div class="form-item">
                    <p class="pull-left"><router-link :to="{ name: 'register' }"><small>No tens compte? Registra't</small></router-link></p>
                    <input type="submit" class="login pull-right" value="Entra">
                    <div class="clear-fix"></div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import { defineComponent } from "vue";
    import { useAuthStore } from "@/store/auth";
    
    const authStore = useAuthStore();
    
    export default defineComponent({
        name: "LoginView",
    
        setup() {
            let userForm = ref({
                mail: "",
                password: "",
            });

            let emailFocus = ref('false');
            let passFocus = ref('false');

            function loginUser(){
                authStore.handleLogin(userForm.value)
            }
        
            return {
                userForm,
                authStore,
                emailFocus,
                passFocus,
                loginUser,
            };
        },
    });
</script>
  
<style scoped>
    .logoImage{
        width:100%;
    }
    .pull-right{
        float: right;
    }
    .pull-left{
        float: left;
    }
    .clear-fix{
        clear:both;
    }
    #formWrapper {
        min-height: 60vh;
        margin-bottom: 40px;
    }
    #form {
        position: relative;
        width:22%;
        min-width:300px;
        height:auto;
        background-color: rgb(236, 236, 236);
        margin:auto ;
       margin-top:28px;
        border-radius: 15px;
        padding:20px;
        padding-top: 25px;
        padding-bottom: 25px;
        margin-bottom: 29px;
    }
    div.form-item{
        position: relative;
        display: block; 
        margin-bottom: 20px;
    }

    input{
        transition: all .2s ease;
    }
    input.form-style{
        color:#8a8a8a;
        display: block;
        width: 90%;
        height: 44px;
        padding: 5px 5%;
        border:1px solid #ccc;
        -moz-border-radius: 27px;
        -webkit-border-radius: 27px;
        border-radius: 27px;
        -moz-background-clip: padding;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        background-color: #fff;
        font-family:'HelveticaNeue','Arial', sans-serif;
        font-size: 105%;
        letter-spacing: .8px;
    }

    div.form-item .form-style:focus{
        outline: none; 
        border:1px solid #58bff6; 
        color:#58bff6; 
    }
    div.form-item p.formLabel {
        color:#58bff6; 
    }
    .formTop{
        top:-22px !important; 
        left:26px; 
        background-color: #fff; 
        padding:0 5px; 
        font-size: 14px; 
        color:#58bff6 !important;
    }
    .formStatus{
        color:#8a8a8a !important;
    }

    input[type="submit"].login{
        float:right;
        width: 112px;
        height: 37px;
        -moz-border-radius: 19px;
        -webkit-border-radius: 19px;
        border-radius: 19px;
        -moz-background-clip: padding;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        background-color: #55b1df;
        border:1px solid #55b1df;
        border:none;
        color: #fff;
        font-weight: bold;
    }

    a{
        color:#58bff6;
        text-decoration: none;
    }
    a:hover{
        color:#aaa; 
    }
    input[type="submit"].login:hover{
        background-color: #fff; 
        border:1px solid #55b1df; 
        color:#55b1df; 
        cursor:pointer;}
    input[type="submit"].login:focus{
        outline: none;
    }

    @media screen and (max-width: 719px) {
        #form {

            width: 50vw;
            flex-wrap: wrap;

        }

        .checkbox{
            position:absolute;
            display: inline-block;
            text-align: center;
            bottom: 10px;
            left: 10px;

        }

    }


    @media screen and (min-width: 720px) and (max-width: 1019px){

        #form {

            width: 30vw;
            flex-wrap: wrap;

        }

        .checkbox{
            position:absolute;
            display: inline-block;
            text-align: center;
            bottom: 15px;
            left: 10px;

        }

    }

    @media screen and (min-width: 912px) and (max-width: 1369px){

        #form {

            width: 30vw;
            flex-wrap: wrap;

        }

        .checkbox{
            position:absolute;
            display: inline-block;
            text-align: center;
            bottom: 10px;
            left: 10px;

        }

    }

    @media screen and (min-width: 1370px) and (max-width: 1699px){


        .checkbox{
            left: 50px;
            bottom: 20px;
        }

    }
</style>
  