<template>
	<view>
		<block v-for="(item, index) in goodsList" :key="index">
			<view class="goods-list-container" v-if="goodsList.length>0" @click="handleClick(item)">
				<view class="goods-item-left">
					<image :src="item.goods_small_logo" />
				</view>
				<view class="goods-item-right">
					<view class="goods-title">{{ item.goods_name }}</view>
					<view class="goods-price">￥{{ item.goods_price | tofixed }}</view>
				</view>
			</view>
		</block>

		<view class="last" v-if="queryObj.pagenum>totalPages">
			<text>没有更多数据了~</text>
		</view>
	</view>
</template>

<script>
	export default {
		// 过滤器,给商品价格添加小数点后两位
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2);
			},
		},
		data() {
			return {
				queryObj: {
					query: "",
					cid: "",
					pagenum: 1,
					pagesize: 10,
				},
				goodsList: [],
				isLoading: false,
				totalPages: 0
			};
		},
		methods: {
			// 获取商品列表
			async getGoodsList() {
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get("/goods/search", this.queryObj);
				this.isLoading = false
				// 将原有数据与新获取的数据进行拼接
				this.goodsList = [...this.goodsList, ...res.message.goods];
				this.totalPages = res.message.total / this.queryObj.pagesize + 1

			},
			// 点击商品，进入商品详情事件
			handleClick(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		// onLoad中的options参数是页面跳转传递的参数
		onLoad(options) {
			this.queryObj.query = options.query || "";
			this.queryObj.cid = options.cid || "";
			this.getGoodsList();
		},
		// 上拉加载更多事件
		onReachBottom() {
			if (this.isLoading) return
			if (this.totalPages < this.queryObj.pagenum) return uni.$showMsg('没有跟多商品了')
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		// 上拉刷新事件
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.isLoading = false
			this.goodsList = []
			this.getGoodsList()
			uni.stopPullDownRefresh()
		}
	};
</script>

<style lang="scss" scoped>
	.goods-list-container {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;

		border-bottom: 1px solid rgb(240, 240, 240);

		.goods-item-left {
			height: 100%;
			width: 100px;

			image {
				height: 100px;
				width: 100px;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			margin-left: 5px;
			justify-content: space-between;

			.goods-price {
				color: red;

				font-size: 16px;

				margin-top: 10px;
			}

			.goods-title {
				font-size: 13px;
				margin-right: 5px;
			}
		}
	}

	.last {
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
		margin: 20px 0;
	}
</style>
