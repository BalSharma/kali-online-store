<template>
  <div class="wrapper">
    <h1>Cart</h1>
    <ul class="cart-list">
      <li class="flex-col cart-list__item" 
        v-for="item in cartItems" :key="item.id">
        <img :src="makeImagePath(item)" alt="" class="thumbnail">
        <!-- <div class="flex-col"> -->    
        <div class="leftTitle">           
          {{item.name}}
           <button @click="removeFromCart(item.id)"
              class="btn cart-list__btn-remove">
                Remove
            </button><br>
            <ul class="detail-list">
              <li>Price: ${{item.price}}</li>
              <li>Details: {{item.size}}</li>
              <li>Color: {{item.color}}</li>
            </ul>            
        </div>         
      </li>      
    </ul>
  </div>
</template>

<script>
import {imagePath} from '../mixins/imagePath.js';
export default {
  name: 'cart',
  mixins: [imagePath],
  computed: {
    cartItems (){
      return this.$store.getters.cartItems;
    }
  },
  methods: {
    removeFromCart(itemId) {
      this.$store.dispatch('removeFromCart', itemId);
    }
  }
}
</script>

<style lang="scss">
  .cart-list {
    width: 70%;    
    @media only screen and (max-width: 832px) {
      width:100%;
    }
  }
  .cart-list__item{
    width: 100%;  
    border-bottom: 1px solod #2c3e50;
  }
  .cart-list__item__details {
    flex: 2;     
    justify-content:space-between;
    margin-left: 2rem;
  }
  .cart-list__btn-remove {    
    color: red;
    &:hover {
      color:blue;
    }
  }
  .thumbnail {
    max-width:150px;
    height: 150;
    margin-top: .5rem;
  }
  .flex-col {
    margin-left: 25px;
  }
  .leftTitle {
    font-weight: bold;
    text-align: left;
    margin-top: 40px;
    margin-left: 30px;
  }
  .rightBtn {
    width: 20%;   
  }  
  .detail-list {   
    font-size: 14px;
    font-weight: normal;
  }
</style>
