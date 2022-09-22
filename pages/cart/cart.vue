<template>
	<view class="cart-view" v-if="cart.length>0">
		<my-adress></my-adress>
		<!-- 商品列表 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18" />
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品数据 -->
		<view class="goods-list">
			<uni-swipe-action>
				<block v-for="(item, index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="swiperActionClickHandle(item)">
						<view class="goods-list-container" v-if="cart.length > 0">
							<view class="goods-item-left">
								<radio :checked="item.is_promote" color="#c00000" @click="showChecked(index)" />
								<image :src="item.goods_small_logo" />
							</view>
							<view class="goods-item-right">
								<view class="goods-title">{{ item.goods_name }}</view>
								<view class="goods-price">
									<text>￥{{ item.goods_price | tofixed }}</text>
									<view class="goods-count">
										<!-- <button
                  type="info"
                  size="mini"
                  @click="$store.state.cart.cart[index].goods_count--"
                  :disabled="item.goods_count == 1"
                >
                  -
                </button>
                <text>{{ item.goods_count }}</text>
                <button
                  type="info"
                  size="mini"
                  @click="$store.state.cart.cart[index].goods_count++"
                >
                  +
                </button> -->
										<uni-number-box v-model="item.goods_count" :min="1"
											@change="numChange(index)" />
									</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
		<!-- 结算区域 -->
		<my-settle :price="totalPrice" :count="totalCount" :isFullCheck="isFullCheck" @checkedClick="checkedClick">
		</my-settle>
	</view>

	<view v-else class="cart-empty">
		<image src="@/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from "@/mixin/badgeMix.js";
	import {
		mapState
	} from "vuex";

	export default {
		// 全局导入购物车徽标数量
		mixins: [badgeMix],
		// 过滤器，给商品价格添加两位小数
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2);
			},
		},
		computed: {
			...mapState("cart", ["cart"]),
			// 选择的商品总价格
			totalPrice() {
				let price = 0;
				this.cart.forEach((item) => {
					if (item.is_promote) {
						return (price += item.goods_price * item.goods_count);
					}
				});
				return price;
			},
			// 选择的商品合计数量
			totalCount() {
				let total = 0;
				this.cart.forEach((item) => {
					if (item.is_promote) {
						return total += item.goods_count;
					}
				});
				return total
			},
			// 全选状态
			isFullCheck() {
				let total = 0;
				this.cart.forEach((item) => total += item.goods_count);
				return total == this.totalCount

			}
		},
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: "c00000",
					},
				}, ],
			};
		},
		methods: {
			// 商品选择框点击事件
			showChecked(index) {
				this.cart[index].is_promote = !this.cart[index].is_promote;
				this.$store.commit("cart/saveCart", this.cart);
				// console.log(this.cart[index]);

			},
			// 商品添加减少按钮点击
			numChange(index) {
				// this.cart[index].goods_count++;
				setTimeout(() => {
					// console.log(this.cart[index].goods_count);
					this.$store.commit("cart/saveCart", this.cart);
					this.setBadge();
				});
			},
			// 全选按钮点击事件
			checkedClick() {
				if (this.isFullCheck) {
					this.cart.forEach(item => {
						item.is_promote = false
					})
				} else {
					this.cart.forEach(item => {
						item.is_promote = true
					})
				}
				this.$store.commit("cart/saveCart", this.cart);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}

	.goods-list-container {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;

		border-bottom: 1px solid rgb(240, 240, 240);

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			image {
				height: 100px;
				width: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			margin-left: 5px;
			justify-content: space-between;

			.goods-price {
				color: red;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 16px;
				margin-top: 10px;
			}

			.goods-title {
				font-size: 13px;
				margin-right: 5px;
			}
		}
	}

	.cart-view {
		padding-bottom: 50px;
	}

	.cart-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
