<template>
  <table>
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Unit price</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.handle">
        <td>
          <img
            :src="product.image.source"
            :alt="product.image.alt || product.variationTitle"
            width="80">
        </td>
        <td>
          <router-link
            :to="{ name: 'ProductPage', params: { slug: product.handle } }">
            {{ product.title }}
          </router-link>
        </td>
        <td>{{ product.variation.price | currency }}</td>
        <td v-if="!editable">
          {{ product.quantity }}
        </td>
        <td v-if="editable">
          <input
            type="text"
            :value="product.quantity"
            @blur="updateQuantity($event, product.sku)">
        </td>
        <td>{{ product.variation.price * product.quantity | currency }}</td>
        <td v-if="editable">
          <button @click="removeItem(product.sku)">
            Remove Item
          </button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <td colspan="3" />
      <td>
        <strong>Total: </strong>
      </td>
      <td>{{ totalPrice | currency }}</td>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: 'ListPurchases',
  filters: {
    currency (val) {
      console.log(val, typeof val)
      return '$' + Number(val).toFixed(2)
    }
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    products () {
      return this.$store.state.basket
    },
    totalPrice () {
      let total = 0
      for (const p of this.products) {
        total += p.variation.price * p.quantity
      }
      return total
    }
  },
  methods: {
    removeItem (sku) {
      const products = this.products.filter(p => p.sku !== sku)
      this.$store.commit('updatePurchases', products)
    },
    updateQuantity (e, sku) {
      if (!parseInt(e.target.value)) {
        this.removeItem(sku)
      } else {
        const products = this.products.map(p => {
          if (p.sku === sku) {
            p.quantity = parseInt(e.target.value)
          }
          return p
        })
        this.$store.commit('updatePurchases', products)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
table
  width: 100%
</style>
