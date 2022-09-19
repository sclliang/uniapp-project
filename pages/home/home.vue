<template>
  <view class="container-home">
    <!-- 轮播图 -->
    <uni-swiper-dot
      :info="swiperList"
      :current="current"
      field="content"
      :mode="mode"
      :dotsStyles="dotsStyles"
    >
      <swiper
        class="swiper-box"
        @change="change"
        autoplay
        :interval="3000"
        :duration="1000"
        circular
      >
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <navigator
            class="swiper-item"
            :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"
          >
            <image :src="item.image_src" mode="" />
          </navigator>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <!-- 分类导航 -->
    <view class="nav-list">
      <block v-for="(item, index) in navList" :key="index"
        ><view class="nav-item" @click="toCatePage(item)">
          <image :src="item.image_src" /> </view
      ></block>
    </view>
    <!-- 商品 -->
    <view class="floor-list">
      <block v-for="(item, index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" class="floor-title" />

        <!-- <image :src="product.image_src" /> -->
        <view class="floor-img-box">
          <navigator class="left" :url="item.product_list[0].url">
            <image
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
            />
          </navigator>
          <view class="right">
            <block
              v-for="(product, product_index) in item.product_list.slice(1)"
              :key="product_index"
            >
              <navigator :url="product.url">
                <image
                  :src="product.image_src"
                  :style="{ width: product.image_width + 'rpx' }"
                  mode="widthFix"
                />
              </navigator>
            </block>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
      current: 0,
      mode: "default",
      dotsStyles: {
        width: 8,
        backgroundColor: "#fff",
        selectedBackgroundColor: "#c00000",
        border: "3px solid  rgba(0, 0, 0, .3)",
      },
      navList: [],
      floorList: [],
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },
  methods: {
    // 获取轮播图
    async getSwiperList() {
      const { data: res } = await uni.$http.get("/home/swiperdata");
      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }
      this.swiperList = res.message;
      // console.log(this.swiperList);
      // uni.$showMsg("数据请求成功");
    },
    // 轮播图切换
    change(item) {
      // console.log(item);
      this.current = item.detail.current;
    },
    // 分类导航信息获取
    async getNavList() {
      const { data: res } = await uni.$http.get("/home/catitems");
      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }
      this.navList = res.message;
      // console.log(this.navList);
    },
    // 分类item点击事件
    toCatePage(item) {
      if (item.name === "分类") {
        uni.switchTab({ url: "/pages/cate/cate" });
      }
    },
    // 获取楼层信息
    async getFloorList() {
      const { data: res } = await uni.$http.get("/home/floordata");
      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }
      res.message.forEach((item) => {
        item.product_list.forEach((product) => {
          product.url =
            "/subpkg/goods_list/goods_list?" +
            product.navigator_url.split("?")[1];
        });
      });
      this.floorList = res.message;
      console.log(this.floorList);
    },
  },
};
</script>

<style lang="scss">
.container-home {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  .swiper-box {
    height: 330rpx;
    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }
  .nav-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: 20rpx;
    .nav-item {
      image {
        height: 140rpx;
        width: 128rpx;
      }
    }
  }
  .floor-list {
    width: 100%;
    margin-top: 40rpx;
    .floor-title {
      width: 100%;
      height: 60rpx;
      display: flex;
      // margin-top: 40rpx;
    }
    .floor-img-box {
      display: flex;
      justify-content: center;
      .left {
        margin-left: 10rpx;
        margin-right: 10rpx;
      }
      .right {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        // padding: 0 10rpx;
      }
    }
  }
}
</style>
