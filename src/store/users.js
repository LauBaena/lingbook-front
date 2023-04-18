import { defineStore } from "pinia";
import axios from "axios";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    user: undefined,
  }),

  getters: {
    // getIsAuth(state) {
    //   return state.isAuth;
    // },
  },

  actions: {
    //Funció que accedeix a tots els usuaris registrats
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

    //Funció que modifica els usuaris de l'array passat per paràmetre 
    //Passa el tipus a un string amb el rol corresponent i el nom/cognom amb l'inicial en majúsucles. Desa l'array a la variable 'users'
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
    },
  },  
});