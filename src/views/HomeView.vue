<template>
  <div class="home">
    <SectionRegister/>
    <SectionAdvantages/>
    <SectionLanguages/>
    <SectionOpinions/>
    <SectionSubscription/>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import SectionRegister from "@/components/SectionRegister.vue";    
  import SectionLanguages from "@/components/SectionLanguages.vue";
  import SectionOpinions from "@/components/SectionOpinions.vue";
  import SectionAdvantages from "@/components/SectionAdvantages.vue";
  import SectionSubscription from "@/components/SectionSubscription.vue";

  export default defineComponent({
    name: "HomeView",
    components:{
      SectionRegister,
      SectionLanguages,
      SectionOpinions,
      SectionAdvantages,
      SectionSubscription
    },
    setup() {
    },
  });
</script>

<style scoped>
  .home{
    margin: 20px;
  }
</style>
