import { getLyric } from '@/request/api/playlist';
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList:[],
    playListIndex:0,
    isPlaying: false,
    musicUrl: "",
    detailShow: false,
    lyricList: {},
    musicTime:0,
    duration:0,
    isLogin:false,
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
    },
    setDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    setLyricList(state, value) {
      state.lyricList = value;
    },
    setMusicTime(state, value) {
      state.musicTime = value;
    },
    setDuration(state, value) {
      state.duration = value;
    },
    pushPlaylist(state, value) {
      state.playList.push(value);
    }
  },
  actions: {
    async getLyric(context, value) {
      let res = await getLyric(value);
      context.commit("setLyricList", res.data.lrc);
    }
  },
  modules: {
  }
})
