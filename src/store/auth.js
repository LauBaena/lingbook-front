import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
  }),

  getters: {
  },

  actions: {
    async handleRegister(nouUser){
      let type;
      if(nouUser.checkbox){
        type = "teacher";
      }else{
        type = "alumn";
      }

      let myDataAsJSON = JSON.stringify({
        "type": type,
        "name": nouUser.name,
        "surname": nouUser.surname,
        "mail": nouUser.mail,
        "password": nouUser.password,
      });
      console.log(myDataAsJSON)

      const data = await axios.post("/users/new", myDataAsJSON, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic bGluZ2JvODIxOmszNjkzQjM5"
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.headers);
        } 
      });

      if(data){
        if(type === "alumn"){
          alert("Nou alumne registrat: " + nouUser.name)
        }else if (type === "teacher"){
          alert("Nou professor registrat: " + nouUser.name)
        }
        window.location.replace("/");
      }else{
        alert("Usuari ja existent")
      }
    }
  },  
});