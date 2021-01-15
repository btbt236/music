<template>
  <div class="home">
    <Hot :nowtime="nowtime"></Hot>

    <Songitem v-for="(item,index) in newhotsong"  :key="index" :item="item"
         :index ="index" 
          @updatesong="$emit('updatesong',$event)"
          @playandpause="$emit('playandpause')"
            @updatesongitem="$emit('updatesongitem',newhotsong)"
            :currentMusic="currentMusic"
             :currentid="currentid"
      @updatecurrentid="$emit('updatecurrentid')"
         >
   </songitem>
    <!-- <Hotsongitem v-for="(item,index) in hotsong" :key="index"></Hotsongitem> -->
  </div>
</template>

<script>
import Songitem from "@/components/Songitem.vue";
import Hot from "@/components/Hot.vue";
// import Hotsongitem from "@/components/Hotsongitem.vue";

export default {
  props: ["newSongs","currentMusic","currentid"],
  components: {
     Songitem,
    Hot,
    // Hotsongitem,
  },
  data() {
    return {
      nowtime: "",
      beforehotsong: [],
      hotsong: [],
      newhotsong: [],
    };
  },
  created() {
    this.axios.get("/top/list?idx=1").then((response) => {
      //  console.log(response.data.playlist.updateTime);
      this.nowtime = new Date(response.data.playlist.updateTime)
        .toString()
        .slice(4, 10);
      // console.log(this.nowtime);
      this.beforehotsong = response.data.playlist.trackIds
        .map((item) => {
          return item.id;
        })
        .join(",");
      // console.log(this.beforehotsong);
      this.$axios
        .get("/song/detail?ids=" + this.beforehotsong)
        .then((response) => {
          //  console.log(this.beforehotsong);
          //  console.log(response);
          this.hotsong = response.data.songs;
          // console.log(response.data.songs);
          this.newhotsong = [];
          this.hotsong.__proto__ = Array.prototype;
          response.data.songs.slice(0,20).forEach((v) => {    
              this.newhotsong.push({
              name: v.name,
              song:{
                artists:[{ 
                  name:v.ar[0].name
                }],
                album:{
                  name:v.al.name
                },
              } ,
                id:v.id,
                picUrl:v.al.picUrl
            });
          });
          // console.log(this.newhotsong);
        });
    });
  },
};
</script>
<style lang="less">

</style>
