import { defineStore } from "pinia";
import axios from "axios";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [],
    message: "",
  }),

  getters: {
  },

  actions: {
    //Funció que accedeix a tots els missatges escrits per l'usuari autoritzat
    async fetchUserMessages(user_id){
      const {data} = await axios.get("/messages/user/" + user_id, {
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
      this.messages = data;
      console.log(this.messages)
    },
  },  
});