import {defineStore} from "pinia";
import axios from "axios";

export const useClassesStore = defineStore("classes", {
    state: () => ({
        classes: [],
        classesStudent: [],
        classe: "",
    }),

    getters: {},

    actions: {
        async fetchTeacherClasses(id_user) {
            const {data} = await axios.get("/teacher/" + id_user + "/classes", {
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

            if (!data) {
                alert("No hi ha cap classe programada");
            } else {
                this.classes = data;
            }
            console.log(data)
        },
        async fetchAlumnsClasses(id_user) {
            const {data} = await axios.get("/alumn/" + id_user + "/room", {
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

            if (!data) {
                alert("No hi ha cap classe programada");
            } else {
                this.classesStudent = data;
            }
            console.log(data)
        },
        async addClass(dadesClasse) {

            console.log(dadesClasse)

            const data = await axios.post("/teacher/" + dadesClasse.id_user + "/newclass", {
                capacity: dadesClasse.capacity,
                description: dadesClasse.description,
                DATA: dadesClasse.data,
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

            alert("Classe afegida");

        },
        async deleteClass(id_room, id_user) {
            const data = await axios.delete("/teacher/" + id_user + "/class/" + id_room, {
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
        },
        //Funció per l'usuari autoritzat alumne per reservar una classe o anul·lar-ne la reserva
        async ReservaClass(id_room, id_user) {
            const {data} = await axios.post(`/alumn/${id_user}/room/${id_room}`, {
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
            if (data) {
                    //this.reservaClasse = !this.reservaClasse
                    alert("S'ha reservat la classe")
            } else {
                alert("No pots reservar la mateixa classe dos cops")
            }
        },
        async cancelClass(id_room, id_user) {
            const data = await axios.delete("/alumn/" + id_user + "/room/" + id_room, {
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
            alert("Classe anul·lada")
        },
    },
});