import netEaseCloudMusicService from "../musicService"

export function getPlaylistDetail(data){
    return netEaseCloudMusicService({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
}

export function getPlaylistItem(data){
    return netEaseCloudMusicService({
        method:"GET",
        url:`/playlist/track/all?id=${data}`
    })
}