import { defineStore } from "pinia";
import axios from "axios";
// import router from '../router/index.js';

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    user: "",
    teachersByLanguage:[],
  }),

  getters: {
    // getIsAuth(state) {
    //   return state.isAuth;
    // },
  },

  actions: {
    //Funció que accedeix a tots els usuaris registrats
    async fetchAllUsers(statusControl){
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

      this.modify_data(data,statusControl);
    },

    //Funció que modifica els usuaris de l'array passat per paràmetre 
    //Passa el tipus a un string amb el rol corresponent i el nom/cognom amb l'inicial en majúsucles. Desa l'array a la variable 'users'
    async modify_data(data, statusControl){
      let dadesFiltrades = "";
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
        // Filtrem per status per saber si l'usuari ha estat eliminat
      if (statusControl === "0"){
          dadesFiltrades = data.filter(obj => obj.status !== "0")
      }
      if (statusControl === "1"){
          dadesFiltrades = data.filter(obj => obj.status !== "1")
      }
      this.users = dadesFiltrades;
    },

    //Funció que accedeix a l'usuari amb l'id passat per paràmetre i el desa a la variable 'user'
    async fetchUser(id){
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

      // if(data.type === "0"){
      //   data.type = 'Administrador/a';
      // }else if(data.type === "1"){
      //   data.type = 'Professor/a';
      // }else{
      //   data.type = 'Alumne';
      // }
      console.log(data)
      data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      data.surname = data.surname.charAt(0).toUpperCase() + data.surname.slice(1);

      this.user = data;
    },

    //Funció que accedeix a tots els usuaris professors segons llengua
    async fetchTeachersByLanguage(language_id){

      this.teachersByLanguage = [];
      const {data} = await axios.get("/languages/" + language_id +" /teachers", {
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
      this.teachersByLanguage = data;
    },

    async flipStatus(dadesUser){
      const {data} = await axios.delete("/users/" + dadesUser,  {
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
      if(data === false){
        alert("No s'ha pogut modificar el Status de l'usuari. Contacta amb el responsable del Back")
      } else{
        alert("Estat de l'usuari modificat");
      }
    },
    
  }, 
});