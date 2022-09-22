<template>
  <!-- 收获地址组件 -->
  <view>
    <view class="btnChooseAddress" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress">
        请选择收货地址+
      </button>
    </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>escook</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>138XXXX5555</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right"
          >河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx
          河北省邯郸市肥乡区xxx
        </view>
      </view>
    </view>
    <image src="@/static/cart_border@2x.png" class="adress-border" />
  </view>
</template>
<script>
export default {
  data() {
    return {
      address: JSON.parse(uni.getStorageSync("address") || "{}"),
    };
  },
  methods: {
    async chooseAddress() {
      const res = await uni.chooseAddress({
        success: () => {
          console.log(res);
        },
        fail() {
          console.log("未获取chooseAddress接口权限");
        },
      });
      // const [err, succ] = await uni.chooseAddress().catch((err) => err);
      // if (err === null && succ.errMsg === "chooseAddress:ok") {
      //   this.address = succ;
      //   uni.setStorageSync("address", JSON.stringify(succ));
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.adress-border {
  display: block;
  width: 100%;
  height: 5px;
}

.btnChooseAddress {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 渲染收货信息的盒子
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }

  // 第二行
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>
