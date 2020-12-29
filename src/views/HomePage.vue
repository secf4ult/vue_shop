<template>
  <div>
    <aside>
      <router-view />
    </aside>
    <main>
      <list-products :products="products" />
    </main>
  </div>
</template>

<script>
import ListProducts from '@/components/ListProducts'

export default {
  name: 'HomePage',
  components: {
    ListProducts
  },
  data: () => ({
    selectedProducts: [
      'adjustable-stem',
      'colorful-fixie-lima',
      'fizik-saddle-pak',
      'kenda-tube',
      'oury-grip-set',
      'pure-fix-pedals-with-cages'
    ]
  }),
  computed: {
    products () {
      const products = this.$store.state.products
      const selectedProducts = Object.keys(products).map(key => products[key]).filter(product =>
        this.selectedProducts.includes(product.handle)
      )
      const output = []

      if (Object.keys(selectedProducts).length) {
        for (const featured of this.selectedProducts) {
          output.push(products[featured])
        }
      }
      return output
    }
  }
}
</script>

<style lang="sass" scoped>
.page-indicator a
  margin: 0 4px 0 4px
div
  display: flex
aside
  flex: 0 0 300px
main
  flex: 1 1 0
</style>
