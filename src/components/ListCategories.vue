<template>
  <div v-if="categories">
    <ul>
      <li
        v-for="c in categories"
        :key="c.title">
        <router-link :to="{ name: 'CategoryPage', params: { slug: c.handle } }">
          {{ c.title }} ({{ c.products.length }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListCategories',
  computed: {
    categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style scoped>
li {
  text-align: left;
}
</style>
