<template>
    <img class="bgimg" :src="music.al.picUrl" alt="">
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon" aria-hidden="true"  @click="backHome">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="nameAndArtist">
                <p>{{ music.name }}</p>
                <div class="artist">
                    <span>{{ music.ar.map((item)=> item.name).join(' / ') }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou1"></use>
                    </svg> 
                </div>              
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>   
        </div>
    </div>
    <div class="detailContent" v-show="state.isLyricShow">
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:isPlaying}">
        <img src="@/assets/cd.png" alt="" class="img_cd">
        <img :src="music.al.picUrl" alt="" class="img_ar" :class="[isPlaying ? 'img_ar_active' : 'img_ar_paused']">
    </div>
    <div class="musicLyric">
        <p v-for="item in lyric" :key="item">
        {{ item.lrc }}
        </p>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
        </div>
        <div class="footerContent"></div>
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" v-if="!isPlaying" @click="playMusic">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" v-else @click="playMusic">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import { useStore} from 'vuex';
import {reactive, computed} from 'vue';
import hookStoreState from '@/store/useState.js';
export default{
    setup(props){
        const store = useStore();
        const state = reactive({
            isLyricShow:false
        })
        const storeStateArr = hookStoreState(['lyricList']);
        console.log(props.music)

        function backHome(){
            store.commit('setDetailShow')
        }

        const lyric = computed(() => {
            let arr = {}
            console.log(store.state.lyricList)
            if(store.state.lyricList){
                arr = store.state.lyricList.lyric.split(/[(\r\n)\r\n]+/)
                .filter(item=>item !== '' )
                .map((item) => {
                    let time = item.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/)
                    let lrc = item.replace(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/g, '')
                    let min = time[1]
                    let sec = time[2]
                    let ms = time[3]
                    return {min,sec,ms,lrc}
                })
                return arr
            }
            
        })

        return {
            ...storeStateArr,
            state,
            backHome,
            lyric
        }
    },
    props:['music','playMusic','isPlaying'],
}
</script>
<style lang="less" scoped>
.bgimg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(50px);
}

.detailTop {
  width: 100%;
  height: 1.4rem;
  display: flex;
  padding: .4rem;
  justify-content: space-between;
  align-items: center;
  fill: #1a1a1a;
  background-color: #ffffff;
  border-bottom-left-radius: .2rem;
  border-bottom-right-radius: .2rem;
  box-shadow: 0 0 0.25rem 0.05rem #888888;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .nameAndArtist {
      width: 4rem;
      height: 100%;
      margin-left: 0.4rem;
      display: flex;
      flex-direction: column;
      p {
        color: #1a1a1a;
        font-size: .36rem;
        font-weight: 700;
      }
      .artist{
        display: flex;
        align-items: center;
        span {
            color: #a5a5a5;
            font-size: .2rem;
        }
        .icon {
            width: 0.3rem;
            height: 0.3rem;
            fill: #a5a5a5;
        }
      }
    }
  }
}
.detailContent{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .img_needle{
        width: 2rem;
        // height: 3rem;
        position: absolute;
        top: .1rem;
        left: 46%;
        transform-origin: 15% 10%;
        transform: rotate(-20deg);
        transition: all 0.5s;
    }
    .img_needle_active{
        width: 2rem;
        // height: 3rem;
        position: absolute;
        top: .1rem;
        left: 46%;
        transform-origin: 15% 10%;
        transform: rotate(0deg);
        transition: all 0.5s;
    }
    .img_cd{
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2rem;
        z-index: -1;
    }
    .img_ar{
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 2.9rem;
        animation: rotate_ar 15s linear infinite;
    }
    .img_ar_active{
        animation-play-state: running;
    }
    .img_ar_paused{
        animation-play-state: paused;
    }
    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }   
    }
}
.musicLyric{
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: .3rem;
    overflow: scroll;
    p{
        color: #f5f5f5;
        margin-bottom: .6rem;
    }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>