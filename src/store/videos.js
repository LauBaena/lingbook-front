import { defineStore } from "pinia";
import axios from "axios";
import router from '../router/index.js';

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
        console.log("A sota ve la lenght")
        console.log(data.length)
        this.videos = data;
        console.log(this.videos)
    },

    async fetchUserVideos(id_usuari){
      const {data} = await axios.get("/teacher/"+id_usuari+"/videos", {
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

    async viewSelectedVideo(id_video){
      const {data} = await axios.get("/videos/"+id_video, {
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
      //let segments = data.link.split("/");
      // // Utilitzem el mètode pop per obtenir l'últim segment
      //data.shortLink = segments.pop();
      this.video = data;
      //this.modify_data(data)

      //console.log("Dades del video"+ JSON.stringify(data))
  },

    async addVideo(dadesVideo){

      let myDataAsJSON = JSON.stringify ({
        "link": dadesVideo.url,
        "description": dadesVideo.titol,
        "id": dadesVideo.id_user,
      });

      let dades = JSON.parse(myDataAsJSON);

      const {data} = await axios.post("/teacher/" + dades.id + "/video",  {
        link: dades.link,
        description: dades.description,
        id: dades.id,
      }, 

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
        alert("Video afegit");
        await router.push({ path: "/teacher" + "/" + dades.id});

      }else{
        alert("No s'ha pogut afegir el video")
      }
    },
  },
    
});