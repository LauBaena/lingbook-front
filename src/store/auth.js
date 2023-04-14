import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode";
import router from '../router/index.js';

const setCookie = (name, value, days = 1) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const eraseCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    authUser: {},
    token: null,
    authUserCompleteName: "",
    users: [],
    user: undefined,
  }),

  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
    // authUser: (state) => state.authUser,
    // token: (state) => state.token,
  },

  actions: {
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
        // await router.push({name: 'profile', params: {id: user.id_user}});
      }
    },

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
          // this.fetchUser(this.authUser.id_user);

      }catch(err){
          console.log('token is null: ',err);
      }
    },

    async handleLogout() {
      eraseCookie("LingbookToken");
      this.isAuth = false;
      this.token = null;
      await router.push({ path: "/login" });
    },

    async handleRegister(nouUser){
      let type;
      if(nouUser.checkbox){
        type = "1";
      }else{
        type = "2";
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

      if(data === 0){
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

    async fetchAllUsers(){
      const {data} = await axios.get("/users/all", {
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

      this.modify_data(data);
    },

    async modify_data(data){
      for (let i = 0; i < data.length; i++){
        if(data[i].type === "0"){
          data[i].type = 'Administrador/a';
        }else if(data[i].type === "1"){
          data[i].type = 'Professor/a';
        }else{
          data[i].type = 'Alumne';
        }
        data[i].name = data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1);
        data[i].surname = data[i].surname.charAt(0).toUpperCase() + data[i].surname.slice(1);
      }

      this.users = data;
    },

    async fetchUser(id){
      console.log(id)
      const {data} = await axios.get("/users/" + id, {
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

      if(data.type === "0"){
        data.type = 'Administrador/a';
      }else if(data.type === "1"){
        data.type = 'Professor/a';
      }else{
        data.type = 'Alumne';
      }
      data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      data.surname = data.surname.charAt(0).toUpperCase() + data.surname.slice(1);

      this.user = data;
    }
  },  
});