<template>
  <router-view/>
  <MusicPlayer/>
</template>
<script>
import MusicPlayer from '@/components/player/MusicPlayer.vue';
export default{
  components:{
    MusicPlayer
  }
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon{
  width: .5rem;
  height: .5rem;
}
a{
  color:black;
}
</style>
