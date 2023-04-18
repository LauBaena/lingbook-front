import { defineStore } from "pinia";
import axios from "axios";

export const useVideosStore = defineStore("videos", {
  state: () => ({
    videos: [],
    video: "",
  }),

  getters: {
  },

  actions: {
    //Funció que accedeix a tots els vídeos disponibles
    async fetchAllVideos(){
        const {data} = await axios.get("/videos/all", {
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
        this.modify_data(data)
    },
    async modify_data(data){
        for (let i = 0; i < data.length; i++){
            let segments = data[i].link.split("/");
            // Utilitzem el mètode pop per obtenir l'últim segment
            data[i].shortLink = segments.pop();
        }
  
        this.videos = data;
        console.log(this.videos)
    },
  },  
});