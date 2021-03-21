<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toUserDetail">
				<image src="../../static/images/img/dm.jpg"></image>
			</view>
			<view class="top-bar-center">
				 <image src="../../static/images/index/logo.png"></image>
			</view>
			<view class="top-bar-right">
				<view class="search" @tap="toSearch">
					<image src="../../static/images/index/search.png"></image>
				</view>
				<view class="add">
					<image src="../../static/images/index/add.png"></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="friends apply">
				<view class="friend-list">
					<view class="friend-list-left">
						<text class="tip">99</text>
						<image src="../../static/images/img/friend.png" ></image>
					</view>
					<view class="friend-list-right">
						<view class="top">
							<view class="name">新的朋友</view>
							<view class="time">刚刚</view>
						</view>
						<view class="bottom">
							<view class="infomation">新的好友申请</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="friends">
				<view 
					class="friend-list" 
					v-for="data in friendList" 
					:key="data.id" 
					@tap="toChatBox(data.id)"
					>
					<view class="friend-list-left">
						<text class="tip">{{ data.tip }}</text>
						<image :src="data.inputUrl" ></image>
					</view>
					<view class="friend-list-right">
						<view class="top">
							<view class="name">{{ data.name }}</view>
							<view class="time">{{ data.time | dealTimeFormat }}</view>
						</view>
						<view class="bottom">
							<view class="infomation">{{ data.info }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import friendsData from '../../commons/js/datas.js'
	import timeFormat from '../../commons/js/timeFormat.js'
	
	export default {
		data() {
			return {
				friendList: []  	
			}
		},
		onLoad() {
			this.getFriendsData()
		},
		methods: {
			getFriendsData () {
				this.friendList = friendsData.getFriendsList()
				this.friendList.forEach( (item, index) => {
					item.inputUrl = '../../static/images/img/' + item.inputUrl
				})
			},
			toSearch () {
				uni.navigateTo({
				    url: '../search/search'
				});
			},
			toUserDetail () {
				uni.navigateTo({
				    url: '../userDetalis/userDetalis?id=1'
				});
			},
			toChatBox (id) {
				uni.navigateTo({
				    url: '../chatBox/chatBox?id=' + id
				});
			}
		},
		filters: {
			dealTimeFormat: timeFormat.dealTimeFormat
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
		background: $uni-bg-color;
		border-bottom: 1px solid $uni-border-color;
		align-items: center;
		padding-top: var(--status-bar-height);
		.top-bar-left {
			margin-left: $uni-spacing-row-sm;
			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
		.top-bar-center {
			padding-left: 42rpx;
			image {
				width: 88rpx;
				height: 42rpx;
			}
		}
		.top-bar-right {
			display: flex;
			justify-content: flex-start;
			margin-right: $uni-spacing-row-sm;
			.search {
				width: 88rpx;
				height: 88rpx;
				text-align: center;
				line-height: 104rpx;
			}
			.add {
				width: 88rpx;
				height: 88rpx;
				text-align: center;
				line-height: 104rpx;
			}
			image {
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
	.main {
		padding-top: 156rpx;
		width: 100%;
		.apply {
			padding-top: $uni-spacing-col-base;
		}
		.friends {	
			.friend-list {
				display: flex; 
				justify-content: flex-start;
				height: 96rpx;
				padding: $uni-spacing-col-sm 0 $uni-spacing-col-base $uni-spacing-row-base;
				border-bottom: 1px solid $uni-border-color;
				&:active {
					background-color: $uni-bg-color-grey;
				}
				.friend-list-left {
					position: relative;
					image {
						width: 96rpx;
						height: 96rpx;
						border-radius: $uni-border-radius-base;
						background-color: $uni-color-primary;
					}
					.tip {
						position: absolute;
						right: -16rpx;
						top: -16rpx;
						z-index: 1;
						height: 36rpx;
						min-width: 36rpx;
						background-color: $uni-color-warning;
						border-radius: $uni-border-radius-base;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 17px;
					}
				}
				.friend-list-right {
					width: 100%;
					padding-left: $uni-spacing-row-base;
					.top {
						display: flex;
						justify-content: space-between;
						.name {
							font-size: 36rpx;
							font-weight: 400;
							font-family: PingFangSC, PingFangSC-Regular;
							color: $uni-text-color;
							line-height: 50rpx;
						}
						.time {
							padding-right: 24rpx;
							font-size: $uni-font-size-sm;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: rgba(39,40,50,0.4);
							line-height: 38rpx;
						}
					}
					.bottom {
						.infomation {
							font-size: $uni-font-size-base;
							color: rgba(39,40,50,0.6);
							line-height: 40rpx;   
							display: -webkit-box;    
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 1;    
							overflow: hidden;
						}
					}
				}
			}
		}
	}
	
</style>
