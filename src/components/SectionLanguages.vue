<template>
    <div class="section">
        <h1>Quines llengües hi trobaràs</h1>
        <p class="sectionText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quia ipsam voluptatum accusantium recusandae eos necessitatibus quam earum dolore amet fugiat repudiandae minus, saepe, itaque vel pariatur sit nam suscipit.</p>
        <div class="languages">
            <img class="flagIcon" src="../assets/catalan_icon.png" title="Catalan" alt="catalanFlag">
            <img class="flagIcon" src="../assets/spanish_icon.png" title="Spanish" alt="spanishFlag">
            <img class="flagIcon" src="../assets/english_icon.png" title="English" alt="englishFlag">
            <img class="flagIcon" src="../assets/french_icon.png" title="French" alt="frenchFlag">
            <img class="flagIcon" src="../assets/italian_icon.png" title="Italian" alt="italianFlag">
            <img class="flagIcon" src="../assets/german_icon.png" title="German" alt="germanFlag">
            <img class="flagIcon" src="../assets/indian_icon.png" title="Japanese" alt="japaneseFlag">
            <img class="flagIcon" src="../assets/chinese_icon.png" title="Chinese" alt="chineseFlag">
        </div>
    </div>
</template>

<script>
    import { defineComponent } from "vue";
            
    export default defineComponent({
        name: "SectionLanguages",
        setup() {
        },
    });
</script>

<style scoped>
    h1{
        font-size: 34px;
    }
    .languages{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 150px;
    }
    .sectionText{
        width: 65%;
    }
    .flagIcon{
        width: 10%;
        margin: 10px;
    }

    /*
Media queries
 */
    @media screen and (max-width: 1199px) {
        .languages{
            display: flex;
            flex-wrap: wrap;
        }

        .flagIcon{
            width: 20%;
        }
    }

</style>
