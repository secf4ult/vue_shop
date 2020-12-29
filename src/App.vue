<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              About
            </router-link>
          </li>
        </ul>
      </nav>
      <router-link :to="{ name: 'Basekt' }">
        Cart {{ cartQuantity }}
      </router-link>
    </header>

    <router-view />

    <footer>
      <small>@ Myself</small>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    cartQuantity () {
      const quantity = this.$store.getters.cartQuantity
      return quantity ? `(${quantity})` : ''
    }
  }
}
</script>

<style lang="sass">
#app
  display: flex
  flex-direction: column
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  grid-template: 1fr auto 1fr / 1fr 3fr

nav
  ul
    display: flex

  li
    display: inline-block
    list-style: none
    margin-left: 10px

  a
    font-weight: bold
    color: #2c3e50
    text-decoration: none

    &.current
      color: #42b983
</style>
