<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="back">
				取消
			</view>
			<view class="top-bar-center">
				<h3>创建群聊</h3>
			</view>
			<view class="top-bar-right">
				确定
			</view>
		</view>
		<view class="main">
			<view class="m-psw" v-if="show">
				<input type="password" placeholder="请输入旧密码">
				<input type="password" placeholder="请输入新密码">
			</view>
			<textarea value="原来的信息" maxlength="15" v-else></textarea>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		},
		onLoad (option) {
			if (option.show === 'true') {
				this.show = true
			}
		},
		methods: {
			back () {
				uni.navigateBack({
				    delta: 1
				})
			}
		}
	}
</script>

<style lang="scss"> 
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: $uni-spacing-col-base;
	}
	.top-bar {
		display: flex;
		z-index: 999;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding-top: var(--status-bar-height);
		background: #ffffff;
		box-shadow: 0px 2rpx 0px 0px rgba(0,0,0,0.1);
		.top-bar-left {
			padding-left: 36rpx;
			width: auto;
			height: 88rpx;
			line-height: 88rpx;
			image {
				width: 26rpx;
				height: 52rpx;
				border-radius: 16rpx;
			}
		}
		.top-bar-center {
			width: auto;
			height: 88rpx;
			h3 {
				font-size: 40rpx;
				font-weight: 400;
				color: #272832;
			}
		}
		.top-bar-right {
			margin-right: 32rpx;
			font-size: 32rpx;
			color: #4aaaff;
		}
	}
	
	.main {
		margin-top: 122rpx;
		width: 90%;
		padding: 0 32rpx;
		.m-psw {
			input {
				height: 80rpx;
				background: #f3f4f6;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				text-indent: 1em;
			}
		}
		textarea {
			height: 300rpx;
			width: 100%;
			background: #f3f4f6;
			border-radius: 20rpx;
			text-indent: 1em;
			padding-top: 10rpx;
		}
	}
</style>
