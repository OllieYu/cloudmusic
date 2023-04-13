import { getLyric } from '@/request/api/playlist';
import { createStore } from 'vuex'
import { getEmailLogin, getLoginQRCodeKey, getLoginQRCode} from '@/request/api/home';

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
    isMusicPlayerShow:true,
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
    setIsMusicPlayerShow(state, value) { 
      state.isMusicPlayerShow = value;
    },
    pushPlaylist(state, value) {
      state.playList.push(value);
    }
  },
  actions: {
    async getLyric(context, value) {
      let res = await getLyric(value);
      context.commit("setLyricList", res.data.lrc);
    },
    async getLogin(context, value) {
      let codeKey = await getLoginQRCodeKey();
      if(codeKey.data.code == 200){
        let code = await getLoginQRCode(codeKey.data.data.unikey);
        if(code.data.code == 200){
          let res = {
            codeKey: codeKey.data.data.unikey,
            code: code.data.data.qrimg
          }
          return res;
        }
      }
    },
    async getEmailLogin(context, value) {
      let res = await getEmailLogin(value);
      console.log(res);
      if(res.data.code == 200){
        // context.commit("setIsLogin", true);
        return res
      }
    },
  },
  modules: {
  }
})
