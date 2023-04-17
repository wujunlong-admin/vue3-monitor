import {ElMessage} from 'element-plus'
import {ElLoading} from 'element-plus'

const utils = {
    loading: null,
    // 记录数据
    saveData(key, value) {
        localStorage.setItem(key, value);
    },
    // 移除数据
    removeData(key) {
        localStorage.removeItem(key);
    },
    // 获取数据
    getData(key) {
        return localStorage.getItem(key);
    },
    showLoading(msg) {
        utils.loading = ElLoading.service({
            lock: true,
            text: msg ? msg : '加载中.....'
        })
    },
    hideLoading(msg) {
        utils.loading && utils.loading.close();
    },
    showError(msg) {
        ElMessage.error(msg)
    },
    showSuccess(msg) {
        ElMessage({
            grouping: true,
            message: msg,
            type: 'success'
        })
    },
    showWarning(msg) {//显示警告消息提示
        ElMessage({
            grouping: true,
            message: msg,
            type: 'warning'
        })
    },
    showMsg(msg) {//显示消息提示
        ElMessage({
            grouping: true,
            message: msg
        })
    },
    check: {// 验证字段函数
        checkPhone(phone) {// 验证电话号码是否合法
            let phonereg = /^1[3-9][0-9]{9}$/;
            return phonereg.test(phone)
        }
    }


};
export default utils;