<template>
  <div class="wrapper">
    <h1>Your Cart Items</h1>
    <div class="outside-main">     
        <div class="left-div">         
          <div class="loop-div" v-for="item in cartItems" :key="item.id" >
          <div class="imgDiv">
            <img :src="makeImagePath(item)" alt="" class="thumbnail">
          </div>
         <div class="details-div">           
            <div class="name-block"> <strong>{{item.name}}</strong> 
              <ul>              
                  <li>Price: ${{item.price}}</li>
                  <li>Details: {{item.size}}</li>
                  <li>Color: {{item.color}}</li>
                </ul> 
            </div>
            <div class="btn-block">
              <p @click="removeFromCart(item.id)" class="btnRemove">
                Remove
              </p>
            </div>
          </div>  
         </div>
        </div>     
        <section class="total-section"> 
          <ul class="total-section-list">
            <li class="total-section__item">
               <p class="total-section__item__label">{{cartItemsCount}} Items</p> 
               <p>${{findSubTotal}}</p>
            </li>
            <li class="total-section__item">  
              <p class="total-section__item__label">Shipping</p>
                <select v-model="selectedShippingOption">
                  <option disabled value="">Select an Option</option>
                  <option
                    v-for="option in shippingOptionsArray"
                    :key="option.text"
                    :value="option.rate">
                      {{ option.text }} (${{ option.rate }})
                    </option>
                </select>
            </li>
            <li class="total-section__item">
               <p class="total-section__item__label">Subtotal</p>
               <p>{{subTotalAfterShipping}}</p>
            </li>
             <li class="total-section__item">
               <p class="total-section__item__label">Tax ({{saleTaxPercent}})</p>
               <p>{{applySaleTax}}</p>
            </li>
            <li class="total-section__item">
               <p class="total-section__item__label">Total</p>
               <p>{{grandTotal}}</p>
            </li>
          </ul>   
          <button
            :disabled="!selectedShippingOption"
            :class="[isActive ? active : non-active]"
          >Check Out</button>        
        </section>     
      </div>     
  </div>
</template>

<script>
import {imagePath} from '../mixins/imagePath.js';
export default {
  name: 'cart',
  mixins: [imagePath],
  data() {
    return {
      saleTaxRate: 0.06,
      selectedShippingOption: '',
       shippingOptionsArray: [
        {
          text: '1 day',
          rate: 20,
        },
        {
          text: '2 days',
          rate: 15,
        },
        {
          text: '3 to 5 days',
          rate: 10,
        },
        {
          text: '7 days or more',
          rate: 5,
        },
      ]
    }
  },
  computed: {
    saleTaxPercent () {
      return `${this.saleTaxRate *100}%`;
    },
    applySaleTax() {
      if(this.selectedShippingOption){
        return (Number(this.subTotalAfterShipping) * 
          Number(this.saleTaxRate)).toFixed(2)
      }else{
        return '---';
      }
    },
    grandTotal(){
      if(this.selectedShippingOption) {
       return `$ ${Number(this.subTotalAfterShipping)+
        Number(this.applySaleTax)}`;
      }
      else {
        return '---';
      }
    },
    cartItems (){
      return this.$store.getters.cartItems;
    },
    cartItemsCount() {
      return this.cartItems.length;
    },
    // reducing array items to single value, in our case: the sum of all cart 
    // items’ prices. each element of the array, resulting in a single output value.
    findSubTotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    },
    subTotalAfterShipping() {
      if(this.selectedShippingOption){
        return Number (this.findSubTotal) + 
          Number (this.selectedShippingOption)
      }
      return '---'
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
  .outside-main {
    display: flex;
    box-shadow: 10px 5px 5px #9C9595;
    margin-bottom: 5rem;
  }
  .left-div {
    flex-basis: 80%;   
    // border: 1px solid #151212;   
    border-top: 1px solid #151212;   
    border-left: 1px solid #151212;   
    border-right: 1px solid #151212;   
  }
  .loop-div {
     display: flex;
  }  
  .imgDiv {
   flex-basis: 20%;
   border-bottom: 1px solid #151212;  
  }
  .details-div{
    // border: 1px dotted #999;
    background-color: #FCFCFC;
    border-bottom: 1px solid #151212;  
    text-align: left;
    order: 1;
    flex-basis: 80%;
  }
  .name-block {
    margin-top: 1rem;
    margin-left: 3rem;
    flex:3;
  }  
  .btn-block {
   flex:1;
   text-align: right;  
  }
  .btnRemove {
    color:red;
    margin-top:10px;
    margin-right: 5px;
    cursor: pointer;
  }
  .totalDiv {
     order: 2;
     flex-basis: 20%;
     flex-shrink: 0;
     border: 1px solid black;
     background-color: #F4F4F4;    
  }
  .totalDiv > .flushLeft {
    margin-left: 5px;
  }
  .totalDiv > .flushRight {
    margin-left: 45px;
  }
  
  .thumbnail {
    max-width:150px;
    height: 150;
    margin-top: .5rem;
  }
  .total-section {
    background: #FAFAFA;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    padding: 0 1rem 1rem;
  }
  .total-section-list {
    margin: 0;
  }
  .total-section__item{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .active{
     font-weight: bold;
     background-color: blueviolet;
     color:#fff;
     width:80%
  }
  .non-active {
    font-weight: bold;
     background-color: #999;
     width:80%;
    color:#fff;
}

</style>


// https://medium.com/@magyarn/build-an-online-store-with-vue-cli-part-6-4482129d15f3