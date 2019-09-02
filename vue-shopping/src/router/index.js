import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import 'bootstrap';
import CustomerOrder from '@/components/pages/customerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

Vue.use(Router)

export default new Router({
  routes: [
    //   {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: {
    //     requiresAuth: true
    //   }
    // }, 
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '*',
      redirect: '/login',
    }, {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [{
        path: 'products',
        name: 'products',
        component: Products,
        meta: {
          requiresAuth: true
        }
      }],
    }, {
      path: '/',
      // name: 'Dashboard',
      component: Dashboard,
      children: [{
        path: 'customer_order',
        name: 'CustomerOrder',
        component: CustomerOrder,
      },{
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
      }],
    }
  ]
})
