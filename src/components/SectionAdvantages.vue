<template>
    <div class="section">
        <h1>La millor manera d'aprendre una llengua</h1>
        <div class="advantages">
            <div class="advantage">
                <img class="icon" src="../assets/tick2_icon.png" alt="tickIcon">
                <h3>Parlants nadius</h3>
                <p>bla bla bla noseque dels avantatges d'aprendre idiomes amb professors nadius i experimentats</p>
            </div>
            <div class="advantage">
                <img class="icon" src="../assets/flag_icon.png" alt="flagIcon">
                <h3>Tu ets el protagonista!</h3>
                <p>bla bla bla noseque d'avantatges de fer classes virtuals on el rpofessor es pot dirigir de tu a tu
                    amb l'alumne</p>
            </div>

            <div class="advantage">
                <img class="icon" src="../assets/star_icon.png" alt="starIcon">
                <h3>Fes-ho quan vulguis!</h3>
                <p>bla bla bla noseque dels avantatges de poder escollir classes/trobades Zoom amb calendari i tota la
                    pesca</p>
            </div>


        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "SectionAdvantages",
    setup() {
    },
});
</script>

<style scoped>
h1 {
    font-size: 34px;
}

.section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 150px;
}

.advantages {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.advantage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 20%;
}


.icon {
    width: 10%;
}

/*
Media queries
 */
@media screen and (max-width: 1199px) {

    .advantages {
        display: flex;
        flex-wrap: wrap;
    }

    .advantage {
        width: 100%;
    }

}

</style>
