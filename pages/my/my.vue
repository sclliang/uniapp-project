<template>
	<view>
		<!-- 用户未登录时，显示登录组件 -->
		<my-login v-if="!token"></my-login>

		<!-- 用户登录后，显示用户信息组件 -->
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixin/badgeMix.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {

			};
		},

	}
</script>

<style lang="scss">

</style>
