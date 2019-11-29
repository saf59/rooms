import Vue from 'vue'
import App from './Rooms.vue'

Vue.config.productionTip = false
function init() {
    new Vue({
        render: h => h(App)
    }).$mount('#app');
}
if (location.hostname == 'localhost') {
    init()
} else {
    window.Office.initialize = () => init()
}
