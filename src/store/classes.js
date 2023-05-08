import { defineStore } from "pinia";
import axios from "axios";

export const useClassesStore = defineStore("classes", {
    state: () => ({
        classes: [],
        classe: "",
        reservaClasse: false,
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
        },
        //Funció per l'usuari autoritzat alumne per reservar una classe o anul·lar-ne la reserva
        async ReservaroAnularRoom(id_room, id_user){

            //Si ja hem reservat classe, anul·lem la reserva
            if (this.reservaClasse){
                const { data } = await axios.delete(`/alumn/${id_user}/room/${id_room}`, {
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
                if(data){
                    this.reservaClasse = !this.reservaClasse
                }else{
                    alert("No s'ha pogut reservar la classe")
                }

                //Sinó, fem la reserva
            }else{
                console.log("id_user" + id_user + "id classe" + id_room)
                const { data } = await axios.post(`/alumn/${id_user}/room/${id_room}`, {
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
                    this.reservaClasse = !this.reservaClasse
                }else{
                    alert("No s'ha pogut reservar la classe")
                }
            }
        },

        async amIInRoom(id_room) {
            this.reservaClasse = this.UserClassView.some((classe) => classe.id_room === id_room);
            console.log(this.reservaClasse)
        },
    },
});