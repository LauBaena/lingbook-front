<template>
    <MqResponsive :target="['xl', 'xxl']">
        <div class="header">
            <div>
                <img class="logo" src="@/assets/logoNegre.png" @click="handleRedirectSelector"/>
            </div>
            <div class="links">
                <a class="pull-left">
                    <router-link :to="{ name: 'about' }">Sobre nosaltres</router-link>
                </a>
                <a class="pull-left">
                    <router-link :to="{ name: 'login' }">Entra</router-link>
                </a>
                <a class="pull-left">
                    <router-link :to="{ name: 'home' }"><img class="flagIcon" src="../assets/catalan_icon.png" style="width: 50px" title="Catalan" alt="catalanFlag"></router-link>
                    <router-link :to="{ name: 'home' }"><img class="flagIcon" src="../assets/spanish_icon.png" style="width: 50px" title="Spanish" alt="spanishFlag"></router-link>
                    <router-link :to="{ name: 'home' }"><img class="flagIcon" src="../assets/english_icon.png" style="width: 50px" title="English" alt="englishFlag"></router-link>
                    <router-link :to="{ name: 'home' }"><img class="flagIcon" src="../assets/french_icon.png" style="width: 50px" title="French" alt="frenchFlag"></router-link>
                </a>
            </div>
        </div>
    </MqResponsive>

    <MqResponsive :target="['xs', 'sm', 'md', 'lg']">
        <div class="header">
            <div>
                <img class="logo" src="@/assets/logoNegre.png" @click="handleRedirectSelector"/>
            </div>
        </div>

        <div>
            <VueMultiselect class="multivue"
                    v-model="selected"
                    :options="options"
            >
            </VueMultiselect>
        </div>

    </MqResponsive>

</template>

<script>
import {onMounted, defineComponent} from "vue";
import {MqResponsive} from "vue3-mq";
import {updateBreakpoints} from "vue3-mq";
import {useRouter} from "vue-router";
import VueMultiselect from 'vue-multiselect'

export default defineComponent({
    name: "publicNavbar",
    components: {MqResponsive, VueMultiselect},

    data () {
      return {
          selected: null,
          options: ['About', 'Login', 'Català']
      }
    },

    setup() {
        onMounted(() => {
            updateBreakpoints({
                preset: "bootstrap5"
            })
        })

        const router = useRouter();

        const handleRedirectSelector = () => {
            return router.push("/");
        };
        return {
            handleRedirectSelector,
        };

        //const languages = "";
        //if( == true){
        //
        //}

    }
})
</script>


<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.logo {
    cursor: pointer;
    /* width: 350px; */
    width: 35%;
    margin: 40px;
}

a {
    font-size: 24px !important;
    color: #58bff6;
    text-decoration: none;
    padding-right: 40px;
    /* margin-left: 30px; */
}

a:hover {
    Color: #aaa;
}

.links {
    display: flex;
    align-items: center;
    margin: 40px;
    padding: 0;
}

.links a {
    margin-right: 20px;
    font-size: 18px;
}

.multivue {
    width: 40%;
}

</style>
