import Vue from 'vue'
import App from './Rooms.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
function init() {
    new Vue({
        render: h => h(App)
    }).$mount('#app');
}
if (location.hostname === 'localhost') {
    init()
} else {
    window.Office.initialize = () => init()
}
