import { defineStore } from "pinia";
import axios from "axios";

export const useLanguagesStore = defineStore("languages", {
  state: () => ({
    languages: [],
    language: "",
    studentLanguages: [],
    imFollowing: false,
  }),

  getters: {
  },

  actions: {
    //Funció que accedeix a totes les llengues disponibles
    async fetchAllLanguages(){
      const {data} = await axios.get("/languages/all", {
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

    //Funció que modifica les llengües de l'array passat per paràmetre 
    //Crea la propietat image per afegir l'icona corresponent segons el nom. Desa l'array a la variable 'languages'
    async modify_data(data){
        for (let i = 0; i < data.length; i++){
            data[i].image = `${data[i].name}_icon.png`;
        }
        this.languages = data;
    },

    //Funció que accedeix a la llengua amb l'id passat per paràmetre i la desa a la variable 'language'
    async fetchLanguage(id){
      console.log(id)
      const {data} = await axios.get("/languages/id/" + id, {
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
      data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        
      this.language = data;
    },

    //Funció que accedeix a la llengua amb l'id passat per paràmetre i la desa a la variable 'language'
    async fetchLanguageByName(name){
      console.log(name)
      const {data} = await axios.get("/languages/name/" + name, {
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
      console.log(data)
      this.language = data;
    },

    //Funció que accedeix a les llengües que l'usuari autenticat (alumne) segueix
    async fetchStudentLanguages(user_id){
      console.log(user_id)
      const {data} = await axios.get("/alumn/" + user_id + "/lang", {
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
        data[i].image = `${data[i].name}_icon.png`;
        data[i].name = data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1);
      }
      
      this.studentLanguages = data;
    },

    //Funció per l'usuari autoritzat alumne per seguir o deixar de seguir una llengua
    async followOrUnfollowLanguage(language_id, user_id){

      //Si ja seguim a la llengua, l'eliminem (UNFOLLOW)
      if (this.imFollowing){
        const { data } = await axios.delete(`/alumn/${user_id}/lang/${language_id}`, {
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

        console.log("Resultat delete:" + data)
        if(data){
          this.imFollowing = !this.imFollowing
        }else{
          alert("No s'ha pogut deixar de seguir la llengua indicada")
        }

      //Sinó, la afegim com a llengua a la que seguim (FOLLOW)
      }else{
        console.log("Inicio llamada post con id usuario: " + user_id + ", id lenguaje: " + language_id)
        const { data } = await axios.post(`/alumn/${user_id}/lang/${language_id}`, {
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

        console.log("Resultat post:" + data)
        if(data){
          this.imFollowing = !this.imFollowing
        }else{
          alert("No s'ha pogut començar a seguir  la llengua indicada")
        }
      }
    },

    //Funció que determina si l'usuari alumne autenticat segueix o no una llengua específica
    async amIFollowing(language_id) {
      this.imFollowing = this.studentLanguages.some((language) => language.id_language === language_id);
      console.log(this.imFollowing)
    },
  },  
});