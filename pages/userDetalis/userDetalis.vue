<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="back">
				<image src="../../static/images/userDetail/back.png"></image>
			</view>
			<view class="top-bar-right" @tap="toUserInfo">
				<image src="../../static/images/userDetail/more.png"></image>
			</view>
		</view>
		<view class="bg">
			<image src="../../static/images/img/dm.jpg" mode="aspectFill"></image>
		</view>
		<view class="avatar-group" :animation="avatarAnimationData">
			<image src="../../static/images/img/dm.jpg" class="avatar"></image>
			<view class="sex"><image src="../../static/images/userDetail/woman.png"></image></view>
		</view>
		<view class="main">
			<view class="content" :animation="contentAnimationData">
				<h3>高冷的奥利给</h3>
				<span>昵称：BB</span>
				<p>太子及宾客知其事者，皆白衣冠以送之。至易水上，既祖，取道。高渐离击筑，荆轲和而歌，为变徵之声，士皆垂泪涕泣。又前而为歌曰：“风萧萧兮易水寒，壮士一去兮不复还！”复为慷慨羽声，士皆瞋目，发尽上指冠。于是荆轲遂就车而去，终已不顾。</p>
			</view>
		</view>
		<button @tap="addUserAnimation(500)">加为好友</button>
		<view id="post-info" 
			:animation="postInfoAnimationData" 
			:style="{height: postUserHeight + 'px', bottom: '-'+postUserHeight + 'px'}" 
			>
			<h3>高冷的奥利给</h3>
			<textarea placeholder="快添加我,一起聊天吧~~" maxlength="30" />
			<view class="btn-groups" :animation="postInfoAnimationData">
				<button class="cancel" @tap="addUserAnimation(300)">取消</button>
				<button class="send">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				postUserHeight: '',
				postInfoAnimationData: {},
				avatarAnimationData: {},
				contentAnimationData: {},
				show: false,
				showPostUserMessage: false
			}
		},
		onReady () {
			this.getCurrentPosition()
		},
		methods: {
			getCurrentPosition () {
				const query = uni.createSelectorQuery().in(this);
				query.select('#post-info').boundingClientRect(data => {
				  this.postUserHeight = data.height - 186
				}).exec();
			},
			addUserAnimation (time) {
				this.show = !this.show
				const animationAboutPostInfo = uni.createAnimation({
				    duration: time,
				    timingFunction: 'ease'
				})
				const animationAboutAvatar = uni.createAnimation({
				    duration: time,
				    timingFunction: 'linear'
				})
				const animationAboutContent = uni.createAnimation({
				    duration: time,
				    timingFunction: 'step-start'
				})
				if (this.show) {
					animationAboutPostInfo.bottom(0).step()
					animationAboutAvatar.scale(0.6).translateX(-168).step()
					animationAboutContent.opacity(0).step()
		
				} else {
					animationAboutPostInfo.bottom(-this.postUserHeight).step()
					animationAboutAvatar.scale(1).translateX(0).step()
					animationAboutContent.opacity(1).step()
				}
				
				this.postInfoAnimationData = animationAboutPostInfo.export()
				this.avatarAnimationData = animationAboutAvatar.export()
				this.contentAnimationData = animationAboutContent.export()
			},
			back () {
				uni.navigateBack({
				    delta: 1
				})
			},
			toUserInfo () {
				uni.navigateTo({
				    url: '../userInfo/userInfo'
				});
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
		height: 136rpx;
		width: 100%;
		align-items: center;
		padding-top: var(--status-bar-height);
		.top-bar-left {
			padding-left: 36rpx;
			width: 88rpx;
			height: 88rpx;
			image {
				width: 26rpx;
				height: 52rpx;
				border-radius: 16rpx;
			}
		}
		.top-bar-right {
			width: 88rpx;
			height: 88rpx;
			image {
				width: 52rpx;
				height: 12rpx;
			}
		}
	}
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
			opacity: 0.4;
			filter: blur(9px);
			z-index: 999;
		}
	}
	.avatar-group {
		position: relative;
		width: 400rpx;
		height: 400rpx;
		border: 6rpx solid #ffffff;
		border-radius: 48rpx;
		overflow: hidden;
		margin-top: 148rpx;
		z-index: 11;
		.avatar {
			width: 100%;
			height: 100%;
			border-radius: 48rpx;
			border:  6rpx solid rgba(255, 255, 255, 1);
			box-shadow: 0 36rpx 40rpx 0 rgba(39, 40, 50, .1);
			z-index: 9;
		}
		.sex {
			position: absolute;
			bottom: 16rpx;
			right: 16rpx;
			width: 64rpx;
			height: 64rpx;
			background-color: #ff5d5b;
			border-radius: 36px;
			line-height: 72rpx;
			text-align: center;
			z-index: 10;
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
	.main {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-top: 48rpx;
		transform-style: preserve-3d;
		// overflow: hidden;
		.content {
			width: 552rpx;
			margin-top: 48rpx;	
			h3 {
				font-size: 52rpx;
				font-weight: 400;
				color: #272832;
				z-index: 9;
			}
			span {
				font-size: 28rpx;
				color: #272832;
				font-weight: 400;
			}
			p {
				word-break:break-all; // 换行
				font-size: 28rpx;
				color: #272832;
				font-weight: 300;
				margin-top: 20rpx;
			}
		}
	}

	button {
		width: 90%;
		height: 80rpx;
		background: #ffe431;
		border-radius: 10rpx;
		position: absolute;
		bottom: 80rpx;
		line-height: 80rpx;
		color: #272832;
		font-size: 32rpx;
		font-weight: 400;
	}
	#post-info {
		position: fixed;
		// bottom: 0;
		// top: 284rpx;
		left: 0;
		width: 100%;
		height: 100%;
		background: #ffffff;
		border-radius: 40rpx 40rpx 0px 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: space-between;
		z-index: 10;
		h3 {
			font-size: 52rpx;
			font-weight: 400;
			color: #272832;
			line-height: 37px;
			position: absolute;
			left: 60rpx;
			top: 168rpx;
		}
		textarea {
			width: 319px;
			height: 200px;
			background: #f3f4f6;
			border-radius: 20rpx;
			margin-top: 400rpx;
			padding: 18rpx 22rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #272832;
		}
		.btn-groups {
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			position: absolute;
			bottom: 40px;
			.cancel {
				width: 20%;
				left: 34rpx;
				bottom: 10rpx;
				background: rgba(39,40,50,0.1);
			}
			.send {
				width: 65%;
				right: 34rpx;
				bottom: 10rpx;
			}
			
		}
	}
</style>
