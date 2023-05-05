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
        async fetchUserClasses(id_user) {
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

            data.map(classe => {
                console.log(classe.id_room);
                console.log(classe.capacity);
                console.log(classe.updated_at);
                console.log(classe.description);
                console.log(classe.DATA);
                console.log(classe.id_language);
                console.log(classe.name);
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

            data.map(classe => {
                console.log(classe.id_room);
                console.log(classe.capacity);
                console.log(classe.updated_at);
                console.log(classe.description);
                console.log(classe.DATA);
                console.log(classe.id_language);
                console.log(classe.name);
            });

            if(!data){
                alert("No hi ha cap classe programada");
            }else{
                this.classes = data;
            }
            console.log(data)
        }
    },
});