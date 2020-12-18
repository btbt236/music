<template lang="">
    <div>
        <Bordertitle>最新音乐</Bordertitle>
        <Songitem  v-for="song in newSongs" :key="song.id" :item="song" @updatesong="$emit('updatesong',$event)" @playandpause="$emit('playandpause',$event)"></Songitem>
    </div>
</template>
<script>
import Bordertitle from "@/components/Bordertitle.vue";
import Songitem from "@/components/Songitem.vue";

export default {
    components:{
        Bordertitle,
        Songitem
    },
    props:['newSongs']
    
}
</script>
<style lang="">
    
</style>