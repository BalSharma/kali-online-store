<template>
  <div>
    <section class="wrapper">
      <!-- <h2>{{product.name}}</h2>  -->
      <div class="flex-col">
        <!-- <img :src="imagePath(product)" alt="" class="flex-col--2"> -->
         <img :src="makeImagePath(product)" alt="" class="flex-col--2">
         <div class="flex-col--e">
          <h2>{{product.name}}</h2>
          <button @click="addToCart" class="btn btn--lightblue">Add to Cart</button>
          <p>Price: ${{product.price}}</p>
          <p>Size: {{product.size}}</p>
          <p> Color: {{product.color}}</p>
          <p>{{product.quantity}} left in stock</p>
          <h3 class="h3-style">Details</h3>
          <ul>
             <li class="flex-justify-right">Material: {{ product.details.material }}</li>
             <li class="flex-justify-right">Fit: {{ product.details.fit }}</li>
             <li class="flex-justify-right">Maintenance : {{ product.details.maintenance  }}</li>
             <li v-if="product.details.additional" class="flex-justify-right">Additional  : {{ product.details.additional   }}</li>
          </ul>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import {imagePath} from '@/mixins/imagePath.js';
export default {
  name: 'product',
  mixins: [imagePath],
  data() {
    return {
      product: this.$store.getters.product(this.$route.params.id)
    }
  },
  methods: {
    addToCart () {
      this.$store.dispatch('addToCart', this.$route.params.id);
    }
  }
  // ,
  // methods: {
  //   imagePath(product) {
  //     return require(`../assets/img/products/${product.images[0]}`);
  //   }
  // }
}
</script>

<style lang="scss">
.flex-col {
  display: flex;
  align-items: flex-start;
}
.flex-col--2 {
  width: 50%;
  text-align: left;
}
.btn {
  padding: .5rem .75rem;
  border-radius: 3px;
  border:none;
  background-color: transparent;
  font-size: .9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all .15s ease;
}
.btn--lightblue{
  background-color: navy;
  color:#fff;
  &:hover, &:focus{
    background-color: pink;
  }
}
.flex-col--e {
  text-align: left;
  margin-left: 30px;
}
.flex-justify-right {
  margin-left: 20px;
}
.h3-style {
  margin-bottom: 3px;
}
</style>

