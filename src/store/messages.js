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
    async fetchUserMessages(id){
      
    },
  },  
});