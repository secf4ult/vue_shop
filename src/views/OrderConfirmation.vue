<template>
  <div>
    <h1>Order Complete</h1>
    <p>Thanks for shopping with us</p>
    <list-purchases />
  </div>
</template>

<script>
import ListPurchases from '@/components/ListPurchases'

export default {
  name: 'OrderConfirmation',
  components: {
    ListPurchases
  }
}
</script>

<style>

</style>
