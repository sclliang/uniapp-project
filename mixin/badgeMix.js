import {
	mapGetters
} from "vuex";
export default {
	computed: {
		...mapGetters("cart", ["total"]),
	},
	onLoad(options) {
		this.setBadge();
	},
	methods: {
		setBadge() {
			// 给tabBar添加数字徽标，index表示要设置的tabBar的index
			uni.setTabBarBadge({
				index: 1,
				text: this.total.toString(),
			});
		},
	},

}
