<template>
  <router-view/>
  <MusicPlayer v-show="store.state.isMusicPlayerShow"/>
</template>
<script>
import MusicPlayer from '@/components/player/MusicPlayer.vue';
import { useStore } from 'vuex';
export default{
  setup(){
    const store = useStore();
    return {
      store
    }
  },
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
