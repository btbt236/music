<template>
  <div id="home">
    <li >
      <router-link
        to="/"
        @updatesong="$emit('updatesong',$event)"
        @playandpause="$emit('playandpause')"
        @updatesongitem="$emit('updatesongitem',$event)"
      >推荐音乐</router-link>
    </li>
    <li>
      <router-link
        to="/home"
        @updatesong="$emit('updatesong',$event)"
        @playandpause="$emit('playandpause')"
        @updatesongitem="$emit('updatesongitem',$event)"
      >热歌榜</router-link>
    </li>
    <li>
      <router-link
        to="/search"
        @updatesong="$emit('updatesong',$event)"
        @playandpause="$emit('playandpause')"
        @updatesongitem="$emit('updatesongitem',$event)"
      >搜索</router-link>
    </li>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="less"  >
#home {
  border-bottom: 1px solid #eeeeee;
  height: 41px;
  display: flex;
  li {
    text-align: center;
    list-style: none;
    flex: 1;
    a {
      text-decoration: none;
      color: #000;
      line-height: 40px;
      display: inline-block;
      &.router-link-exact-active {
        color: #000;
        border-bottom: 2px solid #dd001b;
      }
    }
  }
}
</style>