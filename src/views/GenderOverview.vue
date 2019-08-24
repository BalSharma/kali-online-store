<template>
  <div>
    <h1 v-if="pageTitle" class="wrapper">{{pageTitle.toUpperCase()}}</h1>
    <ul class="item-grid">
      <li v-for="product in productsByGender"
            :key="product.id" class="item-grid__item">
          <router-link :to="{name: 'product', params: {id: product.id}}">
            <img :src="makeImagePath(product)" alt class="product-image" />
            <p class="product-title">{{product.name}}</p>
            <p>
              <em>{{product.price}}</em>
            </p>
          </router-link>
      </li>
    </ul>
    <div class="wrapper random-items-wrapper">
      <h2>Our Recomendations</h2>
      <p>Try these on for size!</p>
      <section class="random-items">
        <router-link :to="{name: 'product', params: {id: randomTop.id}}"
          class="random-items__item">
          <img :src="makeImagePath(randomTop)" alt="" class="product-image">
          <p class="product-title">{{randomTop.name}}</p>
          <p><em>${{randomTop.price}}</em></p>
        </router-link>
        <router-link :to="{name: 'product', params: {id: randomBottom.id}}"
          class="random-items__item">
          <img :src="makeImagePath(randomBottom)" alt="" class="product-image">
          <p class="product-title">{{randomBottom.name}}</p>
          <p><em>${{randomBottom.price}}</em></p>
        </router-link>
        <router-link :to="{name: 'product', params: {id: randomFootware.id}}"
          class="random-items__item">
          <img :src="makeImagePath(randomFootware)" alt="" class="product-image">
          <p class="product-title">{{randomFootware.name}}</p>
          <p><em>${{randomFootware.price}}</em></p>
        </router-link>
      </section>
      <button class="btn btn--grey" @click="recommendOutfit">
        Shuffle
      </button>
    </div>
  </div>
</template>

<script>
import { imagePath } from "@/mixins/imagePath.js";
export default {
  name: "genderOverview",
  mixins: [imagePath],
  data() {
    return {
      pageTitle : '',
      randomoTopId: null,
      randomBottomId: null,
      randomoFootwareId: null
    };
  },
  created() { 
   this.receved_gender = this.$route.params.gender
      const words = this.receved_gender.split(',');
      const searchTerm = "'";
      const indexLast = words[1].lastIndexOf(searchTerm);
      const indexFirst = words[1].indexOf(searchTerm);      
      this.pageTitle  = words[1].substring(indexFirst + 1, indexLast);
      this.recommendOutfit();
  },

  computed: {    
    productsByGender() {
      return this.$store.getters.productsByGender(this.pageTitle).slice(0,6);
    },
    randomTop() {
      return this.$store.getters.product(this.randomoTopId);
    },
    randomBottom () {
      return this.$store.getters.product(this.randomBottomId);
    },
    randomFootware() {
      return this.$store.getters.product(this.randomoFootwareId);
    }

  },
  methods: {
    randomProductIdByCategory (category) {
      let allProductsInCategory = 
      this.productsByGender.filter(
        p => p.category === category);
        let randomIndex = 
        Math.floor(Math.random() * allProductsInCategory.length);
        return allProductsInCategory[randomIndex].id;
    },
    recommendOutfit() {
      this.randomoTopId = this.randomProductIdByCategory('Shirts');
      this.randomBottomId = this.randomProductIdByCategory('Pants');
      this.randomoFootwareId = this.randomProductIdByCategory('Shoes');
    }

  }
};
</script>
<style lang="scss">
.random-items-wrapper {
  background: #fafafa;
  text-align: center;
  padding: 3rem;
}
.random-items {
  display: flex;
  align-items: center;
  justify-content:space-between;
}
.random-items__item {
  flex:0 0 33%;
}
.item-grid {
  list-style: none;
  padding-left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item-grid__item {
  box-sizing: border-box;
  border-bottom: 1px solid #151212;  
  text-align: center;
  padding: 1rem;
  flex: 0 0 33.3%;
  @media only screen and (max-width: 832px) {
    flex: 0 0 50%;
  }
  @media only screen and (max-width: 475px) {
    flex: 0 0 100%;
  }
}
</style>