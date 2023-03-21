<template>
  <NavigationHeader/>
  <Viewpager/>
  <NavigationButton/>
  <DiscoverPlaylist/>
</template>

<script>

import NavigationHeader from '@/components/home/NavigationHeader.vue';
import Viewpager from '@/components/home/Viewpager.vue';
import NavigationButton from '@/components/home/NavigationButton.vue';
import DiscoverPlaylist from '@/components/home/DiscoverPlaylist.vue'
export default {
  name: 'HomeView',
  components: {
    NavigationHeader,
    Viewpager,
    NavigationButton,
    DiscoverPlaylist
  }
}
</script>
