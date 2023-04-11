<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="陈奕迅" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
        <span class="searchSpan">历史</span>
        <span v-for="item in state.keyWorldList" :key="item" class="spanKey" @click="searchHistory">
        {{ item }}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in state.searchList" :key="i">
        <div class="itemLeft" @click="updateIndex(item)">
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
</template>
<script>
import { onMounted, reactive } from 'vue'
import { getSearchMusic } from '@/request/api/home'
import { useStore} from 'vuex';
import { useRouter } from 'vue-router'
export default{
    
    setup(){
        const store = useStore();
        const router = useRouter()
        const state = reactive({
            keyWorldList:[],
            searchList:[]
        })

        onMounted(()=>{
            if(localStorage.getItem('keyWorldList')){
                state.keyWorldList = JSON.parse(localStorage.getItem('keyWorldList'))
            }
        })
        const enterKey = async (e) => {
            if(e.target.value == ''){
                return
            }
            state.keyWorldList.unshift(e.target.value)
            state.keyWorldList = [...new Set(state.keyWorldList)]
            state.keyWorldList = state.keyWorldList.slice(0,10)
            localStorage.setItem('keyWorldList',JSON.stringify(state.keyWorldList))
            let res = await getSearchMusic(e.target.value)
            state.searchList = res.data.result.songs
            e.target.value = ''
        }

        const delHistory = () => {
            state.keyWorldList = []
            localStorage.setItem('keyWorldList',JSON.stringify(state.keyWorldList))
        }

        const searchHistory = async (e) => {
            let res = await getSearchMusic(e.target.innerText)
            state.searchList = res.data.result.songs
            console.log(state.searchList)
        }

        const updateIndex = (item) => {
            store.commit('pushPlaylist',item)
            store.commit('setPlayListIndex',store.state.playList.length - 1)
            store.commit('setIsPlaying',true)
        }

        return {
            state,
            router,
            enterKey,
            delHistory,
            searchHistory,
            updateIndex,
        }
    }
}
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
.itemList {
    width: 100%;
    padding: .2rem;
    padding-bottom: 1.4rem;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
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
          margin-left: 0.3rem;
        }
      }
      .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
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