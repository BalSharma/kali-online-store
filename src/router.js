import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import ProductList from './views/ProductList.vue';
import Product from './views/Product.vue';
import GenderOverview from './views/GenderOverview.vue';
import Cart from './views/Cart.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },  
    {
      path: "/products",
      name: "products",
      component: ProductList
    },     
    {
      path: "/products/:id",
      name: "product",
      component: Product
    },   
    {
      path: "/cart",
      name: "cart",
      component: Cart
    },
    {
      path: "/:gender/",
      name: "gender-overview",
      component: GenderOverview
    },
    // ,
    // {  genderOverview
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
