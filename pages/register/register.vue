<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toLogin">
				<image src="../../static/images/register/back.png"></image>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/login/logo.png"></image>
		</view>
		<view class="main">
			<view class="title">
				<text class="b_title">注册</text>
			</view>
			<view class="table">
				<view class="user-info">
					<input type="text" placeholder="取个昵称" class="user" placeholder-style="color:#ccc" v-model="name" @blur="isName"/>
					<view class="ocupy" v-if="isNameValid">昵称不可用</view>
					<image src="../../static/images/register/right.png" class="right" v-if="right[0]"></image>
				</view>
				<view class="user-info">
					<input type="email" placeholder="输入邮箱" placeholder-style="color:#ccc" v-model="emali" @blur="isEmailFormat"/>
					<view class="ocupy" v-if="isEmailValid">邮箱不可用</view>
					<image src="../../static/images/register/right.png" class="right" v-if="right[1]"></image>
				</view>
				<view class="user-info">
					<input 
					:type="type"
					placeholder="设置密码"
					placeholder-style="color:#ccc"
					@input="getPsw"
					/>
					<view class="ocupy" v-if="isPswValid">需大于6位</view>
					<image :src="lookImageUrl" class="eye" @tap="lookPassword"></image>
				</view>
			</view>
			<button :style="btnBackgroundColor" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 昵称是否有效
				isNameValid: false,
				// 邮箱是否有效
				isEmailValid: false,
				isPswValid: false,
				right: [false, false],
				// 查看小图标的显示与隐藏
				look: false,
				// 密码查看小图标
				lookImageUrl: '../../static/images/register/eye.png',
				// 密码的类型
				type: 'password',
				
				password: '',
				emali: '',
				name: '',
				bgColor: {
					'background-color': '#FFE431', 
					'box-shadow': '0 50rpx 32rpx -36rpx rgba(255, 228,40, .4)',
					}
			}
		},
		computed: {
			btnBackgroundColor () {
				if (!this.isEmailValid && !this.isNameValid && !this.isPswValid) {
					return this.bgColor
				}
			}
		},
		methods: {
			isName () {
				const nameRegx = /^[a-zA-Z0-9_-]{4,16}$/
				if (this.name === '') return
				this.isNameValid = !nameRegx.test(this.name) ? true : false
				this.right[0] = this.isNameValid ? false : true
			},
			isEmailFormat () {
				const emailRegx = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
				if (this.emali === '') return
				this.isEmailValid = !emailRegx.test(this.emali) ? true : false
				this.right[1] = this.isEmailValid ? false : true
			},
			lookPassword () {
				this.look = !this.look
				this.lookImageUrl = this.look ? '../../static/images/register/look.png' : '../../static/images/register/eye.png'
				this.type = this.look ? 'text' : 'password'
			},
			getPsw (e) {
				this.password = e.target.value
				if (this.password.length < 6) {
					this.isPswValid = true
				} else {
					this.isPswValid = false
				}
			},
			// 注册方法
			register () {
				if (this.isEmailValid || this.isNameValid || this.isPswValid) return
				console.log(this.name, this.emali, this.password)
			},
			toLogin () {
				uni.navigateBack({
				    delta: 1
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
				height: 46rpx;
				border-radius: 16rpx;
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
		}
		.table {
			margin-top: 68rpx;
			padding-left: 58rpx;
			.user-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				&:nth-child(n) {
					padding-top: 56rpx;
				}
				&:first-child {
					padding-top: 0;
				}
				image {
					width: 38rpx;
					height: 22rpx;
					padding-right: 62rpx;
				}
				.right {
					height: 30rpx;
				}
				input {
					height: 88rpx;
					font-size: 36rpx;
					color: #272832;
					line-height: 88rpx;
					border-bottom: 1px solid $uni-border-color;
					text-indent: .2em;
				}
				.ocupy {
					font-size: 28rpx;
					font-weight: 600;
					color: #ff5d5b;
					line-height: 88rpx;
					padding-right: 58rpx;
				}
			}
		}
		button {
			height: 96rpx;
			margin-top: 118rpx;
			width: 520rpx;
			background-color: lightgray;
			border-radius: 96rpx;
			line-height: 96rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: $uni-text-color;
		}
	}
</style>
