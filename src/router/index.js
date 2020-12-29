import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomePage from '@/views/HomePage.vue'
import ProductPage from '@/views/ProductPage.vue'
import CategoryPage from '@/views/CategoryPage.vue'
import ListCategories from '@/components/ListCategories.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import ProductFiltering from '@/components/ProductFiltering.vue'
import HomePage from '@/views/HomePage.vue'
import OrderBasket from '@/views/OrderBasket.vue'
import OrderCheckout from '@/views/OrderCheckout.vue'
import OrderConfirmation from '@/views/OrderConfirmation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    children: [
      {
        path: '',
        component: ListCategories
      }
    ]
    // components: {
    //   default: CategoryPage,
    //   sidebar: ListCategories
    // },
    // props: {
    //   default: true,
    //   sidebar: true
    // }
  },
  {
    path: '/category',
    redirect: { name: 'Home' }
  },
  {
    path: '/category/:slug',
    name: 'CategoryPage',
    components: {
      default: CategoryPage,
      sidebar: ProductFiltering
    },
    props: {
      default: true,
      sidebar: true
    }
  },
  {
    path: '/product',
    redirect: { name: 'Home' }
  },
  {
    path: '/product/:slug',
    name: 'ProductPage',
    components: {
      default: ProductPage,
      sidebar: ListCategories
    }
  },
  {
    path: '/basket',
    name: 'Basket',
    component: OrderBasket
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: OrderCheckout
  },
  {
    path: '/complete',
    name: 'Confirmation',
    component: OrderConfirmation
  },
  {
    path: '/404',
    alias: '*',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'current'
})

export default router
