import netEaseCloudMusicService from "../musicService";

export function getBanner(){
    return netEaseCloudMusicService({
        method:"GEt",
        url:"/banner?type=2"
    })
}

export function getPersonalizedPlaylist(){
    return netEaseCloudMusicService({
        method:"GEt",
        url:"/personalized?limit=10"
    })
}