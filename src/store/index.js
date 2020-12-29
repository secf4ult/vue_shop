import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: {},
    categories: {},
    categoryHome: {
      title: 'Welcome to the shop',
      handle: 'home',
      products: [
        'adjustable-stem',
        'fizik-saddle-pak',
        'kenda-tube',
        'colorful-fixie-lima',
        'oury-grip-set',
        'pure-fix-pedals-with-cages'
      ]
    },
    // TODO: delete placeholder items
    basket: [
      {
        sku: 'Stem - Adjustable - Silver',
        title: 'Adjustable Stem',
        handle: 'adjustable-stem',
        image: {
          source:
            'https://cdn.shopify.com/s/files/1/0923/8062/products/black_silver_1200.jpeg?v=1438626124',
          alt: ''
        },
        variationTitle: '<b>Color:</b> Alloy',
        variation: {
          barcode: '',
          comaprePrice: '20.00',
          grams: '680',
          quantity: '22',
          price: '24.00',
          shipping: 'true',
          sku: 'Stem - Adjustable - Silver',
          taxable: 'true',
          variant: {
            color: { name: 'Color', value: 'Alloy', handle: 'alloy' },
            '': { name: '', value: '', handle: '' }
          }
        },
        quantity: 1
      },
      {
        sku: 'Clubride - Roxbury - Char - S',
        title: 'Club Ride Roxbury Jersey',
        handle: 'roxbury-jersey',
        image: {
          source:
            'https://cdn.shopify.com/s/files/1/0923/8062/products/roxbury-charcoal.jpeg?v=1438626068',
          alt: ''
        },
        variationTitle: '<b>Size:</b> S',
        variation: {
          barcode: '',
          comaprePrice: '',
          grams: '227',
          quantity: '1',
          price: '89.99',
          shipping: 'true',
          sku: 'Clubride - Roxbury - Char - S',
          taxable: 'true',
          variant: {
            size: { name: 'Size', value: 'S', handle: 's' },
            '': { name: '', value: '', handle: '' }
          }
        },
        quantity: 2
      },
      {
        sku: 'The Micro Papa',
        title: 'Micro Papa',
        handle: 'the-micro-papa',
        image: {
          source:
            'https://cdn.shopify.com/s/files/1/0923/8062/products/PAPA_2014_SEAMLESS_SIDE_WEB.jpeg?v=1442434411',
          alt: ''
        },
        variationTitle: '<b>Size:</b> 43 cm',
        variation: {
          barcode: "'741360638501",
          comaprePrice: '329.00',
          grams: '28123',
          quantity: '0',
          price: '329.00',
          shipping: 'true',
          sku: 'The Micro Papa',
          taxable: 'true',
          variant: {
            size: { name: 'Size', value: '43 cm', handle: '43-cm' },
            '': { name: '', value: '', handle: '' }
          }
        },
        quantity: 1
      },
      {
        sku: 'Lock - Kryptonite - S2 Mini - Blue',
        title: 'Kryptonite series 2 Mini-7 U-Lock',
        handle: 'kryptonite-series-2-mini-7-u-lock',
        image: {
          source:
            'https://cdn.shopify.com/s/files/1/0923/8062/products/bluehuge.jpeg?v=1438624459',
          alt: 'Kryptonite series 2 Mini-7 U-Lock'
        },
        variationTitle: '<b>Color:</b> Light Blue',
        variation: {
          barcode: '',
          comaprePrice: '',
          grams: '1134',
          quantity: '17',
          price: '39.99',
          shipping: 'true',
          sku: 'Lock - Kryptonite - S2 Mini - Blue',
          taxable: 'true',
          variant: {
            color: { name: 'Color', value: 'Light Blue', handle: 'light-blue' },
            '': { name: '', value: '', handle: '' }
          },
          image: {
            source:
              'https://cdn.shopify.com/s/files/1/0923/8062/products/bluehuge.jpeg?v=1438624459',
            alt: 'Kryptonite series 2 Mini-7 U-Lock'
          }
        },
        quantity: 3
      }
    ]
  },
  getters: {
    categoryProducts: (state, getters) => slug => {
      if (getters.categoriesExist) {
        if (Object.keys(state.categories).length) {
          let category = false
          const products = []

          if (slug) {
            category = state.categories[slug]
          } else {
            category = state.categoryHome
          }

          if (category) {
            for (const featured of category.products) {
              products.push(state.products[featured])
            }

            category.productDetails = products
          }

          return category
        }
        return false
      }
    },
    categoriesExist: state => {
      return Object.keys(state.categories).length
    },
    cartQuantity: state => {
      let quantity = 0
      for (const item of state.basket) {
        quantity += item.quantity
      }
      return quantity
    }
  },
  mutations: {
    products (state, payload) {
      const products = {}

      Object.keys(payload).forEach(key => {
        const product = payload[key]
        const prices = []

        for (const v of product.variationProducts) {
          if (!prices.includes(v.price)) {
            prices.push(v.price)
          }
        }

        product.price = Math.min(...prices)
        product.hasManyPrices = prices.length > 1

        products[key] = product
      })
      state.products = products
    },
    categories (state, payload) {
      const categories = {}
      const other = {
        title: 'Miscellaneous',
        handle: 'other',
        products: []
      }

      Object.keys(payload).forEach(key => {
        const product = payload[key]
        const type = Object.prototype.hasOwnProperty.call(product, 'type')
          ? product.type
          : other

        if (!Object.prototype.hasOwnProperty.call(categories, type.handle)) {
          categories[type.handle] = {
            title: type.title,
            handle: type.handle,
            products: []
          }
        }

        categories[type.handle].products.push(product.handle)
      })

      // move categories with fewer items into other category
      Object.keys(categories).forEach(key => {
        const category = categories[key]
        if (category.products.length < 3) {
          categories.other.products = categories.other.products.concat(
            category.products
          )
          delete categories[key]
        }
      })

      // sort categories
      const categoriesSorted = {}
      Object.keys(categories)
        .sort()
        .forEach(key => {
          categoriesSorted[key] = categories[key]
        })

      state.categories = categoriesSorted
    },
    addToBasket (state, item) {
      // debugger
      const product = state.basket.find(p => {
        if (p.sku === item.variation.sku) {
          p.quantity++
          return p
        }
      })
      if (!product) {
        state.basket.push({
          sku: item.variation.sku,
          title: item.product.title,
          handle: item.slug,
          image: item.image,
          variationTitle: item.variantTitle(item.variation),
          variation: item.variation,
          quantity: 1
        })
      }
    },
    updatePurchases (state, payload) {
      localStorage.setItem('basket', JSON.stringify(payload))
      state.basket = payload
    }
  },
  actions: {
    initializeShop ({ commit }, products) {
      commit('products', products)
      commit('categories', products)
    }
  },
  modules: {}
})
