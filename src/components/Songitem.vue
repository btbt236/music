<template lang="">
      <div id="songs" @click="$emit('updatesong',item); $emit('playandpause')">
    <div >
        <h5>{{item.name}}</h5>
        <p><span v-for="(item,index) in item.song.artists" :key="index">
            <template v-if="index"> / </template>
            {{item.name}}
            </span>- {{item.song.album.name}}</p>  
          </div>
            <div class="listen">
             <span  class="play"></span>
           
         </div>
             
   
    </div>
</template>
<script>
export default {
  props: ["item"],
  created(){
    //    console.log(this.item);
  },
  methods: {
      playandpause:function(){
         console.log(111);
      }
  },
};
</script>
<style scoped lang="less">
#songs{
    display: flex;
    div{
        flex: 1 1 auto;
   p{
      width: 86vw;
      margin: 0;
      padding: 0;
      // display: inline;
       font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
   //  white-space: nowrap;
    word-break: normal;
    font-weight: lighter;
-webkit-box-orient: vertical;
white-space: nowrap;

   }
   h5{
       margin: 0;
    //    margin-bottom: 5px;
    //    font-size: 15px;
      font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
    font-weight: lighter;
    -webkit-box-orient: vertical;
    white-space: nowrap;
    width: 86vw;
   }
   
    }
      .listen{
         flex: 0 1 auto;
      .play{
         // display: inline-block;
       width: 22px;
       height: 22px;
    //    border-radius: 50%;
    //    border: 1px solid #ccc;
       text-align: center;
    //    float: right;
       line-height: 20px;
      margin: 9px 0;
      color: #ccc;
      font-size: 12px;
      background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=) no-repeat;
      background-size: 166px 97px;
      background-position: -24px 0;
      float: left;
   }
   
   .pause{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
   }
    
      }  
}
</style>