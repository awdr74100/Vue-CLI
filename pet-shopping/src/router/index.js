// 官方組件
import Vue from 'vue';
import Router from 'vue-router';
// 自定義組件
import frontend from '@/components/pages/frontend';
import Login from '@/components/pages/login';
import Backend from '@/components/pages/backend';
// 前端組件
import userHome from '@/components/userHome';
import userAbout from '@/components/userAbout';
import userProductList from '@/components/userProductList';
import userProductDetail from '@/components/userProductDetail';
import userCheckout from '@/components/userCheckout';
import userAdopt from '@/components/userAdopt';
import userContact from '@/components/userContact';
import userNews from '@/components/userNews';
import userCoupon from '@/components/userCoupon';
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
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/',
      component: frontend,
      children: [{
        path: '',
        name: 'Home',
        component: userHome,
      }, {
        path: 'About',
        name: 'About',
        component: userAbout,
      }, {
        path: 'ProductList/:class',
        name: 'ProductList',
        component: userProductList,
      }, {
        path: 'ProductDetail/:id',
        name: 'ProductDetail',
        component: userProductDetail,
      }, {
        path: 'Checkout',
        name: 'Checkout',
        component: userCheckout,
      }, {
        path: 'Adopt',
        name: 'Adopt',
        component: userAdopt,
      }, {
        path: 'Contact',
        name: 'Contact',
        component: userContact,
      }, {
        path: 'News',
        name: 'News',
        component: userNews,
      }, {
        path: 'Coupon',
        name: 'Coupon',
        component: userCoupon,
      }]
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
