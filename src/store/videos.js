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
    async fetchAllVideos(statusControl){
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
        this.modify_data(data,statusControl)
    },

    async modify_data(data,statusControl){
        let dadesFiltrades = "";
        for (let i = 0; i < data.length; i++){
            let segments = data[i].link.split("/");
            // Utilitzem el mètode pop per obtenir l'últim segment
            data[i].shortLink = segments.pop();
        }
        // Filtrem per status per saber si el vídeo ha estat eliminat
        if (statusControl === "0"){
            dadesFiltrades = data.filter(obj => obj.status !== "0")
        }
        if (statusControl === "1"){
            dadesFiltrades = data.filter(obj => obj.status !== "1")
        }
        // console.log("Dades filtrades", dadesFiltrades)

        this.videos = dadesFiltrades;
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

      this.modify_data(data, "0")
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

       this.video = data;
      // this.modify_data(data)
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

    async flipStatus(dadesVideo, controlStatus){

      let myDataAsJSON = JSON.stringify ({
        "id": dadesVideo,
      });

      let dades = JSON.parse(myDataAsJSON);
      const {data} = await axios.delete("/videos/" + dades.id,  {
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
 
      if(data === false){
        alert("No s'ha pogut modificar el Status del vídeo. Contacta amb el responsable del Back")
        await router.push({ path: "/deletedVideos"});
      } else{
        
        if(controlStatus === "0"){
          alert("Vídeo eliminat");
          await router.push({ path: "/deletedVideos"});
        } 
        if (controlStatus === "1"){
          alert("El vídeo s'ha tornat a publicar");
          await router.push({ path: "/deletedVideos"});
        }
      }
    },
  },
    
});