<template >
  <div id="search">
    <div class="searchbox">
      <canvas ref="canvas" width="19x" height="19px"></canvas>
      <input
        @keydown.enter="$emit('search',searchcontent);"
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model="searchcontent"
        @input="$emit('searchlist',searchcontent);$emit('clearsong')"
      />
       <span class="searchdel" @click="$emit('clear',searchcontent); searchcontent='';">✖</span>
    </div>
    <div v-show=" !searchcontent && !newsearch[1]" clas4s="hot"  >
      <ul v-for="(item,index) in newhot" :key="index">
        <li @click="$emit('search',item);searchcontent=item">{{item}}</li> 
      </ul>
      
    </div>
     <div v-show=" searchcontent && !newsearch[1] " class="think"  v-for="(item) in newthink" :key="item.id"  >
      <li @click="searchcontent=item;$emit('search',item);">{{item}}</li> 
    </div>
        
  </div>
</template>
<script>
export default {
  props:["newhot","newthink","newsearch"],
  data() {
    return {
      searchcontent:""
    }
  },
  mounted() {
    var canvas = this.$refs.canvas;
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.clearRect(0, 0, 19, 19);
    ctx.arc(9, 9, 8, 0.37 * Math.PI, 2.27 * Math.PI, false);
    ctx.lineTo(19, 19);
    ctx.stroke();
  },
  updated(){
// console.log(this.searchcontent);
  },
  methods: {
  
  },
};
</script>
<style lang="less">
#search {
     width: 100%;
    height: 40px;
    margin: 20px 0 ;
    font-size: 16px;
    background-color: #ebecec;
    border-radius: 30px;
    outline: none;
    border: none;
  .searchbox {
    position: relative;
    input {
      width: 90%;
      margin-left: 6vw;
      margin-bottom: 20px;
      line-height: 40px;
      outline: none;
      border: none;
      background-color: rgb(235, 236, 236);
      //   margin: 0;
      padding: 0;
      //   border-radius: 20px;
    }
    canvas {
      position: absolute;
      left: 0%;
      top: 11px;
    }
  }
}
.searchdel{
  position: absolute;
    top: 8px;
    right: 8px;
}
.hot{
    display: flex;
    flex-wrap: wrap;
    li{

    border-radius: 20px;
    text-decoration: none;
    list-style: none;
    flex: 0 1 auto;
    padding: 5px 10px;
    margin: 5px 5px;
    background-color: rgb(243,243,243);
  }
 
}
.think{
  list-style: none;
    border-bottom: 1px #eee solid;

  font-size: 25px;
  // color: #ccc;
  margin-left:10px ;
  margin-top: 5px;
}
</style>