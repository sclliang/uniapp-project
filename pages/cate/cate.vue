<!-- 分类页面 -->

<template>
  <view>
    <my-search @click="handleSearchClick"></my-search>
    <view class="scroll-view-container">
      <!-- 左边区域 -->
      <scroll-view
        class="scroll-view-left"
        scroll-y
        :style="{ height: wh + 'px' }"
      >
        <block v-for="(item, index) in cateList" :key="index">
          <view
            class="left-item"
            :class="{ 'left-item-active': current == index }"
            @click="handleXItemClick(index)"
            >{{ item.cat_name }}</view
          >
        </block>
      </scroll-view>
      <!-- 右侧区域 -->

      <scroll-view
        scroll-y
        :scroll-top="scrollTop"
        class="scroll-view-right"
        :style="{ height: wh + 'px' }"
      >
        <block v-for="(item, index) in cateLevel" :key="index">
          <view class="item-title">/ {{ item.cat_name }} /</view>
          <view class="shop-info">
            <view
              v-for="cate in item.children"
              :key="cate.cat_id"
              class="item-info"
              @click="handleGoodsItemClick(cate)"
            >
              <image :src="cate.cat_icon" class="item-icon" />
              <view class="item-name">{{ cate.cat_name }}</view>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0,
      current: 0,
      cateList: [],
      cateLevel: [],
      scrollTop: 0,
    };
  },
  onLoad(options) {
    // 获取当前手机设备信息
    const phone = uni.getSystemInfoSync();
    this.wh = phone.windowHeight - 50;
    this.getCateList();
  },
  methods: {
    handleXItemClick(index) {
      this.current = index;
      this.cateLevel = this.cateList[index].children;
      // 当切换左侧item时，让右侧滚动条重置到最顶部
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
    },
    // 获取左侧分类列表
    async getCateList() {
      const { data: res } = await uni.$http.get("/categories");
      this.cateList = res.message;
      // 二级分类赋值
      this.cateLevel = res.message[0].children;
      // console.log(this.cateLevel);
    },
    // 商品点击事件
    handleGoodsItemClick(item) {
      uni.navigateTo({
        url: "/subpkg/goods_list/goods_list?cid=" + item.cat_id,
      });
    },
    // 搜索框点击事件
    handleSearchClick() {
      uni.navigateTo({
        url: "/subpkg/search/search",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-view-container {
  display: flex;
  // flex-direction: column;
  .scroll-view-left {
    // height: calc(100vh-30px);
    width: 120px;
    .left-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &-active {
        background-color: #ffffff;
        position: relative;
        &::before {
          content: "";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .scroll-view-right {
    width: calc(100vw-120px);
    .item-title {
      font-size: 12px;
      font-weight: bold;
      color: #000000;
      text-align: center;
      padding: 15px 0;
    }
    .shop-info {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      // justify-content: space-around;
      // align-items: center;
      // margin-bottom: 40rpx;
      .item-info {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .item-icon {
          width: 120rpx;
          height: 120rpx;
        }
      }
    }
  }
}
</style>
