import { defineStore } from "pinia";
import axios from "axios";

export const useClassesStore = defineStore("classes", {
    state: () => ({
        classes: [],
        classe: "",
    }),

    getters: {
    },

    actions: {
        async fetchTeacherClasses(id_user) {
            const { data } = await axios.get("/teacher/" + id_user + "/classes", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic bGluZ2JvODIxOmszNjkzQjM5"
                }
            })
                .catch(function (error) {
                    if(error.response) {
                        console.log(error.response.status);
                    }
                });

            if(!data){
                alert("No hi ha cap classe programada");
            }else{
                this.classes = data;
            }
            console.log(data)
        },
        async fetchAlumnsClasses(id_user) {
            const { data } = await axios.get("/alumn/" + id_user + "/room", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic bGluZ2JvODIxOmszNjkzQjM5"
                }
            })
                .catch(function (error) {
                    if(error.response) {
                        console.log(error.response.status);
                    }
                });

            if(!data){
                alert("No hi ha cap classe programada");
            }else{
                this.classes = data;
            }
            console.log(data)
        },
        async addClass(dadesClasse, id_user){

            let myDataAsJSON = JSON.stringify ({
                "capacity": dadesClasse.capacity,
                "description": dadesClasse.description,
                "data": dadesClasse.data,
            });

            let dades = JSON.parse(myDataAsJSON);

            const {data} = await axios.post("/teacher/" + id_user + "/newclass",  {
                name: dades.name,
                description: dades.description,
                capacity: dades.capacity,
                data: dades.data,
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

            console.log(data);

            if(data === true){
                alert("Classe afegida");
            }else{
                alert("No s'ha pogut afegir la classe")
            }
        }
    },
});