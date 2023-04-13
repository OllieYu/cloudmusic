<template>
    <div class="login">
        <div class="loginTop" @click="login">登录</div>
        <div class="loginContent">
            <img v-show="qrcode" :src="qrcode" alt="QRCode">
        </div>
    </div>
</template>
<script>
import { reactive,ref,onMounted } from 'vue'
import { useStore } from 'vuex'
import { getLoginQRCodeState, getLoginQRCodeKey, getLoginQRCode, getUserAccount} from '@/request/api/home';
import { useRouter } from 'vue-router';
import { onUpdated } from 'vue';
export default {
    setup() {
        
        let qrcode = ref('')
        const store = useStore();
        const router = useRouter();

        onMounted(async() => {
            if(localStorage.getItem('loginToken')){
                await getUserInfo()
                store.commit('setIsLogin', true)
                router.push('/userInfo')
            }
        })

        const login = async () => {
            let key = await getLoginQRCodeKey()
                .then(res => res.data.data.unikey)
                .catch(err => console.log(err))
            let newQRcode = await getLoginQRCode(key)
                .then(res => res.data.data.qrimg)
                .catch(err => console.log(err))
            qrcode.value = newQRcode
            
            let check = setInterval(async() => {
                await getLoginQRCodeState(key)
                    .then(async res => {
                        if (res.data.code === 800) {
                            console.log(res.data.messgae)
                            clearInterval(check)
                        }
                        if (res.data.code === 803) {
                            clearInterval(check)
                            store.commit('setIsLogin', true)
                            localStorage.setItem('loginToken', res.data.cookie)
                            router.push('/userInfo') 
                            getUserInfo()
                        }                        
                    }).catch(err => console.log(err))
            }, 3000)
        }

        const getUserInfo = async () => {
            await getUserAccount(localStorage.getItem('loginToken'))
                .then(res => {
                    store.commit('setUser', res)
                })
                .catch(err => console.log(err))
        }

        return {
            login,
            getUserInfo,
            qrcode
        }
    },

}
</script>
<style lang="less" scoped>
.login {
    width: 100%;
    height: 13.34rem;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(248, 97, 97);

    .loginTop {
        margin-top: 1rem;
        font-size: 1rem;
        color: #fff;
    }

    .loginContent {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-top: 2rem;
        img {
            width: 3rem;
            height: 3rem;
        }
    }
}
</style>
  