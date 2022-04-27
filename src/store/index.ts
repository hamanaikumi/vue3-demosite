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
    topNews: new Array<News>(),
    filteredNews: {} as News,
    signInFlag: false,
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
      state.topNews = [];

      for (const obj of newsArray) {
        const newDate = new Date(obj.date);
        const year = newDate.getFullYear();
        // 1ヶ月調整
        const month = newDate.getMonth() + 1;
        const date = newDate.getDate();

        state.news.push({
          id: obj.id,
          date: `${year}.${month}.${date}`,
          title: obj.title,
          detail: obj.detail,
          image: obj.image,
        });
      }
      // 最新のニュース3つを格納する
      const reverseArray = newsArray.reverse();
      for (let i = 0; i < 3; i++) {
        const newDate = new Date(reverseArray[i].date);
        const year = newDate.getFullYear();
        // 1ヶ月調整
        const month = newDate.getMonth() + 1;
        const date = newDate.getDate();
        state.topNews.push({
          id: reverseArray[i].id,
          date: `${year}.${month}.${date}`,
          title: reverseArray[i].title,
          detail: reverseArray[i].detail,
          image: reverseArray[i].image,
        });
      }
    },

    filterNews(state, id: number) {
      state.filteredNews = state.news.filter((news: News) => news.id == id)[0];
    },

    setSignInFlag(state) {
      if (state.signInFlag) {
        state.signInFlag = false;
      } else {
        state.signInFlag = true;
      }
    },
  },
  actions: {
    async getDrink(context) {
      const res = await axios.get(
        "https://vast-everglades-32808.herokuapp.com/drink"
      );
      context.commit("setDrink", res.data);
    },
    async getFood(context) {
      const res = await axios.get(
        "https://vast-everglades-32808.herokuapp.com/food"
      );
      context.commit("setFood", res.data);
    },
    async getShop(context) {
      const res = await axios.get(
        "https://vast-everglades-32808.herokuapp.com/shop"
      );
      context.commit("setShop", res.data);
    },
    async getNews(context) {
      const res = await axios.get(
        "https://vast-everglades-32808.herokuapp.com/news"
      );
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
    getTopNews(state: any) {
      return state.topNews;
    },
    getOneNews(state: any) {
      return state.filteredNews;
    },
    getSignInFlag(state: any) {
      return state.signInFlag;
    },
  },
  plugins: [createPersistedState()],
});
