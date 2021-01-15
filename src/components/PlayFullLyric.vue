<template >
        <div   @click="$emit('toggle-show-lyric')">
       <img :src="currentMusic.picUrl" alt="" ref="asd" class="content ">
       
            </div>

</template>
<script src="https://cdn.bootcss.com/jquery/1.8.1/jquery.js"></script>
<script>
export default {
    props:["currentMusic","paused","audio"],
   
     watch:{
       paused(n){
          let asd =this.$refs.asd
      //  console.log(asd);
       if(n){
          // console.log(this.paused);
          asd.classList.add("changecover");   
        // this.paused = false;
        }else{
          asd.classList.remove("changecover");
          // console.log(this.paused);
        // this.paused = true;
       }
       }
     },
     methods: {
      
     },
    }  

</script>
<style scoped lang="less">
div{
  width: 70%;
  margin: 0 auto;
  height: 60%;
  box-sizing: content-box;
  position: relative;
       .content{    
          //  height: 300px;
      border-radius: 50%;
      animation: playing 6s linear infinite;
      // animation-play-state: running;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
        margin: 0 auto;
           width: 200px;
                position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
         }   
         .black{
         position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
         }
}
    
    .big{
      width: 200px;
      height: 100px;
      position: absolute;
    }
@keyframes playing {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
  .changecover {
      animation-play-state: paused !important;
      -webkit-animation-play-state: paused;
    }   
</style>