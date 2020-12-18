<template lang="">
  <div id="reviewmenu" >
     <Bordertitle>推荐歌单</Bordertitle> 
     <ul>
        <li v-for="(item,index) in arr" :key="index" @click="gotosonglist(item.id)">
       <img :src="item.picUrl" alt=""> 
       <span>🎧{{item.playCount |formatPlayCount}}</span>
        <h6>{{item.name}}</h6>
   </li>
    </ul>
     </div>
</template>
<script>
import Bordertitle from "@/components/Bordertitle.vue";
// import func from '../../vue-temp/vue-editor-bridge';
export default {
  props: ["arr"],
  components: {
    Bordertitle,
  },
  created: function () {
    // console.log(this.arr);
  },
  filters:{
   formatPlayCount(value){
       return (value / 10000).toFixed(1) + "万";
   }
  },
  methods: {
    gotosonglist:function(id){
      this.$router.push({
        path: "/playlist",
        query: {
          id,
        },
      });
    }
  },
};
</script>
<style lang="less" scoped>
#reviewmenu{
ul {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    // float: left;
    //  flex-direction: row;
    width: 31vw;
    position: relative;
    img {
      width: 100%;
    }
    span {
     
      position: absolute;
    right: 5px;
    top: 2px;
    z-index: 3;
    padding-left: 13px;
    color: #fff;
    font-size: 12px;
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 11px 10px;
    text-shadow: 1px 0 0 rgba(0,0,0,.15);
    }
    h6 {
      // display: inline-block;
       display: -webkit-box;
      -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
      font-size: 13px;
      padding: 0;
      margin: 0;
      padding: 1px 2px 3px 6px;
      font-weight: 400;
      overflow: hidden;

    }
  }
}
}

</style>
