<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="back">
				<image src="../../static/images/userInfo/back.png"></image>
			</view>
			<view class="top-bar-center">
				<h3>好友名字</h3>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/img/dm.jpg" mode=""></image>
			</view>
		</view>
		<scroll-view
			class="chat-box"
			scroll-y="true" 
			scroll-with-animation="true"
			:scroll-into-view="infoLastChildId"
			@scrolltoupper="loadingAnimation"
			>
			<view class="chat-main" :style="{ 'paddingBottom': distance + 'rpx'}">
				<view class="loading" v-show="showLoading">
					<image 
						src="../../static/images/chatBox/loading.png" 
						:animation="animationData"
						></image>
				</view>
				<view class="chat-ls" v-for="item in infoList" :key="item.id" :id="'m' + item.id">
					<view class="chat-time">{{ item.sendTime | dealTimeFormatBForChatTime }}</view>
					<view :class="[item.belong ? 'msg-left' : 'msg-right', 'msg-m']">
						<image :src="item.imgPath" class="avatar" ></image>
						<view class="message" v-if="item.type === 0">
							<view class="msg-text">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-else-if="item.type === 1">
							<image 
								:src="item.message" 
								mode="widthFix" 
								class="msg-img"
								@tap="selectImage(item.message)"
								></image>
						</view>
						<view class="message record" v-if="item.type === 2" :style="{'width': item.message.duration * 20 + 'rpx'}">
							<view 
								class="msg-text"
								@tap="playRecord(item.message.recordPath)">
								<image
									src="../../static/images/chatBox/record.png"
									></image>
								<view>{{item.message.duration}}″</view>
							</view>
							
						</view>
						<view class="message" v-if="item.type === 3">
							<view class="location-info" @tap="lookForNowlocation(item.message)">
								<h3>{{ item.message.name}}</h3>
								<p>{{ item.message.address }}</p>
								<cover-view class="cm">
									<map
										:latitude="item.message.latitude" 
										:longitude="item.message.longitude"
										:markers="covers">
										
									</map>
								</cover-view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pd-bottom">
				<!-- 占位 -->
			</view>
		</scroll-view>
		<buttom-bar 
			@sendMessage="sendMessage"
			@getBottomHeight="getBottomHeight"
		></buttom-bar>
	</view>
</template>

<script>
	import buttomBar from "@/components/buttom-bar/buttom-bar.vue"
	import timeFormat from '../../commons/js/timeFormat.js'
	
	
	// 全局音频
	const innerAudioContext = uni.createInnerAudioContext()
	
	export default {
		data() {
			return {
				infoList: [
					{
						id: '1',
						imgPath: '../../static/images/img/gou.png',
						message: '即刻出发，尽情放纵',
						type: 0,  //0文字，1图片链接
						sendTime: new Date(2019, 11, 1, 13, 50),
						belong: 0,  //0自己，1好友
					},
					{
						id: '2',
						imgPath: '../../static/images/img/gou.png',
						message: '../../static/images/img/gou.png',
						type: 1,  //0文字，1图片链接
						sendTime: new Date(2019, 11, 1, 13, 50) ,
						belong: 0,  //0自己，1好友
					},
					{
						id: '3',
						imgPath: '../../static/images/img/dm.jpg',
						message: '即刻出发，尽情放纵奥利给',
						type: 0,  //0文字，1图片链接
						sendTime: new Date(2020, 11, 13, 13, 50),
						belong: 1,  //0自己，1好友
					},
					{
						id: '4',
						imgPath: '../../static/images/img/dm.jpg',
						message: '../../static/images/img/dm.jpg',
						type: 1,  //0文字，1图片链接
						sendTime: new Date(2020, 11, 13, 0, 0),
						belong: 1,  //0自己，1好友
					},
					{
						id: '5',
						imgPath: '../../static/images/img/gou.png',
						message: '即刻出发，尽情放纵',
						type: 0,  //0文字，1图片链接
						sendTime: new Date(),
						belong: 0,  //0自己，1好友
					},
					{
						id: '6',
						imgPath: '../../static/images/img/gou.png',
						message: '即刻出发，尽情放纵',
						type: 0,  //0文字，1图片链接
						sendTime: new Date(),
						belong: 0,  //0自己，1好友
					},
					{
						id: '7',
						imgPath: '../../static/images/img/gou.png',
						message: '即刻出发，尽情放纵噜噜噜噜',
						type: 0,  //0文字，1图片链接
						sendTime: new Date(),
						belong: 0,  //0自己，1好友
					},
					{
						id: '8',
						imgPath: '../../static/images/img/dm.jpg',
						message: {
							recordPath: 'abc',
							duration: 10
						},
						type: 2,  //0文字，1图片链接, 2语音
						sendTime: new Date(),
						belong: 0,  //0自己，1好友
					},
					{
						id: '9',
						imgPath: '../../static/images/img/gou.png',
						message: {
							recordPath: 'abc',
							duration: 10
						},
						type: 2,  //0文字，1图片链接, 2语音
						sendTime: new Date(),
						belong: 1,  //0自己，1好友
					},
					{
						id: '10',
						imgPath: '../../static/images/img/gou.png',
						message: {
							name: '武汉纺织大学学生公寓5B',
							address: '经济开发区庙山街道阳光大道1号',
							latitude: 30.375493999999996,
							longitude: 114.33316400000001
						},
						type: 3,  //0文字，1图片链接, 2语音，3位置信息
						sendTime: new Date(),
						belong: 1,  //0自己，1好友
					},
					{
						id: '11',
						imgPath: '../../static/images/img/gou.png',
						message: {
							name: '武汉纺织大学学生公寓5B',
							address: '经济开发区庙山街道阳光大道1号',
							latitude: 30.375493999999996,
							longitude: 114.33316400000001
						},
						type: 3,  //0文字，1图片链接, 2语音
						sendTime: new Date(),
						belong: 0,  //0自己，1好友
					},
				],
				sendImageList: [],
				infoLastChildId: '',
				distance: 100,
				chatBoxTop: '',
				chatBoxHeight: '',
				covers: [],
				animationData: {},
				showLoading: false,
				page: 1
			}
		},
		onReady () {
			this.infoList.filter((item) => {
				if (item.type === 1) {
					this.sendImageList.push(item.message)
				} else if (item.type === 3) {
					this.covers.push({
						latitude: item.message.latitude,
						longitude: item.message.longitude,
						iconPath: '../../static/images/chatBox/LOCATION.png',
						width: 24,
						height: 24
						
					})
				}
			})
			this.$nextTick(() => {
				let len = this.infoList.length - 1
				this.infoLastChildId = 'm' + this.infoList[len].id

			})
		},
		methods: {
			// 查看图片
			selectImage (singleImage) {
				let current = this.sendImageList.indexOf(singleImage)
				uni.previewImage({
					current,
				    urls: this.sendImageList,
				    longPressActions: {
				        itemList: ['发送给朋友', '保存图片', '收藏'],
				        success: function(data) {
				            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				        },
				        fail: function(err) {
				            console.log(err.errMsg);
				        }
				    }
				})
			},
			// 播放音频
			playRecord (src) {
				
				innerAudioContext.src = src;
				
				innerAudioContext.play()
				
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
			},
			sendMessage (message) {
				let info = {
					id: this.infoList.length + 1,
					imgPath: '../../static/images/img/gou.png',
					message: message.content,
					type: message.type,  //0文字，1图片链接
					sendTime: new Date(),
					belong: 0,  //0自己，1好友
				}
				this.infoList.push(info)
				
				this.infoLastChildId = ''
				this.$nextTick(() => {
					this.infoLastChildId = 'm' + info.id
				})
				if (info.type === 1) {
					this.sendImageList.push(info.message)
				} else if (info.type === 3) {
					this.covers.push({
						latitude: info.message.latitude,
						longitude: info.message.longitude,
						iconPath: '../../static/images/chatBox/LOCATION.png',
						width: 24,
						height: 24
					})
				}
				
			},
			getBottomHeight (bottomHight) {
				this.distance = (bottomHight - 10) * 2
				this.infoLastChildId = ''
				this.$nextTick(() => {
					const len = this.infoList.length - 1
					this.infoLastChildId = 'm' + this.infoList[len].id
				})
			},
			lookForNowlocation (data) {
				uni.openLocation({
					latitude: data.latitude,
					longitude: data.longitude,
					address: data.address,
					name: data.name,
					success: function () {
						console.log('success');
					}
				})
			},
			// 获取第一页数据
			getFirstPageData () {
				uni.request({
				    url: 'xxx.js?page=' + this.page, //仅为示例，并非真实接口地址。
					method: 'GET',
				    success: (res) => {
				        console.log(res.data);
				        this.text = 'request success';
				    }
				})
			},
			// 获取分页数据
			getNextPagelist () {
				// uni.request({
				//     url: 'xxx.js?page=' + this.page, //仅为示例，并非真实接口地址。
				// 	method: 'GET',
				//     success: (res) => {
				//         console.log(res.data);
				//         this.text = 'request success';
				//     }
				// });
				this.page += 1
			},
			// 加载分页时的loading动画
			loadingAnimation () {
				this.showLoading = true
				var animation = uni.createAnimation({
				    duration: 1500,
				       timingFunction: 'ease',
					})
				
				this.animation = animation
				
				animation.rotate(360).step()
				
				this.animationData = animation.export()
				
			},
			back () {
				uni.navigateBack({
				    delta: 1
				})
			}
		},
		components: {
			buttomBar,
		},
		filters: {
			dealTimeFormatBForChatTime: timeFormat.dealTimeFormatBForChatTime
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: $uni-spacing-col-base;
		height: 100%;
		background: #f4f4f4;
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
		background: #f4f4f4;
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
			h3 {
				font-size: 40rpx;
				font-weight: 400;
				color: #272832;
			}
		}
		.top-bar-right {
			height: 100%;
			width: 68rpx;
			display: flex;
			align-items: center;
			margin-right: 32rpx;
			image {
				width: 100%;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
	}
	
	.chat-box {
		height: 100%;
		.pd-bottom {
			padding-top: env(safe-area-inset-bottom);
			width: 100%;
		}
		.loading {
			width: 100%;
			height: 52rpx;
			text-align: center;
			image {
				width: 52rpx;
				height: 100%;
			}
		}
		.chat-main {
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
	
			display: flex;
			flex-direction: column;
		}
		.chat-ls {
			.chat-time {
				font-size: $uni-font-size-sm;
				color: rgba(39,40,50,0.3);
				padding: 60rpx 0;
				text-align: center;
				line-height: 34rpx;
			}
			.msg-m {
				display: flex;
				justify-content: flex-start;
				padding: 20rpx 0;
				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}
				.message {
					max-width: 480rpx;
					min-width: 180rpx;
					width: auto;
					.msg-text {
						font-size: $uni-font-size-lg;
						color: #272832;
						line-height: 44rpx;
						padding: 18rpx 24rpx;
					}
					.msg-img {
						max-width: 300rpx;
						max-height: auto;
						border-radius: 20rpx;
					} 
					.location-info {
						
						background-color: #fff;
						padding: 20rpx 10rpx 10rpx 10rpx;
						h3 {
							font-size: $uni-font-size-lg;
							font-weight: normal;
							line-height: 50rpx;
							color: #555555;
							display: -webkit-box;
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 1;    
							overflow: hidden;
						}
						p {
							font-size: $uni-font-size-sm;
							color: #808080;
							display: -webkit-box;
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 1;    
							overflow: hidden;
						}
						.cm {
							width: 400rpx;
							height: 300rpx;
							background: url(../../static/images/chatBox/fake.png) no-repeat top left;
							map {
								width: 100%;
								height: 100%;
								// z-index: 9;
							}
						}
					}
				}
				.record {
					min-width: 180rpx;
					
					.msg-text {
						display: flex;
						align-items: center;
						justify-content: space-between;
						image {
							width: 44rpx;
							height: 44rpx;
						}
					}
				}
				
			}
			.msg-left {
				.msg-text {
					margin-left: 20rpx;
					background-color: #fff;
					border-radius: 0px 20rpx 20rpx 20rpx;;
				}
				.msg-img,
				.location-info
				{
					margin-left: 20rpx;
				}

			}
			.msg-right {
				flex-direction: row-reverse;
				.msg-text {
					margin-right: 20rpx;
					background: #ffe431;
					border-radius: 20rpx 0px 20rpx 20rpx;
				}
				.msg-img,
				.location-info {
					margin-right: 20rpx;
				}
				.record {
					.msg-text {
						flex-direction: row-reverse;
						image {
							transform: rotate(180deg);
						}
					}
				}
			}
		}
	}
	
</style>
