<template>
  <div class="play-full-footer">
    <span class="time">{{usetime(this.currentTime)}}</span>
    <div class="progress">
      <input type="range" min="0" :max="duration" step="1" @input="getValue" :value="currentTime" />
      <span :style="{ width: (currentTime / duration) * 100 + '%' }"></span>
    </div>
    <span class="time">{{usetime(this.duration)}}</span>
    <br />
    <ul class="content">
      <!-- @/assets/assets/radom.png -->
      <li>
        <img src="@/assets/assets/radom.png" alt />
      </li>
      <li @click="$emit('prev')">
        <img src="@/assets/assets/prevbtn.png" alt />
      </li>
      <li v-if="paused" @click="$emit('pauses')">
        <img src="@/assets/assets/run.png" alt />
      </li>
      <li v-else @click="$emit('pauses')">
        <img src="@/assets/assets/stop.png" alt />
      </li>
      <li @click="$emit('next')">
        <img src="@/assets/assets/nextbtn.png" alt />
      </li>
      <li @click="$emit('gedan')">
        <img src="@/assets/assets/lists.png" alt />
      </li>
    </ul>
    <div @click="$emit('gedan')"  v-show="list" class="bigsit">
    <div  class="sit">
      <Songitem 
      v-for="(song,index) in newSongs"
      :key="index"
      :item="song"
      :index="index"
      @updatesong="$emit('updatesong',$event)"
      @updatesongitem="$emit('updatesongitem',newSongs)"
      :currentMusic="currentMusic"
      :currentid="currentid"
      @updatecurrentid="$emit('updatecurrentid')"
    ></Songitem>
    </div>
    </div>
  </div>
</template>

<script>
import Songitem from "@/components/Songitem.vue";
export default {
  props: ["currentTime", "duration", "paused","list","newSongs","currentMusic","currentid"],
  components: {
    Songitem,
  },
  data: function () {
    return {
      a: 1,
    };
  },
  methods: {
    getValue: function (e) {
      // console.log(e.target.value);
      // console.log(this.currentTime);
      this.$emit("update:currentTime", e.target.value);
    },
    usetime(asd) {
      // console.log(123);
      // console.log(this.currentTime)
      let newtime = Math.floor(asd);
      let newsec;
      let newmin;
      if (newtime >= 60) {
        newmin = "0" + Math.floor(newtime / 60);
        newsec = Math.floor(newtime - newmin * 60);
      } else {
        newmin = "00";
        newsec = newtime;
      }
      if (newsec < 10) {
        newsec = "0" + newsec;
      }
      if (newmin >= 10) {
        newmin = Math.floor(newtime / 60);
      }

      return newmin + ":" + newsec;
    },
  },
};
</script>

<style lang="less">
.play-full-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 50px;

  .progress {
    display: inline-block;
    width: 75%;
    height: 6px;
    background: black;
    position: relative;
    top: 0;
    left: 0;
    // margin: 0 auto;
    margin-left: 10px;
    border-radius: 3px;
    input {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      opacity: 0;
    }
    span {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background: #ccc;
      border-radius: 3px;
    }
  }
  .time {
    color: white;
    font-size: 12px;
  }
  .content {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    // align-items:center
    li {
      width: 30px;
      flex: 0 1 auto;
      // flex-wrap: no;
    }
  }
  .content:nth-child(3) {
    width: 50px;
  }
}
.bigsit{
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  opacity: 0.7;
.sit{
  z-index: 9999;
  background-color: gray;
  opacity: 0.9;
  height: 50vh;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  width: 100vw;
overflow: auto;
}
}
</style>