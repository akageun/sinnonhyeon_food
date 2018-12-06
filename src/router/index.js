import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: require('@/components/Welcome').default
    },
    {
      path: '/:storeId',
      name: 'StoreDetail',
      component: require('@/components/Store_detail').default
    }
  ]
})
