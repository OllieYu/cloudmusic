<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true" @click="playMusic()">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span>播放全部<span>(共{{ itemList.length }}首)</span></span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item, i) in itemList" :key="i">
                <div class="itemLeft" @click="playMusic(i)">
                    <span class="leftSpan">{{ i + 1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span>{{
                        item.ar.map((item)=> item.name).join(' / ')
                        }}</span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon bofang" aria-hidden="true" v-if='item.mv !=0'>
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {useStore} from 'vuex';
import { getMusicUrl } from '@/request/api/player';
export default{
    setup(props){
        const store = useStore();
        console.log(props)

        async function playMusic(i){
            if( i == undefined){
                i = 0
            }
            store.commit('setPlayList',props.itemList)
            store.commit('setPlayListIndex',i)
            let res = await getMusicUrl(props.itemList[i].id)
            store.commit('setMusicUrl',res.data.data[0].url)
            store.commit('setIsPlaying',true)
            console.log(res.data.data[0].url)
        }

        return {
            playMusic
        }
    },
    props:['itemList','subscribedCount']
}
</script>
<style lang="less" scoped>
.itemMusicList{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0 0.2rem;
    // margin-top: 0.2rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    .itemListTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .listLeft{
            width: 2.8rem;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon {
                stroke: #333333;
                stroke-width: 20;
            }
            span {
                font-weight: 700;
                span {
                font-weight: 400;
                font-size: 0.24rem;
                color: #999;
                }
            }
        }
        .listRight{
            display: flex;
            align-items: center;
            background-color: rgb(228, 41, 41);
            padding: 0.2rem;
            border-radius: 0.4rem;
            color: #fff;
            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: #fff;
                margin-right: 0.1rem;
                stroke: #fff;
                stroke-width: 50;
            }
        }
    }
    .itemList{
        width: 100%;
        .item{
            width: 100%;
            height: 1.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .itemLeft{
                width: 85%;
                height: 100%;
                display: flex;
                align-items: center;
                .leftSpan{
                    display: inline-block;
                    width: .6rem;
                    text-align: center;
                }
            }
            div{
                p{
                    width: 4.54rem;
                    height: .4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                }
                span{
                    font-weight: 400;
                    font-size: .24rem;
                    color: #999;
                }
            }
        }
        .itemRight{
            width: 20%;
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
            .icon{
                fill: #999;
            }
            .bofang{
                position: absolute;
                left: 0;
            }
            .liebiao{
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>