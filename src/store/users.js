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

    async fecthUser(id){
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

      this.user = data;
    }
  },  
});