import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as d3 from 'd3'

import '@/plugins/Shopify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    d3.csv(
      'https://raw.githubusercontent.com/shopifypartners/shopify-product-csvs-and-images/master/csv-files/bicycles.csv'
    ).then(data => {
      store.dispatch('initializeShop', this.$formatProducts(data))
    })
  },
  render: h => h(App)
}).$mount('#app')
