import Drink from "@/models/drink";
import Food from "@/models/food";
import News from "@/models/news";
import Shop from "@/models/shop";
import axios from "axios";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    drink: new Array<Drink>(),
    food: new Array<Food>(),
    shop: new Array<Shop>(),
    news: new Array<News>(),
    filteredNews: {} as News,
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
    setNews(state, newsArray) {
      // 初期化
      state.news = [];
      for (const obj of newsArray) {
        const newDate = new Date(obj.date);
        const year = newDate.getFullYear();
        // 1ヶ月調整
        const month = newDate.getMonth() + 1;
        const date = newDate.getDate();

        state.news.push({
          id: obj.id,
          date: `${year}/${month}/${date}`,
          title: obj.title,
          detail: obj.detail,
          image: obj.image,
        });
      }
    },
    filterNews(state, id: number) {
      state.filteredNews = state.news.filter((news: News) => news.id == id)[0];
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
    async getNews(context) {
      const res = await axios.get("http://localhost:3000/news");
      context.commit("setNews", res.data);
    },
  },
  modules: {},
  getters: {
    getAllDrink(state: any) {
      return state.drink;
    },
    getAllFood(state: any) {
      return state.food;
    },
    getAllShop(state: any) {
      return state.shop;
    },
    getAllNews(state: any) {
      return state.news;
    },
    getOneNews(state: any) {
      return state.filteredNews;
    },
  },
  plugins: [createPersistedState()],
});
