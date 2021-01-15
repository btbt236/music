<template >
  <div>
    <Playlistitem :newplaylist="newplaylist"></Playlistitem>
    <Songitem
      v-for="(item,index) in newplaysongs"
      :item="item"
      :index="index"
      :key="index"
      @updatesong="$emit('updatesong',$event)"
      @playandpause="$emit('playandpause')"
      @updatesongitem="$emit('updatesongitem',newplaysongs)"
      :currentid="currentid"
      @updatecurrentid="$emit('updatecurrentid')"
    ></Songitem>
  </div>
</template>
<script>
import Songitem from "../components/Songitem.vue";
import Playlistitem from "../components/Playlistitem.vue";
export default {
  props: ["newSongs","currentMusic","currentid"],
  components: { Playlistitem, Songitem },
  data() {
    return {
      newplaylist: [],
      newplayitem: [],
      newplaysongs: [],
    };
  },
  created() {
    // console.log(this.$route.query.id);
    this.axios
      .get("/playlist/detail?id=" + this.$route.query.id)
      .then((response) => {
        //   console.log(response.data.playlist);
        this.newplaylist = response.data.playlist;
        // console.log(this.newplaylist);
        response.data.playlist.trackIds.forEach((a) => {
          //  console.log(a.id);
          this.newplayitem.push(a.id);
          // console.log(this.newplayitem);
        });
        this.axios
          .get("song/detail?ids=" + this.newplayitem)
          .then((response) => {
            // console.log(response.data.songs);
            // this.newplaylist = response.data.songs
            // console.log(this.newplaylist);
            response.data.songs.forEach((v, i) => {
            // console.log(response.data.songs);

              this.newplaysongs.push({
                name: v.name,
                song: {
                  artists: [
                    {
                      name: v.ar[0].name,
                    },
                  ],
                  album: {
                    name: v.al.name,
                  },
                },
                id: v.id,
                picUrl: "",
              });
              console.log(this.newplaysongs);
              this.axios.get("song/detail?ids=" + v.id).then((response) => {
                // console.log(response.data.songs);
                this.newplaysongs[i].picUrl = response.data.songs[0].al.picUrl;
                // console.log(this.newsearch);
              });
            });
          });
      });
  },
};
</script>
<style lang="less">
</style>