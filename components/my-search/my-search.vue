<template>
  <view class="my-search-container" :style="{ backgroundColor: bgColor }">
    <!-- 自定义搜索框 -->
    <view class="my-search-box" @click="handleClick">
      <uni-icons type="search" size="18" class="icons" />
      <text>{{ placeholder }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "my-search",
  data() {
    return {};
  },
  props: {
    placeholder: {
      type: String,
      default: "Search",
    },
    bgColor: {
      type: String,
      default: "#c00000",
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.my-search-container {
  //  background-color: #c00000;
  // width: 100%;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .my-search-box {
    width: 100%;
    height: 36px;
    background-color: #fff;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    .icons {
      margin-right: 5px;
    }
  }
}
</style>
