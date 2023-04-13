<template>
    <div class="login">
        <div class="loginTop" @click="login">登录</div>
        <div class="loginContent">
            <img v-show="qrcode" :src="qrcode" alt="QRCode">
        </div>
    </div>
</template>
<script>
import { getLoginUser } from '@/request/api/home.js'
import { reactive,ref,onMounted } from 'vue'
import { useStore } from 'vuex'
import {getLoginQRCodeState} from '@/request/api/home.js'
export default {
    setup() {
        
        let qrcode = ref('')
        const store = useStore();
        //   const router = useRouter();

        const login = async () => {
            let newqrcode = await store.dispatch('getLogin')
            qrcode.value = newqrcode.code
            checkQRCode(newqrcode.codeKey)
            // if(res.data.code===200){//如果返回的code等于200，说明登录成功，就跳转个人中心页面
            // store.commit('updateIsLogin',true)
            // store.commit('updateToken',res.data.token)
            // let result=await getLoginUser(res.data.account.id)
            // console.log(result);
            // store.commit('updateUser',result)
            // router.push('/infoUser')
            // }else{
            //     alert("手机号码或者密码错误")
            //     this.password=''
            // }
        }

        const checkQRCode = async(key) => {
            let check = setInterval(async() => {
                const res = await getLoginQRCodeState(key).then()
                if (res.data.code === 800) {
                    console.log(res.data)
                    clearInterval(check)
                }
                if (res.data.code === 803) {
                    console.log(res.data)
                    clearInterval(check)
                }
            }, 3000)
        }

        return {
            login,
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
  