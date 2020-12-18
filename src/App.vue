<template>
  <div id="app">
    <Home />
    <Play :currentMusic="currentMusic"/>
    <router-view @updatesong="currentMusic =$event" />
  </div>
</template>

<script>
import Home from "@/components/Home.vue";
import Play from "@/components/Play.vue";
export default {
    components:{
      Home,
    Play
    },
    data:function(){
      return{
        currentMusic:null
      }
    }
}
</script>
<style>

</style>
