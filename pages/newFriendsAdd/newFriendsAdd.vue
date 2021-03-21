<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/userInfo/back.png"></image>
			</view>
			<view class="top-bar-center">
				<h3>好友请求</h3>
			</view>
			<view class="top-bar-right"> <!-- 占位 --></view>
		</view>
		<view class="main">
			<ul>
				<li>
					<view class="option">
						<view class="reject">拒绝</view>
						<view class="agree">同意</view>
					</view>
					<image src="../../static/images/img/dm.jpg" class="avatar"></image>
					<view class="info">
						<h3>高冷的奥利给</h3>
						<p>2020-12-12</p>
					</view>
					<view class="message">
						留言：你好，奥利给。我是奥利给的迷妹，嗷嗷嗷。就很奈斯了
					</view>
				</li>
				<li>
					<view class="option">
						<view class="reject">拒绝</view>
						<view class="agree">同意</view>
					</view>
					<image src="../../static/images/img/dm.jpg" class="avatar"></image>
					<view class="info">
						<h3>高冷的奥利给</h3>
						<p>2020-12-12</p>
					</view>
					<view class="message">
						留言：你好，奥利给。我是奥利给的迷妹，嗷嗷嗷。就很奈斯了
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
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
			width: 88rpx;
			height: 88rpx;
			line-height: 108rpx;
			image {
				width: 26rpx;
				height: 52rpx;
				border-radius: 16rpx;
			}
		}
		.top-bar-center {
			width: 188rpx;
			height: 88rpx;
			margin-right: 120rpx;
			h3 {
				font-size: 40rpx;
				font-weight: 400;
				color: #272832;
			}
		}
	}
	.main {
		margin-top: 220rpx;
		ul {
			li {
				position: relative;
				width: 90%;
				height: 388rpx;
				background: #ffffff;
				border-radius: 20rpx;
				box-shadow: 0px 24rpx 64rpx -8rpx rgba(0,0,0,0.1); 
				margin: 0 0 112rpx 36rpx;
				.option {
					display: flex;
					justify-content: space-between;
					height: 64rpx;
					width: 100%;
					view {
						width: 160rpx;
						height: 100%;
						border-radius: 40rpx;
						line-height: 64rpx;
						text-align: center;
						font-size: 16px;
						margin-top: 30rpx;
					}
					.reject {
						background: rgba(255,93,91,0.1);
						color: #ff5d5b;
						margin-left: 32rpx;
					}
					.agree {
						background: #ffe431;
						color: #272832;
						margin-right: 32rpx;
					}
				}
				.avatar {
					position: absolute;
					top: -72rpx;
					left: 50%;
					margin-left: -72rpx;
					width: 144rpx;
					height: 144rpx;
					border-radius: 50%;
				}
				.info {
					width: 100%;
					text-align: center;
					margin-top: 60rpx;
					h3 {
						font-size: 36rpx;
						color: #272832;
					}
					p {
						font-size: 24rpx;
						font-weight: 400;
						color: rgba(39,40,50,0.4);
					}
				}
				.message {
					height: 78rpx;
					width: 86%;
					margin: 40rpx 0 32rpx 30rpx;
					background: #f3f4f6;
					border-radius: 20rpx;
					padding: 22rpx 32rpx 20rpx 22rpx;
					font-size: 28rpx;
					color: #272832;
				}
			}
		}
	}
</style>
