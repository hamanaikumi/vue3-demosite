module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@use "@/assets/scss/prepends.scss";`,
      },
    },
  },
};
