import Drink from "@/models/drink";
import Food from "@/models/food";
import Shop from "@/models/shop";
import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    drink: new Array<Drink>(),
    food: new Array<Food>(),
    shop: new Array<Shop>(),
  },
  mutations: {
    setDrink(state, drinkArray) {
      // 初期化
      state.drink = [];
      for (const obj of drinkArray) {
        const taxPrice = Math.floor(obj.price * 1.1).toLocaleString();

        state.drink.push({
          id: obj.id,
          name: obj.name,
          price: obj.price,
          includeTaxPrice: taxPrice,
          image: obj.image,
        });
      }
    },
    setFood(state, shopArray) {
      // 初期化
      state.food = [];
      for (const obj of shopArray) {
        const taxPrice = Math.floor(obj.price * 1.1).toLocaleString();

        state.food.push({
          id: obj.id,
          name: obj.name,
          price: obj.price,
          includeTaxPrice: taxPrice,
          image: obj.image,
        });
      }
    },
    setShop(state, shopArray) {
      // 初期化
      state.shop = [];
      for (const obj of shopArray) {
        state.shop.push({
          id: obj.id,
          name: obj.name,
          postCode: obj.postCode,
          address: obj.address,
          holiday: obj.holiday,
          tel: obj.tel,
          open: obj.open,
          seats: obj.seats,
          image: obj.image,
        });
      }
    },
  },
  actions: {
    async getDrink(context) {
      const res = await axios.get("http://localhost:3000/drink");
      context.commit("setDrink", res.data);
    },
    async getFood(context) {
      const res = await axios.get("http://localhost:3000/food");
      context.commit("setFood", res.data);
    },
    async getShop(context) {
      const res = await axios.get("http://localhost:3000/shop");
      context.commit("setShop", res.data);
    },
  },
  modules: {},
  getters: {
    getAllDrink(state: any) {
      console.log(state.drink);
      return state.drink;
    },
    getAllFood(state: any) {
      console.log(state.food);
      return state.food;
    },
    getAllShop(state: any) {
      console.log(state.shop);
      return state.shop;
    },
  },
});
