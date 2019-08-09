<template>
  <div>   
     <section class="wrapper">
       <h3>Featured Items</h3>
        <ul class="featured-items">
          <li v-for="product in products" :key="product.id" 
            class="featured-items__item">
            <router-link :to="{name: 'product', params: {id: product.id}}">
              <!-- <img :src="imagePath(product)" alt="" class="product-image" /> -->
              <img :src="makeImagePath(product)" alt="" class="product-image" />

              <p class="product-title">{{product.name}}</p>
              <p><em>${{product.price}}</em></p>
            </router-link>
          </li>
        </ul>
     </section>
  </div>
</template>

<script>
import {imagePath} from '../mixins/imagePath.js';
export default {
  name: 'products',
   mixins: [imagePath],
  computed: {
    products (){
      return this.$store.state.products;
    }
  }  
}
</script>

<style lang="scss">
.wrapper {
  max-width: 800px;
  margin: 0 auto;
  @media only screen and(max-width: 832px) {
    max-width: 100%;
    padding: 1rem;
    text-align: center;
  }
}
.featured-items {
  padding-left: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 832px) {
    flex-direction: column;
  }
}

.featured-items__item {
  width: 33%;
  text-align: center;
  @media only screen and (max-width: 832px) {
    width: 100%;
  }
}
.product-image {
  max-height: 200px;    
}
.product-title {
  font-weight: bold;
}
</style>
