import Drink from "@/models/drink";
import Food from "@/models/food";
import News from "@/models/news";
import Shop from "@/models/shop";
import axios from "axios";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    // ドリンクメニュー
    drink: new Array<Drink>(),
    // フードメニュー
    food: new Array<Food>(),
    // 店舗
    shop: new Array<Shop>(),
    // ニュース(全件)
    news: new Array<News>(),
    // ニュース(最新3件)
    topNews: new Array<News>(),
    // ニュース(1件)
    filteredNews: {} as News,
    // ログイン状態判定
    signInFlag: false,
    // モダール表示判定
    modalFlag: false,
    // 削除するデータ
    deleteData: {
      id: Number,
      category: String,
      name: String,
      image: String,
    },
  },
  mutations: {
    /**
     * 取得したドリンクメニューを格納する.
     * @param state ステート
     * @param drinkArray ドリンクメニュー
     */
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
    /**
     * 取得したフードメニューを格納する.
     * @param state ステート
     * @param drinkArray フードメニュー
     */
    setFood(state, foodArray) {
      // 初期化
      state.food = [];
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
    /**
     * 取得した店舗情報を格納する.
     * @param state ステート
     * @param drinkArray 店舗情報
     */
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
    /**
     * 取得したニュースを格納する.
     * @param state ステート
     * @param drinkArray ニュース
     */
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
    /**
     * idの一致するニュースを格納する.
     * @param state ステート
     * @param id ニュースID
     */
    filterNews(state, id: number) {
      state.filteredNews = state.news.filter((news: News) => news.id == id)[0];
    },

    /**
     * ログインしている場合はログアウト、ログアウトいている場合はログインに切り替える.
     * @param state ステート
     */
    setSignInFlag(state) {
      if (state.signInFlag) {
        state.signInFlag = false;
      } else {
        state.signInFlag = true;
      }
    },

    /**
     * モーダルが表示されている場合は非表示に、モーダルが表示されていない場合は表示に切り替える.
     * @param state ステート
     */
    changeModalFlag(state) {
      if (state.modalFlag) {
        state.modalFlag = false;
      } else {
        state.modalFlag = true;
      }
    },

    /**
     * 削除するデータをストアに格納する.
     * @param state ステート
     * @param deleteData 削除するデータのオブジェクト
     */
    setDeleteData(state, deleteData) {
      state.deleteData = deleteData;
    },
  },
  actions: {
    /**
     * ドリンクメニュー全件を取得する.
     * @param context
     */
    async getDrink(context) {
      const res = await axios.get(
        "https://vast-everglades-32808.herokuapp.com/drink"
      );
      context.commit("setDrink", res.data);
    },
    /**
     * フードメニュー全件を取得する.
     * @param context
     */
    async getFood(context) {
      const res = await axios.get(
        "https://vast-everglades-32808.herokuapp.com/food"
      );
      context.commit("setFood", res.data);
    },
    /**
     * 店舗情報全件を取得する.
     * @param context
     */
    async getShop(context) {
      const res = await axios.get(
        "https://vast-everglades-32808.herokuapp.com/shop"
      );
      context.commit("setShop", res.data);
    },
    /**
     * ニュース全件を取得する.
     * @param context
     */
    async getNews(context) {
      const res = await axios.get(
        "https://vast-everglades-32808.herokuapp.com/news"
      );
      context.commit("setNews", res.data);
    },
  },
  modules: {},
  getters: {
    /**
     * ドリンクメニューを返す.
     * @param state ステート
     * @returns ドリンクメニュー
     */
    getAllDrink(state: any) {
      return state.drink;
    },
    /**
     * フードメニューを返す.
     * @param state ステート
     * @returns フードメニュー
     */
    getAllFood(state: any) {
      return state.food;
    },
    /**
     * 店舗情報を返す.
     * @param state ステート
     * @returns 店舗情報
     */
    getAllShop(state: any) {
      return state.shop;
    },
    /**
     * ニュースを返す.
     * @param state ステート
     * @returns ニュース
     */
    getAllNews(state: any) {
      return state.news;
    },
    /**
     * ニュース(最新3件)を返す.
     * @param state ステート
     * @returns ニュース(最新3件)
     */
    getTopNews(state: any) {
      return state.topNews;
    },
    /**
     * ニュース(IDで絞り込んだ1件)を返す.
     * @param state ステート
     * @returns ニュース(IDで絞り込んだ1件)
     */
    getOneNews(state: any) {
      return state.filteredNews;
    },
    /**
     * ログイン状態を返す.
     * @param state ステート
     * @returns ログイン状態
     */
    getSignInFlag(state: any) {
      return state.signInFlag;
    },
    /**
     * モーダルの表示状態を返す.
     * @param state ステート
     * @returns モーダルの状態
     */
    getModalFlag(state: any) {
      return state.modalFlag;
    },
    /**
     * 削除するデータを返す.
     * @param state ステート
     * @returns 削除するデータ
     */
    getDeleteData(state: any) {
      return state.deleteData;
    },
  },
  plugins: [createPersistedState()],
});
