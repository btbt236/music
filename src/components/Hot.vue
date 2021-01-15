<template >
  <div id="hot">
    <div class="hotcontent"></div>
    <div class="data">更新日期：{{nowtime}}</div>
  </div>
</template>
<script>
export default {
  props: ["nowtime"],
};
</script>
<style lang="less">
#hot {
  width: 100%;
  height: 128px;
  // background-color: #00f;
  background: url("../assets/assets/hotback.jpg");
  .hotcontent {
    width: 142px;
    height: 67px;
    // background-color: #00f;
    background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)
      no-repeat;
    background-size: 166px 97px;
    background-position: -22px -30px;
    margin-left: 20px;
  }
  .data{
      color: white;
      margin-left:20px;
      font-size: 12px;
      
  }
}
</style>