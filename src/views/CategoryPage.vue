<template>
  <div>
    <div v-if="category">
      <h1>{{ category.title }}</h1>
      <list-products :products="category.productDetails" />
    </div>
    <page-not-found v-if="categoryNotFound" />
  </div>
</template>

<script>
import PageNotFound from '@/components/PageNotFound'
import ListProducts from '@/components/ListProducts'
import { mapGetters } from 'vuex'

export default {
  name: 'CategoryPage',
  components: {
    PageNotFound,
    ListProducts
  },
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    categoryNotFound: false
  }),
  computed: {
    ...mapGetters([
      'categoryProducts',
      'categoriesExist'
    ]),
    category () {
      if (this.categoriesExist) {
        const category = this.categoryProducts(this.slug)
        const filters = Object.assign({}, this.$route.query)

        if (Object.keys(filters).length && Object.prototype.hasOwnProperty.call(filters, 'page')) {
          delete filters.page
        }
        if (Object.keys(filters).length) {
          category.productDetails = category.productDetails.filter(p =>
            this.filtering(p, filters))
        }

        if (!category) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.categoryNotFound = true
        }
        return category
      }
      return {}
    }
  },
  methods: {
    filtering (product, query) {
      let display = false
      const hasProperty = {}
      Object.keys(query).forEach(k => {
        const filter = Array.isArray(query[k]) ? query[k] : [query[k]]
        for (const attr of filter) {
          if (k === 'vendor') {
            hasProperty.vendor = false
            if (product.vendor.handle === attr) {
              hasProperty.vendor = true
            }
          } else if (k === 'tags') {
            hasProperty.vendor = false
            product[k].map(key => {
              if (key.handle === attr) {
                hasProperty.tags = true
              }
            })
          } else {
            hasProperty[k] = false
            product.variationProducts.map(v => {
              if (v.variant[k] && v.variant[k].handle === attr) {
                hasProperty[k] = true
              }
            })
          }
        }

        if (Object.keys(hasProperty).every(k => hasProperty[k])) {
          display = true
        }
      })
      return display
    }
  }
}
</script>

<style>

</style>
