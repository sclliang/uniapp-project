// #ifndef VUE3
import Vue from "vue";
import App from "./App";

// 按需导入 $http 对象
import { $http } from "@escook/request-miniprogram";

// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
wx.$http = $http;

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http;
$http.baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
// 请求拦截器
$http.beforeRequest = function (options) {
  // 添加loading效果
  uni.showLoading({
    title: "加载中...",
    mask: true,
  });
};
// 相应拦截器
$http.afterRequest = function () {
  // 关闭loading效果
  uni.hideLoading();
};

// 封装展示消息提示的方法
uni.$showMsg = function (title = "数据请求失败", duration = 1500) {
  uni.showToast({
    title,
    icon: "none",
    mask: true,
    duration,
  });
};

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
