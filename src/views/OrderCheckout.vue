<template>
  <div>
    <h1>Order Confirmation</h1>
    <p>Is everything correct?</p>
    <list-purchases />

    <form @submit="submitForm()">
      <fieldset>
        <h2>Billing Detail</h2>
        <label for="billingName">Name:</label>
        <input
          id="billingName"
          v-model="billing.name"
          type="text">
        <label for="billingAddress">Address:</label>
        <input
          id="billingAddress"
          v-model="billing.address"
          type="text">
        <label for="billingZipcode">Zipcode:</label>
        <input
          id="billingZipcode"
          v-model="billing.zipcode"
          type="text">
      </fieldset>
      <label for="sameAddress">
        <input
          id="sameAddress"
          v-model="sameAddress"
          type="checkbox">
        Delivery address is the same as billing
      </label>
      <fieldset>
        <h2>Delivery Details</h2>
        <label for="deliveryName">Name:</label>
        <input
          id="deliveryName"
          v-model="delivery.name"
          type="text"
          :disabled="sameAddress">
        <label for="deliveryAddress">Address:</label>
        <input
          id="deliveryAddress"
          v-model="delivery.address"
          :disabled="sameAddress"
          type="text">
        <label for="deliveryZipcode">Zipcode:</label>
        <input
          id="deliveryZipcode"
          v-model="delivery.zipcode"
          :disabled="sameAddress"
          type="text">
      </fieldset>

      <input
        type="submit"
        value="Purchase items">
    </form>
  </div>
</template>

<script>
import ListPurchases from '@/components/ListPurchases'

export default {
  name: 'OrderConfirmation',
  components: {
    ListPurchases
  },
  data: () => ({
    sameAddress: false,
    billing: {
      name: '',
      address: '',
      zipcode: ''
    },
    delivery: {
      name: '',
      address: '',
      zipcode: ''
    }
  }),
  methods: {
    submitForm () {
      this.$router.push({ name: 'Confirmation' })
    }
  }
}
</script>

<style>

</style>
