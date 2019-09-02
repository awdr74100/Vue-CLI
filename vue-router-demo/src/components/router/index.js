import Vue from 'vue';
import VueRouter from 'vue-router';
// 官方的文件
import Home from '@/components/HelloWorld';
import Page from '../../components/pages/page'
import child from '../pages/child.vue'
import child2 from '../pages/child2.vue'
import child3 from '../pages/child3.vue'
import Menu from '../pages/menu.vue'

// 自訂的分頁元件

Vue.use(VueRouter);

export default new VueRouter({
  // linkActiveClass:'active',
  routes: [{
    name: '首頁',
    path: '/index',
    component: Home,
  }, {
    // name: '分頁',
    path: '/page',
    // component: Page,
    components:{
      default:Page,
      bottom:Menu,
    },
    children: [{
      name: '分頁 1',
      path: '',
      component: child,
    }, {
      name: '分頁 2',
      path: 'child2',
      component: child2,
    }, {
      name: '分頁 3',
      path: 'child3',
      // path:'child/:id',
      component: child3,
    }]
  }]
})
