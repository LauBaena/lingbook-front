<template>
    <div id="formWrapper">
        <div id="form">
            <div class="logo">
                <img class="logoImage" src="../assets/bafarading.png">
            </div>
            <form @submit.prevent="authStore.handleLogin(userForm)">
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
                    <!-- @focusin="focusPassword(true)" 
                    @focusout="focusPassword(false)"  -->
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
            // function focusEmail(boolean){
            //     if(boolean === true){
            //         this.parentNode.getElementsByClassName('formLabel')[0].classList.add('formTop');
            //     }else{
            //         this.parentNode.getElementsByClassName('formLabel')[0].classList.remove('formTop');
            //     }
            // };

            // function focusEmail(boolean){
            //     if(boolean === true){
            //         hasfocus = true;
            //     }else{
            //         hasfocus = false;
            //     }
            // };
        
            return {
                userForm,
                authStore,
                emailFocus,
                passFocus,
                // focusEmail,
                // focusPassword,
            };
        },
    });
</script>
  
<style scoped>
    body{
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        font-family:'HelveticaNeue','Arial', sans-serif;
    }

    .logoImage{
        width:100%;
    }

    a{
        color:#58bff6;
        text-decoration: none;
    }
    a:hover{
        color:#aaa; 
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

    div.logo{
        text-align: center; 
        margin: 20px 20px 30px 20px; 
        fill: #566375;
    }

    .logo-active{
        fill: #44aacc !important;
    }

    #formWrapper{
        background: rgba(0,0,0,.2); 
        width:100%; 
        height:100%; 
        position: absolute; 
        top:0; 
        left:0;
        transition:all .3s ease;
    }

    .darken-bg{
        background: rgba(0,0,0,.5) !important;
        transition:all .3s ease;
    }

    div#form{
        position: absolute;
        width:360px;
        height:320px;
        height:auto;
        background-color: #fff;
        margin:auto;
        border-radius: 5px;
        padding:20px;
        left:50%;
        top:50%;
        margin-left:-180px;
        margin-top:-200px;
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
        /* position: absolute;
        left:26px;
        top:2px;
        transition:all .4s ease;
        color:#bbb; */
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
    input[type="submit"].login:hover{
        background-color: #fff; 
        border:1px solid #55b1df; 
        color:#55b1df; 
        cursor:pointer;}
    input[type="submit"].login:focus{
        outline: none;
    }
</style>
  