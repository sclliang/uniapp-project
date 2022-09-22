<template>
	<view class="settle-container">
		<label class="radio">
			<radio color="#c00000" :checked="isFullCheck" @click="isCheckedClick" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计:<text class="amount">￥{{price}}</text>
		</view>
		<view class="btn-settle">
			结算<text>{{totalConut}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-settle",
		props: ['price', 'count', 'isFullCheck'],
		computed: {
			totalConut() {
				return '(' + this.count + ')'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			isCheckedClick() {
				this.$emit('checkedClick')
			}
		}

	}
</script>

<style lang="scss">
	.settle-container {
		position: fixed;
		bottom: 0%;
		left: 0%;
		height: 50px;
		width: 100%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
				font-weight: bold;
			}

		}

		.btn-settle {
			background-color: #c00000;
			height: 50px;
			color: #fff;
			text-align: center;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
		}
	}
</style>
