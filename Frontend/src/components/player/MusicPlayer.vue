<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="showPlayerDetail">
            <template v-if="!playList.length">
                <img :src="avater" alt="">
                <div>
                    <p>Cloud Music</p>
                    <span>created by Y_Yu</span>
                </div>
            </template>
            <template v-else>
                <img :src="playList[playListIndex].al.picUrl" alt="">
                <div>
                    <p>{{playList[playListIndex].name}}</p>
                    <span>{{
                        playList[playListIndex].ar.map((item)=> item.name).join(' / ')
                        }}</span>
                </div>
            </template>
        </div>
        <div class="footerRight">
            <svg class="icon play" aria-hidden="true" v-if="!isPlaying" @click="playMusic">
                <use v-show="playList[playListIndex]" xlink:href="#icon-bofanganniu" ></use>
            </svg> 
            <svg class="icon" aria-hidden="true" v-else @click="playMusic">
                <use xlink:href="#icon-weibiaoti--" ></use>
            </svg> 
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg> 
        </div>
        <audio ref="audio" :src="musicUrl"></audio>
        <van-popup v-model:show="detailShow" position="bottom" :style="{ width:'100%', height:'100%' }">
            <MusicDetail :music="playList[playListIndex] ? playList[playListIndex] : defaultMusic" :playMusic="playMusic" :isPlaying="isPlaying"/>
        </van-popup>
    </div>
</template>
<script>
import { mapMutations, useStore} from 'vuex';
import { onMounted, onUpdated, ref } from 'vue';
import hookStoreState from '@/store/useState.js';
import avater from '@/assets/avater.jpg';
import MusicDetail from '@/components/player/MusicDetail.vue';
export default{

    setup(){
        const store = useStore();
        const audio = ref(null);
        const storeStateArr = hookStoreState(['playList','playListIndex','isPlaying','musicUrl','detailShow']);
        const defaultMusic = {
            name:'Cloud Music',
            ar:[{name:'Y_Yu'}],
            al:{picUrl:avater}
        }
        // const storeMutations = mapMutations(['setIsPlaying'])
        onMounted(()=>{
            audio.value.autoplay = true;
            console.log(audio)
        })

        onUpdated(()=>{
            store.dispatch('getLyric',store.state.playList[store.state.playListIndex].id)
        })

        function playMusic(){
            if(audio.value.paused){
                audio.value.play();
                store.commit('setIsPlaying',true)
                
            }else{
                audio.value.pause();
                store.commit('setIsPlaying',false)
            }
        }
        
        function showPlayerDetail(){
            store.commit('setDetailShow')
        }
        
        return {
            ...storeStateArr,
            // ...storeMutations,
            audio,
            defaultMusic,
            playMusic,
            showPlayerDetail,
            avater
        }
    },
    components:{
        MusicDetail
    }
}
</script>
<style lang="less" scoped>
.FooterMusic{
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .footerLeft{
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        img{
            width: .9rem;
            height: .9rem;
            border-radius: 50%;
            margin-right: .2rem;
        }
        p{
            line-height: 0.3rem;
            font-weight: 900;
        }
        span{
            font-size: 0.24rem;
                color: #888888;
        }
    }
    .footerRight{
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon{
                width: .6rem;
                height: .6rem;
            }
            .play{
                stroke: black;
                stroke-width: 25;
            }
        }
}
</style>