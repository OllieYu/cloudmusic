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
            let res = await getPlaylistDetail(id)
            state.playlist = res.data.playlist
            let result = await getPlaylistItem(id)
            state.itemList = result.data.songs
            sessionStorage.setItem('itemDetail', JSON.stringify(state))
        })

        return { state }
    },
    components:{
        PlaylistHeader,
        PlaylistItem
    }
}
</script>