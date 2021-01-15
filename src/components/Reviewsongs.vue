<template lang="">
    <div>
        <Bordertitle>最新音乐</Bordertitle>
        <Songitem  
        v-for="(song,index) in newSongs" 
        :key="index"
         :item="song"
         :index ="index"
          @updatesong="$emit('updatesong',$event)" 
            @updatesongitem="$emit('updatesongitem',newSongs)"
            :currentMusic="currentMusic"
            :currentid="currentid"
            @gotoid="gotoid"
           @updatecurrentid= "$emit('updatecurrentid')"
            ></Songitem>
    </div>
</template>
<script>
import Bordertitle from "@/components/Bordertitle.vue";
import Songitem from "@/components/Songitem.vue";

export default {
  components: {
    Bordertitle,
    Songitem,
  },
  props: ["newSongs","currentMusic","currentid"],
  data() {
    return {
    
    }
  },
  methods: {
    gotoid(){
    // this.currentid=this.currentMusic.id
    // console.log(this.currentid);
    console.log(111);
  }
  },
  
};
</script>
<style lang="">
</style>