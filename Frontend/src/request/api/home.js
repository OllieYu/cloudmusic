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

export function getMusicUrl(id){
    return netEaseCloudMusicService({
        method:"GEt",
        url:`/song/url/v1?id=${id}&level=exhigh`
    })
}

export function getSearchMusic(data){
    return netEaseCloudMusicService({
        method:"GEt",
        url:`/cloudsearch?keywords=${data}`
    })
}

export function getLoginQRCodeKey(){
    return netEaseCloudMusicService({
        method:"GEt",
        url:`/login/qr/key?timestamp=${Date.now()}`
    })
}

export function getLoginQRCode(key){
    return netEaseCloudMusicService({
        method:"GEt",
        url:`/login/qr/create?key=${key}&qrimg=true`
    })
}

export function getLoginQRCodeState(key){
    return netEaseCloudMusicService({
        method:"GET",
        url:`/login/qr/check?key=${key}&timestamp=${Date.now()}`,
    })
}

export function getUserAccount(cookie){
    return netEaseCloudMusicService({
        method:"GET",
        url:`/user/account?cookie=${cookie}`,
    })
}
