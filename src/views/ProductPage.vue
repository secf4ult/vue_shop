<template>
  <!-- eslint-disable -->
  <div>
    <div v-if="product">
      <div
        v-if="image"
        class="images">
        <div class="main">
          <img
            :src="image.source"
            :alt="image.alt || product.title"
            width="400">
        </div>
        <div
          v-if="product.images.length > 1"
          class="thumbnails">
          <template v-for="img in product.images">
            <img
              :key="img.source"
              :src="img.source"
              :alt="img.alt || product.title"
              width="100"
              @click="updateImage(img)">
          </template>
        </div>
      </div>
      <h1>{{ product.title }} - ${{ variation.price }}</h1>
      <div class="meta">
        <span>Manufacturer: <strong>{{ product.vendor.title }}</strong></span>
        <span v-if="product.type">Category: <strong>{{ product.type.title }}</strong></span>
        <span>Quantity: <strong>{{ variation.quantity }}</strong></span>
      </div>
      <div class="variations">
        <select v-model="variation" v-if="product.variationProducts.length > 1">
          <option
            v-for="(v, i) in product.variationProducts"
            :key="v.barcode || i"
            :value="v"
            v-html="variantTitle(v) + ((!v.quantity) ? ' - out of stock' : '')"
            />
        </select>
        <button :class="addedToBasket ? 'isAdded' : ''" @click="addToBasket()" :disabled="!variation.quantity">
          {{ variation.quantity ? (addedToBasket ? 'Added to basket' : 'Add to basekt') : 'Out of stock' }}
        </button>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="product.body" />
    </div>
    <page-not-found v-if="productNotFound" />
  </div>
</template>

<script>
import PageNotFound from '@/components/PageNotFound.vue'

export default {
  name: 'ProductPage',
  components: {
    PageNotFound
  },
  data () {
    return {
      slug: this.$route.params.slug,
      productNotFound: false,
      image: false,
      variation: false,
      addedToBasket: false
    }
  },
  computed: {
    product () {
      let product
      if (Object.keys(this.$store.state.products).length) {
        product = this.$store.state.products[this.slug]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.image = product.images.length ? product.images[0] : false
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.variation = product.variationProducts[0]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        if (!product) this.productNotFound = true
      }
      return product
    }
  },
  watch: {
    variation (v) {
      // eslint-disable-next-line
      if (v.hasOwnProperty('image')) {
        this.updateImage(v.image)
      }
    },
    '$route' (to) {
      this.slug = to.params.slug
    }
  },
  methods: {
    updateImage (img) {
      this.image = img
    },
    variantTitle (variation) {
      const variants = variation.variant
      const output = []
      for (const a in variants) {
        if (variants[a].name) output.push(`<b>${variants[a].name}:</b> ${variants[a].value}`)
      }
      return output.join(' / ')
    },
    addToBasket () {
      this.$store.commit('addToBasket', this)
      this.addedToBasket = true
      setTimeout(() => {
        this.addedToBasket = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.thumbnails > img {
  cursor: pointer;
  border: 1px gray solid;
}

.meta {
  margin: 0 auto auto 0;
  width: 60%;
  display: flex;
  justify-content: space-between;
}
</style>
