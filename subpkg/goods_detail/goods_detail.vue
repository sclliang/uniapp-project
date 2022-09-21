<template>
	<view class="goods_detail_container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :current="current" circular
			@change="change">
			<swiper-item v-for="(item,index) in goodsDetailData.pics" :key="index" @click="fullScreen(index)">
				<image :src="item.pics_big" mode=""></image>
			</swiper-item>

		</swiper>
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price" v-if="JSON.stringify(goodsDetailData)!=='{}'">
				<text>￥ {{goodsDetailData.goods_price}}</text>
			</view>
			<!-- 商品名字 -->
			<view class="goods-info-name">
				<view class="left">
					{{goodsDetailData.goods_name}}
				</view>
				<view class="right" @click="hanldeClick">
					<uni-icons :type="isShow?'star':'star-filled'" size="30" :color="!isShow?'red':'#999'"></uni-icons>

					<text>收藏</text>
				</view>
			</view>
			<!-- 快递 -->
			<view class="yf">
				快递：免运费
			</view>
		</view>
		<!-- 商品详情 -->
		<rich-text :nodes="goodsDetailData.goods_introduce"></rich-text>
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsDetailData: {},
				id: '0',
				current: 0,
				isShow: true,
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#c00000',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {

			this.id = options.goods_id
			this.getGoodsDetail()
		},
		methods: {
			// 获取商品数据
			async getGoodsDetail() {
				const {
					data: res
				} = await uni.$http.get('/goods/detail', {
					goods_id: this.id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				// 解决商品详情图片底部空白间隙
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"')
				// webp在ios设备上无法正常显示，要转化成jpg格式
				res.message.goods_introduce = res.message.goods_introduce.replace(/webp /g, 'jpg')
				this.goodsDetailData = res.message
				console.log(this.goodsDetailData);
			},
			change(item) {
				this.current = item.detail.current
			},
			// 全屏预览API
			fullScreen(index) {
				uni.previewImage({
					// 当前查看的图片index
					current: index,
					// 图片url数组
					urls: this.goodsDetailData.pics.map(x => x.pics_big),
					// 图片顶部数字指示器
					indicator: 'number'

				})
			},
			hanldeClick() {
				this.isShow = !this.isShow
			},
			// 加入购物车、立即购买点击事件，加入购物车index为0，立即购买为1
			buttonClick(item) {
				console.log(item);
				if (item.index === 0) {

					this.options[2].info++

				}
			},
			// 电铺、客服点击事件
			onClick(item) {
				// 进入购物车页面
				if (item.index === 2) {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
				console.log(item);
			}
		}
	};
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 10px;
		padding-right: 0;

		.goods-price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-name {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.right {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #999;
				border-left: 1px solid #efefef;
			}

			.left {
				font-size: 13px;
				margin-right: 10px;
			}
		}

		.yf {
			font-size: 12px;
			margin: 10px 0;
			color: #999;
		}

	}

	.uni-goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-radius: 0;
	}

	.goods_detail_container {
		padding-bottom: 50px;
	}
</style>
