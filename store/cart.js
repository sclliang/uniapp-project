export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync("cart") || "[]"),
  }),
  mutations: {
    setGoodsCart(state, goods) {
      // 判断cart列表是否有相同的商品
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      // 如果存在，就只将state中的相同商品的数量增加
      if (findResult) {
        findResult.goods_count++;
      } else {
        state.cart.push(goods);
      }
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
    saveCart(state, cartList) {
      state.cart = cartList;
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
  },
  getters: {
    total(state) {
      let count = 0;
      state.cart.forEach((goods) => (count += goods.goods_count));
      return count;
    },
  },
};
