<template>
  <!-- eslint-disable -->
  <div v-if="products">
    <ol :start="pagination.range.from + 1">
      <li
        v-for="product in paginate(products)"
        v-if="product"
        :key="product.handle">
        <div class="product-excerpt">
          <router-link :to="{ name: 'ProductPage', params: { slug: product.handle } }">
            <img :src="product.images[0].source" :alt="product.title" v-if="product.images[0]" width="120">
          </router-link>
          <h3>
            <router-link :to="{ name: 'ProductPage', params: { slug: product.handle } }">
              {{ product.title }}
            </router-link>
          </h3>
          <p>Made by: {{ product.vendor.title }}</p>
          <p>Price {{ productPrice(product) }}</p>
        </div>
      </li>
    </ol>

    <div>
      <p v-if="pagination.totalPages > 1">{{ currentPage }}</p>

      <div v-if="pagination.totalProducts > 12">
        Products per page:
        <select v-model="perPage">
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48" v-if="pagination.totalProducts > 24">48</option>
          <option value="60" v-if="pagination.totalProducts > 48">60</option>
        </select>
      </div>
      <button
        :disabled="currentPage === 1"
        @click="toPage(currentPage - 1)"
        v-if="pagination.totalPages > 1">
        Previous page
      </button>
      <button
        :disabled="currentPage === pagination.totalPages"
        @click="toPage(currentPage + 1)"
        v-if="pagination.totalPages > 1">
        Next page
      </button>
    </div>

    <div class="ordering">
      <select v-model="ordering">
        <option value="">Order products</option>
        <option value="title-asc">Title - ascending (A - Z)</option>
        <option value="title-desc">Title - descending (Z - A)</option>
        <option value="price-asc">Price - ascending ($1 - $999)</option>
        <option value="price-desc">Price - descending ($999 - $1)</option>
      </select>
    </div>

    <nav v-if="pagination.totalPages > pageLinksCount" class="page-indicator">
        <span v-for="page in pageLinks">
          <button @click="toPage(page)">{{ page }}</button>
        </span>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    perPage: 12,
    currentPage: 1,
    pageLinksCount: 3,
    ordering: ''
  }),
  computed: {
    orderProducts () {
      let output

      if (this.ordering.length) {
        const orders = this.ordering.split('-')
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        output = this.products.sort((a, b) => {
          if (typeof a[orders[0]] === 'string') {
            return a[orders[0]].localeCompare(b[orders[0]])
          } else {
            return a[orders[0]] - b[orders[0]]
          }
        })

        if (orders[1] === 'desc') {
          output.reverse()
        }
      } else {
        output = this.products
      }
      return output
    },
    pageLinks () {
      if (this.products.length) {
        let negativePoint = parseInt(this.currentPage) - this.pageLinksCount
        let positivePoint = parseInt(this.currentPage) + this.pageLinksCount
        const pages = []

        if (negativePoint < 1) {
          negativePoint = 1
        }
        if (positivePoint > this.pagination.totalPages) {
          positivePoint = this.pagination.totalPages
        }
        for (let i = negativePoint; i <= positivePoint; ++i) {
          pages.push(i)
        }
        return pages
      }
      return 0
    },
    pagination () {
      if (this.products) {
        const totalProducts = this.products.length
        const pageFrom = this.currentPage * this.perPage - this.perPage
        return {
          totalProducts,
          totalPages: Math.ceil(totalProducts / this.perPage),
          range: {
            from: pageFrom,
            to: pageFrom + parseInt(this.perPage)
          }
        }
      }
      return {}
    }
  },
  watch: {
    perPage () {
      if (this.currentPage > this.pagination.totalPages) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            page: this.pagination.totalPages
          })
        })
        this.currentPage = this.pagination.totalPages
      }
    }
  },
  created () {
    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page)
    }
  },
  methods: {
    productPrice (product) {
      let price = '$' + product.price

      if (product.hasManyPrices) {
        price = 'From: ' + price
      }

      return price
    },
    paginate () {
      return this.orderProducts.slice(
        this.pagination.range.from,
        this.pagination.range.to
      )
    },
    toPage (page) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          page
        })
      })
      this.currentPage = page
    }
  }
}
</script>

<style lang="sass" scoped>
.product-excerpt
  display: flex
  justify-content: space-between
</style>
