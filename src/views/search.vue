<template  >
  <div id="search">
    <Searchbox
      @search="asd"
      @searchlist="searchlist"
      @clear="clear"
      :newthink="newthink"
      :newsearch="newsearch"
      :newhot="newhot"
      @clearsong="clearsong"
    ></Searchbox>
    <Songitem
      v-for="(item,index) in newsearch"
      :item="item"
      :index="index"
      :key="index"
      @updatesong="$emit('updatesong',$event)"
      @playandpause="$emit('playandpause')"
      @updatesongitem="$emit('updatesongitem',newsearch)"
      :currentMusic="currentMusic"
      :currentid="currentid"
      @updatecurrentid="$emit('updatecurrentid')"
    ></Songitem>
  </div>
</template>
<script>
import Searchbox from "@/components/Searchbox.vue";
import Songitem from "@/components/Songitem.vue";
export default {
  props: ["newSongs", "currentMusic", "searchcontent", "currentid","Songitem"],
  components: {
    Searchbox,
    Songitem,
  },
  data() {
    return {
      newsearch: [],
      timer: null,
      newhot: [],
      newthink:[]
    };
  },
  created() {
    this.axios.get("/search/hot").then((response) => {
      //  console.log(response.data.result.hots);
      response.data.result.hots.forEach((v) => {
        this.newhot.push(v.first);
      });
      //  console.log(this.newhot);
    });
  },
  methods: {
    asd: function (searchcontent) {
      if(searchcontent===""){
        this.newthink=[]
      }
      this.axios.get("/search?keywords=" + searchcontent).then((response) => {
        // console.log(response);
        this.newsearch = [];
        // this.newsearch =response.data.result.songs
        response.data.result.songs.forEach((v, i) => {
          this.newsearch.push({
            name: v.name,
            song: {
              artists: [
                {
                  name: v.artists[0].name,
                },
              ],
              album: {
                name: v.album.name,
              },
            },
            id: v.id,
            picUrl: "",
          });
          this.axios.get("song/detail?ids=" + v.id).then((response) => {
            // console.log(response.data.songs);
            this.newsearch[i].picUrl = response.data.songs[0].al.picUrl;
            // console.log(this.newsearch);
          });
        });
      });
    },
    searchlist(a) {
      // console.log(a);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.axios
          .get(
            "/search/suggest?keywords=" + a + "&type=mobile"
          )
          .then((response) => {
            this.newthink = [];
            //  console.log(response.data.result.allMatch);
            //  console.log(this.newhot);
            // console.log(response);
            response.data.result.allMatch.forEach((v)=>{
              // console.log(v.keyword);
              this.newthink.push(v.keyword)
              console.log(this.newthink);
            })
          });
      }, 1000);
    },
    clear: function () {
      this.newsearch = [];
    },
      clearsong(){
      // console.log(111);
      this.newsearch=[];
   
    }
  },
};
</script>
<style lang="less">
</style>
