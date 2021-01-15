<template  >
    <div @click="$emit('Showplaybar')" id="playhead">
       <div class="goback"></div>
      <div class="lyrics">{{ currentMusic.name }}</div>   
      <div class="author">{{ currentMusic.song.artists[0].name }}></div>        
    </div>
</template>
<script>
export default {
    props:["currentMusic"]
}
</script>
<style lang="less">
    #playhead{
        margin-top: 20px;
        margin-bottom:10vh;
        text-align: center;
        color: white;
        .lyrics{
    overflow:hidden;
	text-overflow:ellipsis;
  white-space:nowrap;
  line-clamp: 2;
        }
        .author{
            color: #ada2a0;
        }
     
    }
</style>