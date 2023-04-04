<template>
    <div id="formWrapper">
        <div id="form">
            <div class="logo">
                <img class="logoImage" src="../assets/bafarading.png">
            </div>
            <form @submit.prevent="registerUser()">
                <div class="form-row">
                    <div class="form-item nom">
                        <p class="formLabel">Nom</p>
                        <input 
                            v-model="userForm.name" 
                            type="text" 
                            name="name" 
                            id="name" 
                            class="form-style" 
                            autocomplete="off" 
                            required/>
                    </div>
                    <div class="form-item cognom">
                        <p class="formLabel">Cognoms</p>
                        <input 
                            v-model="userForm.surname" 
                            type="text" 
                            name="surname" 
                            id="surname" 
                            class="form-style" 
                            autocomplete="off" 
                            required/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-item correu">
                        <p class="formLabel">Correu Electrònic</p>
                        <input 
                            v-model="userForm.mail" 
                            type="email" 
                            name="email" 
                            id="email" 
                            class="form-style" 
                            autocomplete="off" 
                            required/>
                    </div>
                    <div class="form-item checkbox">
                        <p class="formLabel">Vols ensenyar?</p>
                        <input
                            v-model="userForm.checkbox" 
                            type="checkbox" 
                            name="professor" 
                            id="professor" 
                            class="form-style" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-item contrasenya">
                        <p class="formLabel">Contrasenya</p>
                        <input 
                            v-model="userForm.password" 
                            type="password" 
                            name="password" 
                            id="password" 
                            class="form-style" 
                            required/>
                    </div>
                    <div class="form-item contrasenya">
                        <p class="formLabel">Repeteix la contrasenya</p>
                        <input 
                            v-model="userForm.password2" 
                            type="password" 
                            name="password2" 
                            id="password2" 
                            class="form-style" 
                            required/>
                    </div>
                </div>
                <div class="form-item">
                    <p class="pull-left"><router-link :to="{ name: 'login' }"><small>Ja tens compte? Entra a Lingbook</small></router-link></p>
                    <input type="submit" class="login pull-right" value="Registra't">
                    <div class="clear-fix"></div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
    import { ref } from "vue";
    import { useAuthStore } from "../store/auth";
    import { defineComponent } from "vue";
    
    const authStore = useAuthStore();
    
    export default defineComponent({
        name: "RegisterView",
    
        setup() {
        const userForm = ref({
            name: "",
            mail: "",
            checkbox: "",
            password: "",
            password2: "",
        });

        function registerUser(){
            if(userForm.value.password === userForm.value.password2){
                authStore.handleRegister(userForm.value)
            }else{
                alert("Les dues contrasenyes han de coincidir.")
            }
        }
        
        return {
            userForm,
            authStore,
            registerUser
        };
        },
    });
</script>
  
<style scoped>
/* Referències al botó: pulls*/
.pull-right{
    float: right;
}
.pull-left{
    float: left;
}
.clear-fix{
    clear:both;
}

/* Referències a la imatge de capçalera*/
.logoImage{
    width:100%;
}
#form {
  position: relative;
  width:22%;
  height:auto;
  background-color: rgb(236, 236, 236);
  margin:auto;
  margin-top:28px;
  border-radius: 15px;
  padding:20px;
  padding-top: 25px;
  padding-bottom: 25px;
  margin-bottom: 106px;
}
input.form-style{
    color:#8a8a8a;
    width: 95%;
    height: 40px;
    padding: 3px 5%;
    border:1px solid #ccc;
    border-radius: 27px;
    font-size: 100%;
    letter-spacing: .8px;
}

/* Referències a transició color input un cop tret focus*/
input{
    transition: all .5s ease;
}

/** Referencia al color de tot el text tret del botó*/
div.form-item p.formLabel {
    color:#58bff6; 
}
div.form-item .form-style:focus{
    outline: none; 
    border:1px solid #58bff6; 
    color:#58bff6; 
}
.form-row {
    width: 100%;
}
.nom {
    display: inline-block;
}
.cognom {
    display: inline-block;
    margin-left: 25px;
}
.correu{
    display: inline-block;
    width: 70%;
    position: relative;
}
.checkbox{
    position:absolute;
    display: inline-block;
    top: 10;
    margin-left: 10px;
}
.contrasenya:first-child{
    display: inline-block;
    margin-right: 25px;
}
.contrasenya {
    display: inline-block;
}

/* Referencia a "Ja tens compte...."*/ 
a{
    color:#58bff6;
    text-decoration: none;
}
a:hover{
    color:#aaa; 
}

/* Referència a l botó de registrar-se*/ 
input[type="submit"].login{
    margin-top: 35px;
    float:right;
    width: 112px;
    height: 40px;
    border-radius: 20px;
    background-color: #55b1df;
    border:none;
    color: #fff;
    font-weight: bold;
}

/** Referencia al botó registrar-se al passar ratolí*/
input[type="submit"].login:hover{
    background-color: #fff; 
    border:1px solid #55b1df; 
    color:#55b1df; 
    cursor:pointer;
}

@media screen and (max-width: 699px){

    #form {

        width: 50%;
        flex-wrap: wrap;

    }

    input.form-style{
        width: 100%;
    }

    .form-item {
        max-width: 100%;
    }

    .form-row {
        max-width: 90%;
    }

}

@media screen and (min-width: 700px) and (max-width: 1699px){

    #form {
        width: 50%;
        flex-wrap: wrap;

    }

    input.form-style{
        width: 100%;
    }

    .form-item {
        max-width: 30%;
    }


}
</style>