<template>
  <div>
    <list-categories />
    <div class="filters">
      <div
        v-for="filter in filters"
        :key="filter.title"
        class="filterGroup">
        <h3>{{ filter.title }}</h3>
        <label
          v-for="value in filter.values"
          :key="value.handle"
          class="filter">
          <input
            v-model="filter.checked"
            type="checkbox"
            :value="value.handle"
            @click="updateFilters">
          {{ value.title }} ({{ value.count }})
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import ListCategories from '@/components/ListCategories'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductFiltering',
  components: {
    ListCategories
  },
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      topics: this.defaultTopics()
    }
  },
  computed: {
    ...mapGetters([
      'categoryProducts',
      'categoriesExist'
    ]),
    filters () {
      if (this.categoriesExist) {
        const category = this.categoryProducts(this.slug)
        for (const product of category.productDetails) {
          if (Object.prototype.hasOwnProperty.call(product, 'vendor')) {
            this.addTopic(this.topics.vendor, product.vendor, product.handle)
          }

          if (Object.prototype.hasOwnProperty.call(product, 'tags')) {
            for (const tag of product.tags) {
              this.addTopic(this.topics.vendor, tag, product.handle)
            }
          }

          Object.keys(product.variationTypes).forEach(vkey => {
            const variation = product.variationTypes[vkey]

            if (!Object.prototype.hasOwnProperty.call(this.topics, variation.handle)) {
              this.topics[variation.handle] = {
                ...variation,
                checked: [],
                values: {}
              }
            }

            Object.keys(product.variationProducts).forEach(pkey => {
              const variationProduct = product.variationProducts[pkey]

              this.addTopic(
                this.topics[variation.handle],
                variationProduct.variant[variation.handle],
                product.handle
              )
            })
          })
        }

        Object.keys(this.$route.query).forEach(key => {
          if (Object.keys(this.topics).includes(key)) {
            const query = this.$route.query[key]
            this.topics[key].checked = Array.isArray(query) ? query : [query]
          }
        })
      }
      return this.topics
    }
  },
  watch: {
    slug () {
      this.topics = this.defaultTopics()
    }
  },
  methods: {
    defaultTopics () {
      return {
        topics: {
          vendor: {
            title: 'Manufacturer',
            handle: 'vendor',
            checked: [],
            values: {}
          },
          tags: {
            title: 'Tags',
            handle: 'tags',
            checked: [],
            values: {}
          }
        }
      }
    },
    updateFilters () {
      const filters = {}
      Object.keys(this.topics).forEach(k => {
        const topic = this.topics[k]
        if (topic.checked.length) {
          filters[k] = topic.checked
        }
      })
      this.$route.push({ query: filters })
    },
    addTopic (category, item, handle) {
      if (item.handle) {
        if (category.values[item.handle]) {
          if (!category.values[item.handle].count.includes(handle)) {
            category.values[item.handle].count.push(handle)
          }
        } else {
          if (Object.prototype.hasOwnProperty.call(item, 'value')) {
            item.title = item.value
          }
          category.values[item.handle] = {
            ...item,
            count: [handle]
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
