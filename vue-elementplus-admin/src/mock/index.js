import Mock from 'mockjs'
import utils from "../utils/utils";

const Random = Mock.Random

// 登录用户信息
const userinfo = {
    'username': 'admin',
    'name': Random.string(6),
    'email': Random.email(),
    'address': Random.city(),
    'role': {
        'name': Random.string(6),
    }
};

// 拦截登录接口
Mock.mock('http://127.0.0.1:8081/login', "post", (options) => {
    if (!options || !options.body) {
        return {
            status: 101,
            message: '参数为空',
        }
    }
    // 将请求转换为JSON对象
    let pama = JSON.parse(options.body);
    if (!pama || !pama.code || !pama.username || !pama.password) {
        return {
            code: 101,
            msg: '参数为空',
        }
    }
    if (pama.username == 'admin' && pama.password == '111111') {
        return {
            code: 888,
            msg: 'success',
            token: Random.string(32),
            data: userinfo
        }
    }
    return {
        code: 100,
        msg: '登录失败！请检查用户名及密码！'
    }
})