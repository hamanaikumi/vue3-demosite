import Drink from "@/models/drink";
import Food from "@/models/food";
import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    drink: new Array<Drink>(),
    food: new Array<Food>(),
  },
  mutations: {
    setDrink(state, drinkArray) {
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
    setFood(state, foodArray) {
      for (const obj of foodArray) {
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
  },
});
