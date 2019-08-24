<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/products">New Products</router-link> | 
      <router-link to="{name: 'gender-overview', params:{gender: 'women'}}">  
        Women   </router-link> |  
      <router-link to="{name: 'gender-overview', params:{gender: 'men'}}">  
        Men   </router-link> |  
      <router-link to="/cart">Cart
        <counter-badge :count="cartCount" class="counter"></counter-badge>
      </router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
import CounterBadge from '@/components/CounterBadge';
export default {
  name: 'app',
  components: {CounterBadge},
  computed: {
    cartCount() {
      return this.$store.state.cart.length;
    }
  }
  
}
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .counter {
    margin-left: 5px;
  }
}
</style>
