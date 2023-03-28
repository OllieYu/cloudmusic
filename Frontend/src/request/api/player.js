import netEaseCloudMusicService from "../musicService"

export function getMusicUrl(id){
    return netEaseCloudMusicService({
        method:"GET",
        url:`/song/url/v1?id=${id}&level=exhigh`
    })
}