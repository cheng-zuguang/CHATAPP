<template>
	<view class="content">
		<view class="top-bar">
			<view class="search">
				<input type="search" placeholder="搜索用户" placeholder-style="color:#ccc" v-model="name" @input="searchName"/>
				<image src="../../static/images/search/search.png"></image>
				<span class="cancel" @tap="back">取消</span>
			</view>
		</view>
		<view class="main">
			<text class="match-user" v-if="matchSerachUser">暂无用户...</text>
			<ul>
				<li>
					<h3 v-if="show = this.friendList.length ? true : false">用户</h3>
					<p class="result" v-for="friend in friendList" :key="friend.id">
						<navigator url="../userDetalis/userDetalis?id=1">
							<image :src="friend.inputUrl"></image>
						</navigator>
						<span class="name" v-html="friend.name"></span>
						<text class="send">发消息</text>
					</p>
					<!-- <p class="result">
						<image src="../../static/images/img/dm.jpg"></image>
						<span class="name">沙雕的实例</span>
						<text class="add-user">加好友</text>
					</p>
					<p class="result">
						<image src="../../static/images/img/dm.jpg"></image>
						<span class="name">沙雕的实例</span>
						<text class="send">发消息</text>
					</p> -->
				</li>
				<li>
					<h3>群组</h3>
					<p class="result">
						<image src="../../static/images/img/dm.jpg"></image>
						<span class="name">沙雕的实例</span>
						<text class="send">发消息</text>
					</p>
					<p class="result">
						<image src="../../static/images/img/dm.jpg"></image>
						<span class="name">沙雕的实例</span>
						<text class="send">发消息</text>
					</p>
					<p class="result">
						<image src="../../static/images/img/dm.jpg"></image>
						<span class="name">沙雕的实例</span>
						<text class="send">发消息</text>
					</p>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	export default {
		data() {
			return {
				name: '',
				friendList: [],
				show: false
			}
		},
		computed: {
			matchSerachUser () {
				return this.name.length > 0 && !this.friendList.length
			}
		},
		methods: {
			searchName () {
				if (this.name.length > 0) {
					this.friendList = datas.getFriendsList().filter( item => {
						return item.name.includes(this.name)
					})
					let reg = new RegExp(this.name, 'g')

					this.friendList.forEach(item => {
						item.inputUrl = '../../static/images/img/' + item.inputUrl
						item.name = item.name.replace(reg, `<span style="color: #4AAAFF;">${this.name}</span>`)
					})
				} else if (!this.name.length) {
					this.friendList = []
				}
			},
			back () {
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
	ul, li {
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
		height: 136rpx;
		width: 100%;
		align-items: center;
		background-color: #fff;
		padding-top: var(--status-bar-height);
		box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.1);
		z-index: 999;
		.search {
			width: 100%;
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			input {
				height: 60rpx;
				width: 530rpx;
				background-color: #f3f4f6;
				margin-left: 32rpx;
				padding: 0 60rpx 0 12rpx;
				border-radius: 10rpx;
			}
			image {
				width: 32rpx;
				height: 34rpx;
				position: absolute;
				right: 138rpx;
			}
			span {
				font-size: 28rpx;
				color: #272832;
				font-weight: 500;
				// line-height: 40rpx;
				padding-right: 16rpx;
			}
		}
		
	}
	.main {
		width: 100%;
		margin-top: 240rpx;
		.match-user {
			display: block;
			height: 50rpx;
			width: 100%;	
			color: $uni-text-color-grey;
			font-size: 36rpx;
			background-color: $uni-bg-color-grey;
			border-radius: 18rpx;
			line-height: 50rpx;
			padding-left: 30rpx;
			text-align: center;
		}
		ul {
			margin-left: 32rpx;
			
			h3 {
				font-size: 44rpx;
				color: #272832;
			}
			.result {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				margin-bottom: 40rpx;
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}
				.name {
					display: in;
					font-size: 36rpx;
					color: #272832;
					position: absolute;
					left: 144rpx;
				}
				text {
					display: inline-block;
					width: 120rpx;
					height: 48rpx;
					border-radius: 24rpx;
					font-size: 24rpx;
					line-height: 52rpx;
					text-align: center;
					margin-right: 32rpx;
				}
				.send {
					color: #272832;
					background: #ffe431;
				}
				.add-user {
					background: rgba(74,170,255,0.1);
					color: #4aaaff;
				}
				&:last-child {
					margin-bottom: 60rpx;
				}
			}

			
		}
	}
</style>
