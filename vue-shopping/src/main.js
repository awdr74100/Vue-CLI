// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currencyFilter from './filters/currency';


// vee-validate start
import { ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { localize } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
// localize('zh_TW', TW);

// Add a rule.
// Add the required rule
extend('required', required);
// // Add the email rule
extend('email', email);
// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
// vee-validate end



Vue.component('Loading', Loading);

Vue.filter("currency", currencyFilter);

Vue.use(VueAxios, axios);


axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});


router.beforeEach((to, from, next) => {
  // console.log("to", to, "from", from, "next", next);
  if (to.meta.requiresAuth) {
    // console.log("這裡需要驗證");
    const server = process.env.API_PATH;
    const api = `${server}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login",
        })
      }
    })
  } else {
    next()
  }
  // next();
})
