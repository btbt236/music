<template>
  <div>
    <div
      class="big"
      :style="{
            backgroundImage: `url(${newplaylist.coverImgUrl})
            `
            ,
          }"
    ></div>
    <ul class="playcontent">
      <li >
        <img :src="newplaylist.coverImgUrl" alt />
        <span>🎧{{newplaylist.playCount |formatPlayCount}}</span>
      </li>
      <li>
        <div>{{newplaylist.name}}</div>
        <div class="zh">
          <img :src="newplaylist.creator.avatarUrl" />
          <span>{{newplaylist.creator.nickname}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["newplaylist"],
  created() {
    // console.log(this.newplaylist);
  },
  filters: {
    formatPlayCount(value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>
<style  lang="less">
.playcontent {
  width: 100vw;
  height: 30vh;
  box-shadow: 4px -15px 32px #000000;
  // background-color: red;
  display: flex;
  // justify-content: space-around;
  color: white;
  li {
    flex: 1 1 auto;
    margin: 5vh 5vw;
    width: 31vw;
  }
  li:nth-child(1) {
    position: relative;
    img {
      width: 100vw;
      // height: 100v;
    }
    span {
      position: absolute;
      left: 25vw;
      top: 0;
      font-size: 12px;
      background-position: 0;
      background-repeat: no-repeat;
      background-size: 11px 10px;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
    }
  }
  li:nth-child(2) {
    font-size: 16px;
    .zh {
      margin-top: 20px;
      // line-height: 30px;
      color: #999;
      position: relative;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      span {
        word-break:break-all
        // margin-bottom:1px;
      }
    }
  }
}
.big {
  background-size: cover;
    background-position: center;
  width: 100%;
  height: 20%;
    position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
    filter: blur(30px) brightness(0.5);
}
</style>