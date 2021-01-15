<template >
  <div id="pla">
    <audio
      ref="audio"
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      autoplay
      @playing="playing"
    ></audio>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div @click="isShowPlayBar = false">
        <div class="playitem">
          <img :src="currentMusic.picUrl" ref="img" />
          <li>{{ currentMusic.name }}-{{ currentMusic.song.artists[0].name }}</li>
          <canvas ref="circle" width="50" height="50"></canvas>
          <span @click.stop="togglePlayState" v-show="paused" class="bofang"></span>
          <span @click.stop="togglePlayState" v-show="!paused" class="zanting"></span>
        </div>
      </div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="play-full" v-show="!isShowPlayBar">
        <div class="mask" :style="{backgroundImage: `url('${currentMusic.picUrl}')`}"></div>
        <PlayFullHeader @Showplaybar="isShowPlayBar = true" :currentMusic="currentMusic"></PlayFullHeader>
        <PlayFullChart
          v-show="isShowLyric"
          @toggle-show-lyric="isShowLyric = !isShowLyric"
          :newgeci="newgeci"
          :audio="this.$refs.audio"
          :currentTime="currentTime"
          :currentMusic="currentMusic"
        ></PlayFullChart>
        <PlayFullLyric
          v-show="!isShowLyric"
          @toggle-show-lyric="isShowLyric = !isShowLyric"
          :currentMusic="currentMusic"
          :paused="paused"
          :audio="this.$refs.audio"
        ></PlayFullLyric>
        <PlayFullFooter
          :currentTime="currentTime"
          :duration="duration"
          @update:currentTime="$refs.audio.currentTime = $event"
          @pauses="togglePlayState"
          @next="playNext"
          @prev="playprev"
          :paused="paused"
          @goto="goto"
          @gedan="gedan"
          :newSongs="newSongs"
          @updatesong="$emit('updatesong',$event)"
          @updatesongitem="$emit('updatesongitem',$event) "
          :currentMusic="currentMusic"
          @playandpause="$emit('playandpause')"
          :currentid="currentid"
          :list="list"
        ></PlayFullFooter>
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

  props: ["currentMusic", "newSongs", "currentIndex", "newgeci","currentid"],
  data: function () {
    return {
      isShowLyric: false,
      isShowPlayBar: true,
      paused: false,
      duration: 0,
      currentTime: 0,
      a: "",
      list: false,
    };
  },
  computed: {
    goto(a) {
      a++;
      // let b = a%2
      // console.log(b);
      // console.log(b);
      return a;
    },
  },
  mounted() {
    // console.log(this.currentMusic);
    // console.log(this.newSongs.length);
    // this.currentid = this.currentMusic.id;
    // console.log(this.currentid);
    let audio = this.$refs.audio;
    // console.log(this.$refs.audio);
    // console.log(this.currentMusic);
    audio.addEventListener("durationchange", () => {
      this.duration = audio.duration;
      // console.log("当前歌曲时长", this.duration);
    });
    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      // console.log("当前播放到", this.currentTime);
      this.drawCircle(this.currentTime, this.duration);
    });
    audio.addEventListener("ended", () => {
      // 播放完成下一曲
      this.playNext();
    });
  },
  watch: {},
  methods: {
    drawCircle: function (n, total) {
      var canvas = this.$refs.circle;
      // console.log("canvas", canvas);
      if (canvas) {
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
      }
    },
    togglePlayState: function () {
      let audio = this.$refs.audio;
      let img = this.$refs.img;
      // console.log(audio.paused);
      if (audio.paused) {
        // console.log(this.paused);
        audio.play();
        this.paused = false;
        img.classList.remove("changecover");
      } else {
        audio.pause();
        // console.log(img);
        this.paused = true;
        img.classList.add("changecover");
        // console.log(audio.paused);
      }
    },
    calculateNext: function () {
      let nextIndex;
      if (this.currentIndex < this.newSongs.length - 1) {
        nextIndex = this.currentIndex + 1;
      } else {
        nextIndex = 0;
      }
      return nextIndex;
    },
    playNext: function () {
      // console.log("下一曲");
      // console.log(currentIndex);
      let img = this.$refs.img;
      let index = this.calculateNext();
      this.paused = false;
      // console.log(this.newSongs[2]);
      this.$emit("updatesong", {
        item: this.newSongs[index],
        index,
      });
      img.classList.remove("changecover");
    },
    calculateprev: function () {
      let prevIndex;
      if (this.currentIndex > 0) {
        prevIndex = this.currentIndex - 1;
      } else {
        prevIndex = this.newSongs.length - 1;
      }
      return prevIndex;
    },
    playprev: function () {
      let img = this.$refs.img;

      // console.log("下一曲");
      // console.log(currentIndex);
      let index = this.calculateprev();
      // console.log(this.newSongs[2]);
      this.$emit("updatesong", {
        item: this.newSongs[index],
        index,
      });
      this.paused = false;
      img.classList.remove("changecover");
    },
    playing() {
      if (this.paused == true) {
        let img = this.$refs.img;
        console.log(this.paused);
        this.paused = false;
        img.classList.remove("changecover");
      }
    },
    gedan() {
      this.list = !this.list;
      console.log(this.list);
    },
  },
};
</script>
<style scpoed lang="less">
#pla {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 334;
  .playitem {
    width: 100%;
    justify-content: space-between;
    height: 40px;
    // border: 1px solid #000;
    background-color: white;
    display: flex;
    flex: 0 1 auto;
    z-index: 22;
    .changecover {
      animation-play-state: paused;
      -webkit-animation-play-state: paused;
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
      overflow: hidden;
      // line-clamp: ;
      // box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-clamp: 2;
    }
    span {
      position: absolute;
      right: 10px;
      top: 6px;
      width: 30px;
      height: 30px;
    }
    .bofang {
      background-image: url("../assets/assets/play.png");
      background-size: 100% 100%;
    }
    .zanting {
      background-image: url("../assets/assets/pause.png");
      background-size: 100% 100%;
    }
  }
  .play-full {
    background: #ccc;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
}
.mask {
  background: url("http://p1.music.126.net/fwXShM46KdIj3hB8_lJ71g==/109951165545588869.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: blur(30px) brightness(0.5);
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