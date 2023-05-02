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

        data.map(video => {
          console.log("ER LINK " + video.link);
          //console.log(video.title);
          //console.log(video.description);
          //console.log(video.url);
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

      data.map(video => {
        console.log("ER LINK " + video.link);
        //console.log(video.title);
        //console.log(video.description);
        //console.log(video.url);
      });


      console.log(data)
      this.modify_data(data)
  },

    async addVideo(dadesVideo){

      console.log(dadesVideo)

      let myDataAsJSON = JSON.stringify ({
        "link": dadesVideo.url,
        "id": dadesVideo.id_user,
      });

      let dades = JSON.parse(myDataAsJSON);

      console.log("L'url back"+ "/teacher/"+ dades.id + "/video");
      console.log("Link video "+ dades.link);

      const {data} = await axios.post("/teacher/" + dades.id + "/video",  {
        link: dades.link,
        description: "Alludame porfabor y funca"
      }, {
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

      console.log("La DATA "+ data);

      if(data === true){
        alert("Video afegit");
        /*if(type === "alumn"){
          alert("Nou alumne registrat: " + nouUser.name)
        }else if (type === "teacher"){
          alert("Nou docent registrat: " + nouUser.name)
        }
        await router.push({ path: "/login" });*/
      }else{
        alert("No s'ha pogut afegir el video")
      }
    },
  },
    
});