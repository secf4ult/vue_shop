<template>
  <div>
    <h1>Basket</h1>
    <list-purchases :editable="true" />
    <router-link :to="{ name: 'Checkout' }">
      Proceed to checkout
    </router-link>
  </div>
</template>

<script>
import ListPurchases from '@/components/ListPurchases'
import { mapGetters } from 'vuex'

export default {
  components: {
    ListPurchases
  },
  computed: {
    ...mapGetters('basket')
  }
}
</script>

<style>

</style>
