<template >
  <div id="play">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div @click="isShowPlayBar = false">
        <audio
          ref="audio"
          :src="
            'https://music.163.com/song/media/outer/url?id=' +
            currentMusic.id +
            '.mp3'
          "
          autoplay
        ></audio>
        <div v-show="isShowPlayBar" class="playitem">
          <img :src="currentMusic.picUrl" ref="img" />
          <li>{{ currentMusic.name }}</li>
          <li style="float；left" @click.stop="togglePlayState">点击播放</li>
        </div>
      </div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="play-full" v-show="!isShowPlayBar">
        <PlayFullHeader @Showplaybar="isShowPlayBar = true"></PlayFullHeader>
        <PlayFullChart></PlayFullChart>
        <PlayFullFooter></PlayFullFooter>
        <PlayFullLyric></PlayFullLyric>
      </div>
    </transition>
  </div>
</template>
<script>
import PlayFullHeader from "@/components/PlayFullHeader.vue";
import PlayFullChart from "@/components/PlayFullChart.vue";
import PlayFullLyric from "@/components/PlayFullLyric.vue";
import PlayFullFooter from "@/components/PlayFullFooter.vue";
export default {
  components: {
    PlayFullHeader,
    PlayFullChart,
    PlayFullLyric,
    PlayFullFooter,
  },
  props: ["currentMusic"],
  data: function () {
    return {
      isShowLyric: false,
      isShowPlayBar: true,
      paused: false,
    };
  },
  mounted: function () {
    // console.log(111);
    // this.drawCircle(this.currentTime);
  },
  methods: {
    drawCircle: function (n, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.arc(25, 25, 20, 0, Math.PI * 2, false); // 绘制
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
      ctx.arc(
        25,
        25,
        19,
        Math.PI * -0.5,
        Math.PI * ((n / total) * 2 - 0.5),
        false
      ); // 绘制
      ctx.stroke();
      ctx.closePath();
    },
    togglePlayState: function () {
      let audio = this.$refs.audio;
      let img = this.$refs.img;
      if (this.paused) {
        console.log(this.paused);
        audio.pause();
        img.classList.add("changecover");
        this.paused = false;
      } else {    
        // console.log(img);
        console.log(this.paused);
        audio.play();
        img.classList.remove("changecover");
        this.paused = true;
      }
     
    },
  },
};
</script>
<style scpoed lang="less">
#play {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 334;
  .playitem {
    width: 100%;
    justify-content: space-between;
    height: 40px;
    border: 1px solid #000;
    background-color: #f00;
    display: flex;
    flex: 0 1 auto;
    .changecover {
animation-play-state:paused;
-webkit-animation-play-state:paused;
}
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      animation: playing 6s linear infinite;
      // animation-play-state: running;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    }
    li {
      margin: 0;
      padding: 0;
      list-style: none;
      margin-right: 2px;
    }
  }
  .play-full {
    background: rgba(255, 0, 0, 1);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
}

@keyframes playing {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>