<template>
	<view>
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" radius="20" v-model="searchMsg" @input="input" cancelButton="none">
			</uni-search-bar>
		</view>
		<view v-if="JSON.stringify(qsearchList) !== '[]'" class="qsearch">
			<block v-for="(item, index) in qsearchList" :key="index">
				<view class="qsearch-item" @click="itemClick(item)">
					<view class="search-text">{{ item.goods_name }}</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</block>
		</view>
		<view v-else class="history-box">
			<view class="history-title">
				<view class="title">搜索历史</view>
				<uni-icons type="trash" size="17" class="icons" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				<block v-for="(item, index) in historyList" :key="index">
					<uni-tag :text="item" size="normal" type="default" @click="tagClick(item)" />
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchMsg: "",
				timer: null,
				qsearchList: [],
				historyList: [],
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync("historyList") || "[]");
		},
		methods: {
			// 输入框输入事件
			input() {
				// 防抖处理
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					if (this.timer) {
						clearTimeout(this.timer);
					}
					this.getQsearchList();
				}, 500);
			},
			// 联想搜索事件
			async getQsearchList() {
				if (this.searchMsg === "") {
					this.qsearchList = [];
					return;
				}
				const {
					data: res
				} = await uni.$http.get(
					"/goods/qsearch?query=" + this.searchMsg
				);
				if (res.meta.status !== 200) return uni.$showMsg();
				this.qsearchList = res.message;
			},
			// 点击搜索结果
			itemClick(item) {
				this.saveSearchHistory(this.searchMsg);
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
				});
			},

			// 存储搜索历史
			saveSearchHistory(value) {
				// 存在历史记录时，将之前的记录删除，再重新插入到最前面
				if (this.historyList.includes(value)) {
					this.historyList.forEach((item, index) => {
						if (item === value) {
							this.historyList.splice(index, 1);
						}
					});
				}
				this.historyList.unshift(value);
				// 本地存储
				uni.setStorageSync("historyList", JSON.stringify(this.historyList));
			},
			// 点击搜索历史
			tagClick(item) {
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?query=" + item,
				});
			},
			// 清空历史记录
			clearHistory() {
				this.historyList = [];
				try {
					uni.removeStorageSync("historyList");
				} catch {
					return;
				}
			},
		},
	};
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.qsearch {
		padding: 0 5px;

		.qsearch-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15px 0;
			font-size: 12px;
			border-bottom: 1px solid rgb(240, 240, 240);

			.search-text {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 10px 0;

		.history-title {
			// margin-top: 10px;
			margin: 0 5px;
			margin-bottom: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #333;
			border-bottom: 1px solid rgb(240, 240, 240);

			.icons {
				margin-bottom: 10px;
			}

			.title {
				margin-bottom: 10px;
				font-size: 12px;
				font-weight: bold;
			}
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
