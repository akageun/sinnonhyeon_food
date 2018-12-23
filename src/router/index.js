import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Store_list',
      component: require('@/components/Store_list').default
    },
    {
      path: '/:storeId',
      name: 'StoreDetail',
      component: require('@/components/Store_detail').default
    }
  ]
})
