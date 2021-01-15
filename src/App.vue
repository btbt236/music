<template>
  <div id="app">
    <Home v-if="$route.meta.isShowNav" :currentid="currentid" />
    <Play
      v-if="currentMusic"
      :currentMusic="currentMusic"
      :newSongs="newSongs"
      :paused="paused"
      :currentIndex="currentIndex"
      @updatesong="currentMusic = $event.item;
      currentIndex = $event.index"
      :newgeci="newgeci"
      :currentid="currentid"
    />

    <router-view
      @updatesong="currentMusic = $event.item;
      currentIndex = $event.index"
      @updatesongitem="newSongs = $event;
      "
      :currentMusic="currentMusic"
      :paused="paused"
      @updatecurrentid= "currentid = $event"
      :currentid="currentid"
      
    />
  </div>
</template>

<script>
import Home from "@/components/Home.vue";
import Play from "@/components/Play.vue";
export default {
  components: {
    Home,
    Play,
  },
  data: function () {
    return {
      currentMusic: null,
      paused: null,
      songitem: [],
      currentIndex: 0,
      newSongs: [],
      newgeci: null,
      currentid: null,
    };
  },
  updated() {
    if(this.currentMusic!=null){
      this.currentid = this.currentMusic.id;
    }
  },
  watch: {
    currentMusic: function (n) {
      //使用axios获取数据推荐新音乐id=33894312歌词
      if(n){
      var _thisId = n.id;
      var _thisAddress = "/lyric?id=" + _thisId;
      // console.log(_thisAddress);
      this.axios.get(_thisAddress).then((response) => {
        //调用处理歌词的方法:
        this.newgeci = this.transformLyric(response.data.lrc.lyric);
        // console.log( this.newgeci);
      });
      }
    },
  },
  methods: {
    transformLyric: function (songLyric) {
      //创建变量接收则表达式
      var patt = /\[\d{2,3}:\d{2}\.\d{2,3}\]/gi;

      //split("\n")--->>>数组以"\n"分割,返回一个数组
      //筛选数据filter((e) => e) ---->>>把数组空白的['']时间过滤掉
      //.map()---map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
      //array.map(function(currentValue,index,arr), thisValue)
      //map() 方法按照原始数组元素顺序依次处理元素。
      var arr = songLyric
        .split("\n")
        .filter((e) => e)
        .map((item) => {
          //str.match---map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
          //map() 方法按照原始数组元素顺序依次处理元素。--->>[11:25.555]
          //replace(/(\[|\])/gi, "") 去掉[]号  ------>>>11:25.555
          var time = item.match(patt)[0].replace(/(\[|\])/gi, "");
          //以":" 分割 ------>>> [11,25.555]
          var timeArr = time.split(":");
          //转化秒数----->>>数组中元素转化成number类型操作
          time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
          //获取文本内容:
          var text = item.replace(patt, "");

          //返回对象格式:
          return { time, text };
        });

      //返回这个arr数组对象:
      return arr;
    },
  },
};
</script>
<style>
</style>
