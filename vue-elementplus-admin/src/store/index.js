// import {createStore} from 'vue';
import {createStore} from "vuex";
// 引入utils方法
import utils from '../utils/utils.js'


// 创建一个新的store 实例
const index = createStore({
    state() {
        return {
            // 当前登录用户信息
            userinfo: {},
            // 检查当前用户是否登录
            islogin: false
        }
    },
    mutations: {
        setUserInfo(state, userinfo) {
            state.userinfo = userinfo;
            utils.saveData('userinfo',userinfo)
        },
        setToken(state, token) {
            state.token = token;
            utils.saveData('token',token)
        },
        isLogin(){// 判断登录状态

        }
    }
})

export default index