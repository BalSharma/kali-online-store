import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [53363],
    products:  [
      {
        name: "Warm Jean Winter Jacket",
        id: 53362,
        price: 9.5,
        color: "white",
        size: "small",
        gender: "men",
        quantity: 10,
        dateAdded: "Tue Mar 24 2015 20:00:00 GMT-0400 (Eastern Daylight Time)",
        category: "Shirts",
        details: {
          material: "cotton",
          fit: "regular",
          maintenance: "machine wash",
          additional: "Some colors feature different-colored yarns for a heathered effect."
        },
        images: [
          '1001.jpg',
          '1002.jpg',
          '1003.jpg',
        ]
      },
      {
        name: "Blue Sweater",
        id: 53363,
        price: 49.5,
        color: "red",
        size: "medium",
        gender: "women",
        quantity: 8,
        dateAdded: "Mon Mar 23 2015 20:00:00 GMT-0400 (Eastern Daylight Time)",
        category: "Sweaters",
        details: {
          material: "cotton",
          fit: "regular",
          maintenance: "machine wash cold, air dry",
          additional: ""
        },
        images: [
          '1005.jpg',
          '1004.jpg',          
          '1006.jpg',
          '1007.jpg',
          '1008.jpg',
        ]
      },
      {
        name: "Body Fit Jeans",
        id: 53364,
        price: 29.5,
        color: "navy",
        size: {
          waist: 32,
          length: 32,
        },
        gender: "men",
        quantity: 5,
        dateAdded: "Wed Mar 25 2015 20:00:00 GMT-0400 (Eastern Daylight Time)",
        category: "Pants",
        details: {
          material: "denim",
          fit: "slim",
          maintenance: "machine wash cold with like colors, air dry",
          additional: ""
        },
        images: [
          '1009.jpg',
          '1010.jpg',
          '1011.jpg',
          '1011.jpg',
          '1012.jpg',
        ]
      },
    ]
  },
  mutations: {
    addToCart(state, payload){
      state.cart.push(Number(payload));
    },
    removeFromCart(state, payload){
      let indexToDelete = state.cart.indexOf(Number (payload));
      state.cart.splice(indexToDelete, 1)
    },
    decrementProductInventory(state, payload) {
      let product = state.products.find(p => p.id === Number(payload));
      product.quantity--;
    },
    incrementProductInventory(state,payload){
      let product = 
        state.products.find(p => p.id == Number (payload));
        product.quantity++;
    }
  },
  actions: {
    addToCart ({commit}, payload){
      commit('addToCart', payload);
      commit('decrementProductInventory', payload);
    },    
    removeFromCart ({commit}, payload) {
      commit('removeFromCart', payload)
      commit('incrementProductInventory',payload)
    }
  },
  getters: {
    product: (state) => (id) => {
      return state.products.filter(p => p.id === Number(id)) [0]
    },
    cartItems: (state) => {
      return state.cart.map(
        itemId => state.products.find(
          product => product.id === itemId
        )
      )
    }
  }
});
















