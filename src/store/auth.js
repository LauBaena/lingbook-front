import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode";
import router from '../router/index.js';

//Funció que crea una cookie per desar el token (nom i valor passat per paràmetre)
const setCookie = (name, value, days = 1) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

//Funció que esborra la cookie amb el token (nom passat per paràmetre)
const eraseCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

// Funció per afegir un REGEX alhora de crear una contrasenya: entre 6-12 caràcters, una majúscula, una minúscula i un número
const validatePassword = (password) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$/;
  return regex.test(password);
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    authUser: {},
    token: null,
    authUserCompleteName: "",
    teacherLanguage: "",
  }),

  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
    // authUser: (state) => state.authUser,
    // token: (state) => state.token,
  },

  actions: {
    //Funció que comprova si hi ha token guardat a la cookie. Si n'hi ha, el desa i crida a la funció 'decode'
    async thereIsToken(){
      let nameEQ = "LingbookToken=";
      let ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          this.isAuth = true;
          this.token = c.substring(nameEQ.length, c.length);
          this.decode();
        }
      }
    },

    //Funció que logeja a l'usuari segons les dades introduïdes
    async handleLogin(user) {
      let myDataAsJSON = JSON.stringify({
        "mail": user.mail,
        "password": user.password
      });

      const {data} = await axios.post("/users/login", myDataAsJSON, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic bGluZ2JvODIxOmszNjkzQjM5"
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        } 
      });

      if(data === "error"){
        alert("Correu electrònic o contrasenya incorrecte")
      }else{
        setCookie("LingbookToken", data);
        this.isAuth = true;
        this.token = data;
        this.decode();
        await router.push({ path: `/profile/${this.authUser.id_user}` });
      }
    },

    //Funció que decodifica el token de l'usuari autenticat. Desa les dades a la variable 'authUser'
    async decode(){
      try{
          let decoded = jwt_decode(this.token)
          this.authUser = decoded;
          if(this.authUser.type === "0"){
            this.authUser.type = "Administrador/a";
          }else if(this.authUser.type === "1"){
            this.authUser.type = "Professor/a";
          }else{
            this.authUser.type = "Alumne";
          }
          let authName = this.authUser.name.charAt(0).toUpperCase() + this.authUser.name.slice(1);
          let authSurname = this.authUser.surname.charAt(0).toUpperCase() + this.authUser.surname.slice(1);
          this.authUserCompleteName = authName + " " + authSurname;

      }catch(err){
          console.log('token is null: ',err);
      }
    },

    //Funció que tanca sessió de l'usuari i esborra la Cookie amb el token 
    async handleLogout() {
      eraseCookie("LingbookToken");
      this.isAuth = false;
      this.token = null;
      await router.push({ path: "/login" });
    },

    //Funció que registra a l'usuari segons les dades introduïdes
    async handleRegister(nouUser){
      let type;
      if(nouUser.checkbox){
        type = "1";
      }else{
        type = "2";
      }

      // Validador del REGEX de la contrasenya introduïda
      if (!validatePassword(nouUser.password)) {
        alert("La contrasenya ha de tenir entre 6 i 12 caràcters, així com una lletra majúscula, una minúscula i un número");
        return;
      }

      let myDataAsJSON = JSON.stringify({
        "type": type,
        "name": nouUser.name,
        "surname": nouUser.surname,
        "mail": nouUser.mail,
        "password": nouUser.password,
      });

      const {data} = await axios.post("/users/new", myDataAsJSON, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic bGluZ2JvODIxOmszNjkzQjM5"
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
        } 
      });

      if(data !== 0){
        if(type === "alumn"){
          alert("Nou alumne registrat: " + nouUser.name)
        }else if (type === "teacher"){
          alert("Nou docent registrat: " + nouUser.name)
        }
        await router.push({ path: "/login" });
      }else{
        alert("Compte d'usuari ja existent")
      }
    },

    //Funció que modifica la llengua de l'usuari Profesor
    async modifyTeachersLanguage(language) {
      console.log(language)
      this.teacherLanguage = language;
      console.log(this.teacherLanguage)
    },
  },
});