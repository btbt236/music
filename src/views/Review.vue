<template lang="">
    <div id="review">
          <Reviewnewmemu :arr="arr" :a="123"></Reviewnewmemu>
          <Reviewsongs :newSongs="newSongs" @updatesong="$emit('updatesong',$event)"></Reviewsongs>
    </div>
</template>
<script>
import Reviewnewmemu from "@/components/Reviewnewmemu.vue";
import Reviewsongs from "@/components/Reviewsongs.vue";
export default {
         components:{
           Reviewnewmemu,
           Reviewsongs
          },
    data() {
        return {
            menucontent:[],
            newSongs:[],
        }
    },
    computed:{
      arr:function () {  
          return  this.menucontent.slice(0,6) 
      },

    },
    created() {
    //    console.log(123);
       this.axios.get("/personalized").then((response) => {
        //    console.log(response.data.result);
           this.menucontent = response.data.result;
        //    console.log(this.arr);
       });
       this.axios.get("/personalized/newsong").then((response) => {
      // console.log(response.data.result);
      this.newSongs = response.data.result;
      // console.log(this.newSongs);
    });
 },
}
</script>
<style lang="">
    
</style>