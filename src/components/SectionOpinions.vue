<template>
    <div class="section">
        <h1>Els alumnes opinen</h1>
        <p class="sectionText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quia ipsam voluptatum accusantium recusandae eos necessitatibus quam earum dolore amet fugiat repudiandae minus, saepe, itaque vel pariatur sit nam suscipit.</p>
        <div class="students">
            <div class="student">
            <h4>"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex quos velit eos delectus omnis perferendis laborum quasi commodi sunt, eius iste mollitia consequatur earum adipisci aspernatur aperiam asperiores repellat maxime."</h4>
            <img class="studentImg" src="../assets/student1.jpg" alt="student1">
            <p>Alumne/a registrat/da</p>
            </div>
            <div class="student">
            <h4>"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex quos velit eos delectus omnis perferendis laborum quasi commodi sunt, eius iste mollitia consequatur earum adipisci aspernatur aperiam asperiores repellat maxime.</h4>
            <img class="studentImg" src="../assets/student2.jpg" alt="student2">
            <p>Alumne/a registrat/da</p>
            </div>
            <div class="student">
            <h4>"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex quos velit eos delectus omnis perferendis laborum quasi commodi sunt, eius iste mollitia consequatur earum adipisci aspernatur aperiam asperiores repellat maxime."</h4>
            <img class="studentImg" src="../assets/student3.jpg" alt="student3">
            <p>Alumne/a registrat/da</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from "vue";
            
    export default defineComponent({
        name: "SectionOpinions",
        setup() {
        },
    });
</script>

<style scoped>
    h1{
        font-size: 34px;
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
    .students{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .student{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px;
        width: 20%;
    }
    .studentImg {
        width:70%;
        border-radius:150px;
    }
    h4{
        font-style: italic;
    }
</style>
