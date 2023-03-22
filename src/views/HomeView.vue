<template>
  <div class="home">
    <div class="section">
      <h1>Parla, escolta, apren... i torna a parlar!</h1>
      <p class="sectionText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolores, vero quo aut placeat illum porro tenetur consequatur sequi. Nihil itaque cum nostrum libero facilis nemo a, odit quaerat quidem.</p>
      <div class="bottonsRegister">
        <button class="registerButton"><router-link :to="{ name: 'register' }" class="routerlink">Vols aprendre una llengua?</router-link></button>
        <button class="registerButton"><router-link :to="{ name: 'register' }" class="routerlink">Vols ensenyar una llengua?</router-link></button>
      </div>
    </div>

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
          <p>bla bla bla noseque d'avantatges de fer classes virtuals on el rpofessor es pot dirigir de tu a tu amb l'alumne</p>
        </div>
        <div class="advantage">
          <img class="icon" src="../assets/star_icon.png" alt="starIcon">
          <h3>Fes-ho quan vulguis!</h3>
          <p>bla bla bla noseque dels avantatges de poder escollir classes/trobades Zoom amb calendari i tota la pesca</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h1>Quines llengües trobaràs</h1>
      <p class="sectionText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quia ipsam voluptatum accusantium recusandae eos necessitatibus quam earum dolore amet fugiat repudiandae minus, saepe, itaque vel pariatur sit nam suscipit.</p>
      <div class="languages">
        <img class="flagIcon" src="../assets/catalan_icon.png" title="Catalan" alt="catalanFlag">
        <img class="flagIcon" src="../assets/spanish_icon.png" title="Spanish" alt="spanishFlag">
        <img class="flagIcon" src="../assets/english_icon.png" title="English" alt="englishFlag">
        <img class="flagIcon" src="../assets/french_icon.png" title="French" alt="frenchFlag">
        <img class="flagIcon" src="../assets/italian_icon.png" title="Italian" alt="italianFlag">
        <img class="flagIcon" src="../assets/german_icon.png" title="German" alt="germanFlag">
        <img class="flagIcon" src="../assets/japanese_icon.png" title="Japanese" alt="japaneseFlag">
        <img class="flagIcon" src="../assets/chinese_icon.png" title="Chinese" alt="chineseFlag">
      </div>
    </div>

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

    <div class="section">
      <h1>Vols estar al corrent de les novetats? Apunta't!</h1>
      <p class="sectionText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quia ipsam voluptatum accusantium recusandae eos necessitatibus quam earum dolore amet fugiat repudiandae minus, saepe, itaque vel pariatur sit nam suscipit.</p>
      <form class="subscribe">
        <input type="email" placeholder="Adreça electrònica" class="form-style" name="email" id="inputEmail">
        <input type="text" placeholder="Nom i cognoms" class="form-style" name="name" id="inputName">
        <input type="submit" class="subscribeButton" value="Subscriu-te">
      </form>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
        
  export default defineComponent({
    name: "HomeView",
    
    setup() {

    },
  });
</script>

<style scoped>
  .home{
    margin: 20px;
  }
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

  .advantages, .languages, .students, .subscribe, .bottonsRegister{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .advantage, .student{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 20%;
  }

  .icon{
    width: 10%;
  }
  .flagIcon{
    width: 10%;
    margin: 10px;
  }
  .studentImg {
    width:70%;
    /* height:300px; */
    border-radius:150px;
  }
  h4{
    font-style: italic;
  }

  input.form-style{
    color:#8a8a8a;
    display: block;
    height: 44px;
    padding: 5px 5%;
    margin: 10px;
    border:1px solid #ccc;
    -moz-border-radius: 27px;
    -webkit-border-radius: 27px;
    border-radius: 27px;
    -moz-background-clip: padding;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    background-color: #fff;
    font-family:'HelveticaNeue','Arial', sans-serif;
    font-size: 105%;
    letter-spacing: .8px;
  }

  .form-style:focus{
    outline: none; 
    border:1px solid #58bff6; 
    color:#58bff6; 
  }

  .subscribeButton, .registerButton{
    float:right;
    width: 60%;
    height: 55px;
    margin: 10px;
    -moz-border-radius: 19px;
    -webkit-border-radius: 19px;
    border-radius: 27px;
    -moz-background-clip: padding;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    background-color: #55b1df;
    border:1px solid #55b1df;
    border:none;
    color: #fff;
    font-weight: bold;
  }
  .registerButton:hover, .subscribeButton:hover{
    background-color: #fff; 
    border:1px solid #55b1df; 
    color:#55b1df; 
    cursor:pointer;
  }
  .registerButton:focus, .subscribeButton:focus{
    outline: none;
  }

.routerlink{
  text-decoration: none;
  color:#104b68;
}
</style>
