import { defineStore } from "pinia";
import { useAuthStore } from "@/store/auth";
import axios from "axios";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [],
    message: "",
  }),

  getters: {
  },

  actions: {
    //Funció que accedeix a tots els missatges, visibles o eliminats segons l'status (per l'administrador)
    async fetchAllMessages(status){
      this.messages= [];
      const {data} = await axios.get("/messages/all", {
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

      if(status === "1"){
        this.modify_data(data)
      }else if(status === "0"){
        let dadesFiltrades = data.filter(obj => obj.status === "0")
        dadesFiltrades.sort((a, b) => b.id_message - a.id_message);
        this.messages = dadesFiltrades;
      }
    },

    //Funció que accedeix a tots els missatges escrits per l'usuari autoritzat
    async fetchUserMessages(user_id){
      this.messages= [];
      const authStore = useAuthStore();

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

      for (let i = 0; i < data.length; i++){
        data[i].username = authStore.authUserCompleteName;
      }

      this.modify_data(data)
    },

    //Funció que accedeix a tots els missatges corresponents a un vídeo concret
    async fetchVideoMessages(video_id){
      const {data} = await axios.get("/messages/video/" + video_id, {
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

      this.modify_data(data)
    },

    //Funció que accedeix a un missatge específic segons el seu id
    async fetchMessageById(message_id){
      
      const {data} = await axios.get("/messages/" + message_id, {
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
      this.message = data;
    },

    //Funció que modifica els missatges passats per paràmetre per seleccionar només els no eliminats (status 1) i ordenar-los
    async modify_data(data){
      let dadesFiltrades = data.filter(obj => obj.status === "1");
      dadesFiltrades.sort((a, b) => b.id_message - a.id_message);
      this.messages = dadesFiltrades;
    },

    //Funció que afegeix un missatge d'un usuari específic a un vídeo específic
    async addMessage(message){
      let myDataAsJSON = JSON.stringify ({
        "description": message.message,
      });

      const {data} = await axios.post("/videos/" + message.id_video + "/" + message.id_user + "/message", myDataAsJSON, 
      {
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

      if(data === true){
        alert("Missatge afegit");
      }else{
        alert("No s'ha pogut afegir el missatge")
      }
    },

    //Funció que edita un missatge
    async editMessage(message, id_message){
      let myDataAsJSON = JSON.stringify ({
        "description": message.message,
      });

      const {data} = await axios.put("/messages/" + id_message, myDataAsJSON, 
      {
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
      
      if(data){
        alert("Missatge editat");
        this.message=data;
      }else{
        alert("No s'ha pogut editar el missatge")
      }
    },

    //Funció que elimina o recupera un missatge (administrador)
    async deleteOrRecoverMessage(message_id, status){
      const {data} = await axios.delete("/messages/" + message_id,
      {
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
        alert("No s'ha pogut realitzar l'acció. Contacta amb el responsable del Back")
      } else{
        if(status==="0"){
          alert("Missatge eliminat");
        }else if(status==="1"){
          alert("Missatge recuperat");
        }
      }
    },    
    
    //Funció que elimina o recupera un missatge propi de l'usuari autenticat
    async deleteMessage(message_id){
      const {data} = await axios.delete("/messages/" + message_id,
      {
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
        alert("No s'ha pogut eliminar el missatge. Contacta amb el responsable del Back")
      } else{
        alert("Missatge eliminat");
      }
    },
  },  
});