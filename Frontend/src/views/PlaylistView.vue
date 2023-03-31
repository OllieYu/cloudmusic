<template>
    <PlaylistHeader :playlist = "state.playlist"/>
    <PlaylistItem :itemList = "state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
</template>
<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getPlaylistDetail, getPlaylistItem } from '@/request/api/playlist'
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue'
import PlaylistItem from '@/components/playlist/PlaylistItem.vue'
export default{
    setup(){
        const state =  reactive({
            playlist:{},
            itemList:[]
        })

        onMounted(async ()=>{
            let id = useRoute().query.id
            await Promise.all([getPlaylistItem(id),getPlaylistDetail(id)]).then(res=>{
                state.itemList = res[0].data.songs
                state.playlist = res[1].data.playlist
                sessionStorage.setItem('itemDetail', JSON.stringify(state))
            })
        })

        return { state }
    },
    components:{
        PlaylistHeader,
        PlaylistItem
    }
}
</script>