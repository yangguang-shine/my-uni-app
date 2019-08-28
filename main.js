import Vue from 'vue'
import App from '@/App'
import router from '@/utils/router.js'
import fetch from '@/utils/fly.js'
import store from '@/store'
import '@/style/flex.css'
import '@/style/common.css'
Vue.config.productionTip = false
Vue.prototype.$myrouter = router
Vue.prototype.$store = store
Vue.prototype.$fetch = fetch
console.log(Vue.prototype)
// Vue.prototype.$data.$mainColor = '#47ff56'
// Vue.prototype.$mainColor = '#47ff56'
App.mpType = 'app'
const $mainColor = "#54e047"
const app = new Vue({
    ...App,
    store
})
Vue.mixin({ // 用得比较多且需要在模板里用可以放到这里，如果用jsx就没有这么多事
    computed: { // 不能修改
        $mainColor () {
            return $mainColor 
        },
    }
});
app.$mount()
uni.login({
    success (res) {
        if (res.code) {
        //发起网络请求
            uni.request({
                url: 'http://localhost:8090/wechat/wx/login',
                data: {
                    code: res.code
                },
                success(res) {
                    console.log(res)
                    // uni.setStorageSync('user', res.data.data)
                },
                fail(res) {
                    console.log('接口调用失败')
                }
            })
        } else {
            console.log('登录失败！' + res.errMsg)
        }
    }
})
