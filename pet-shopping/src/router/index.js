// 官方組件
import Vue from 'vue';
import Router from 'vue-router';
// 自定義組件
import frontend from '@/components/pages/frontend';
import Login from '@/components/pages/login';
import Backend from '@/components/pages/backend';
// 前端組件
import userHome from '@/components/userHome'
import userBrandStory from '@/components/userBrandStory';
import userBrandFlagship from '@/components/userBrandFlagship';
// 後端組件
import adminProductList from '@/components/adminProductList';
import adminOrderList from '@/components/adminOrderList';
import adminCouponList from '@/components/adminCouponList';
// 載入bootstrap.js
import 'bootstrap';
// 啟動組件
Vue.use(Router);



export default new Router({
  routes: [{
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      component: frontend,
      children: [{
        path: '',
        name: 'Home',
        component: userHome,
      }, {
        path: 'BrandStory',
        name: 'BrandStory',
        component: userBrandStory,
      }, {
        path: 'BrandFlagship',
        name: 'BrandFlagship',
        component: userBrandFlagship,
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/admin',
      name: 'Backend',
      component: Backend,
      children: [{
        path: 'productList',
        name: 'productList',
        component: adminProductList,
        meta: {
          requiresAuth: true
        }
      }, {
        path: 'orderList',
        name: 'orderList',
        component: adminOrderList,
        meta: {
          requiresAuth: true
        }
      }, {
        path: 'couponList',
        name: 'couponList',
        component: adminCouponList,
        meta: {
          requiresAuth: true
        }
      }]

    }
  ]
})
