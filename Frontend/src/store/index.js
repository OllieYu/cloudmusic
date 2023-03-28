import { createStore } from 'vuex'

export default createStore({
  state: {
    playList:[],
    playListIndex:0,
    isPlaying: false,
    musicUrl: "",
  },
  getters: {
  },
  mutations: {
    setIsPlaying(state, value) {
      state.isPlaying = value;
    },
    setPlayList(state, value) {
      state.playList = value;
      console.log(state.playList);
    },
    setPlayListIndex(state, value) {
      state.playListIndex = value;
    },
    setMusicUrl(state, value) {
      state.musicUrl = value;
    } 
  },
  actions: {
  },
  modules: {
  }
})
