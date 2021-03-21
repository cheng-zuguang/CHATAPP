<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right">
				<text class="login" @tap="toRegister">注册</text>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/login/logo.png"></image>
		</view>
		<view class="main">
			<view class="title">
				<text class="b_title">登录</text>
				<text class="s_title">Welcome!</text>
			</view>
			<view class="table">
				<input 
					type="text" 
					name="account" 
					id="account" 
					placeholder="用户名" 
					placeholder-style="color:#ccc"
					v-model="userName"
					/>
				<input 
					type="password" 
					name="password" 
					id="password" 
					placeholder="请输入密码" 
					placeholder-style="color:#ccc"
					v-model="userPassword"
					/>
			</view>
			<view class="errors" v-if="show">请输入用户名或者密码</view>
			<button @tap="login">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				userPassword: '',
				show: false
			}
		},
		methods: {
			toRegister () {
				uni.navigateTo({
				    url: '../register/register'
				});
			},
			login () {
				if (this.userPassword.length && this.userName.length) {
					this.show = false
					
				} else {
					this.show = true
				}
				uni.request({
				    url: 'http://localhost:3000/test',//仅为示例，并非真实接口地址。
					method: 'POST',
				    success: (res) => {
						console.log(11);
				        console.log(res.data);
				    }
				})

			},
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
		flex-direction: row-reverse;
		position: fixed;
		top: 0;
		left: 0;
		height: 136rpx;
		width: 100%;
		align-items: center;
		padding-top: var(--status-bar-height);
		.top-bar-right {
			padding-right: 64rpx;
			.login {
				width: 72rpx;
				height: 50rpx;
				font-size: 36rpx;
				font-weight: 700;
				color: $uni-text-color;
				line-height: 136rpx;
			}
			
		}
	}
	.logo {
		width: 192rpx;
		height: 88rpx;
		margin-top: 256rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.main {
		width: 100%;
		margin-top: 58rpx;
		.title {
			display: flex;
			flex-direction: column;
			padding-left: 58rpx;
			.b_title {
				font-size: 54rpx;
				font-weight: 700;
				color: $uni-text-color;
				line-height: 80rpx;
			}
			.s_title {
				font-size: 40rpx;
				color: $uni-text-color-disable;
				line-height: 56rpx;
			}
		}
		.table {
			margin-top: 68rpx;
			padding-left: 58rpx;
			input {
				height: 88rpx;
				font-size: 36rpx;
				color: #272832;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
				text-indent: .2em;
				&:nth-child(2) {
					padding-top: 56rpx;
				}
			}	
		}
		.errors {
			float: left;
			padding-left: 58rpx;
			color: $uni-color-warning;
			line-height: 56rpx;
		}
		button {
			height: 96rpx;
			margin-top: 118rpx;
			width: 520rpx;
			background-color: $uni-color-primary;
			box-shadow: 0 50rpx 32rpx -36rpx rgba(255, 228,40, .4);
			border-radius: 96rpx;
			line-height: 96rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: $uni-text-color;
		}
	}
</style>
