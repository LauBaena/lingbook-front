<template>
    <div class="section">
        <h1>Vols estar al corrent de les novetats? Apunta't!</h1>
        <p class="sectionText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quia ipsam voluptatum accusantium recusandae eos necessitatibus quam earum dolore amet fugiat repudiandae minus, saepe, itaque vel pariatur sit nam suscipit.</p>
        <form class="subscribe">
            <input type="email" placeholder="Adreça electrònica" class="form-style" name="email" id="inputEmail">
            <input type="text" placeholder="Nom i cognoms" class="form-style" name="name" id="inputName">
            <input type="submit" class="subscribeButton" value="Subscriu-te">
        </form>
    </div>
</template>

<script>
    import { defineComponent } from "vue";
            
    export default defineComponent({
        name: "SectionSubscription",
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
    .subscribe{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
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
    .subscribeButton{
        float:right;
        width: 60vw;
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
    .subscribeButton:hover{
        background-color: #fff; 
        border:1px solid #55b1df; 
        color:#55b1df; 
        cursor:pointer;
    }
    .subscribeButton:focus{
        outline: none;
    }

    @media screen and (max-width: 1699px){
        .subscribe{
            display: flex;
            flex-wrap: wrap;

        }

        input.form-style{
            width: 50vw;
        }

        .subscribeButton{
            width: 60vw;

        }
    }

</style>