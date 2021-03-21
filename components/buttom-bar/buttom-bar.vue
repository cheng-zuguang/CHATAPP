<template>
	<view class="content-box">
		<view class="main">
			<view class="voice" @tap="speakWords">
				<image src="../../static/images/chatBox/voice.png" v-if="!speak"></image>
				<image src="../../static/images/chatBox/speak.png" v-else></image>
			</view>
			<textarea 
				auto-height="true" 
				class="input-box" 
				v-model="message" 
				v-if="!speak" 
				@focus="closeEmojiAndSend"
				@input="showEmojiSendBtn"
				/>
			<view 
				class="input-box btn" 
				v-else
				@touchstart="recordStart"
				@touchend="recordEnd"
				@touchmove.stop.prevent="recordMove"
				>按住说话</view>
			<view class="ablity" v-show="!showSend">
				<image 
					src="../../static/images/chatBox/emoji.png" 
					class="emoji" 
					@tap="showEmojiBar"
					></image>
				<image 
					src="../../static/images/chatBox/more.png" 
					class="more-ablity"
					@tap="showMoreAbilityBar"
					></image>
			</view>
			
			<view class="send-btn" v-show="showSend" @tap="sendMessage">
				<!-- 多余的按钮 -->
				发送
			</view>
		</view>
		<view class="emoji-bar" v-show="showEmoji">
			<view class="emoji-deal">
				<view 
					:class="[msgIsEmoji ? 'select-emoji-backward': '', 'backward']"
					@tap="deleteSingleEmoji"
					></view>
				<view 
					:class="[msgIsEmoji ? 'select-emoji-send' : '', 'send']"
					@tap="sendEmojis"
					>发送</view>
			</view>
			<emoji @selectEmoji="selectEmoji"></emoji>
		</view>
		<view class="more-ablity-bar" v-show="showAbilies">
			<moreAblity 
				@dealWithImage="sendImages"
				@locationInfo="sendLocationInfo"
				></moreAblity>
		</view>
		
		<view class="record-mask" v-show="showRecordMask">
			<view class="mask">
				<image src="../../static/images/chatBox/mask-record.png"></image>
				<p>手指上滑，取消发送</p>
			</view>
		</view>
		<view class="record-mask" v-show="showRecordCancelMask">
			<view class="mask cancel">
				<image src="../../static/images/chatBox/cancel-record.png"></image>
				<p>松开手指，取消发送</p>
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from './emoji/emoji.vue'
	import moreAblity from './more-ability/more-ability.vue'
	
	
	
	// 获取全局唯一的录音管理器 recorderManager
	const recorderManager = uni.getRecorderManager();
	let timeID
	
	
	export default {
		data() {
			return {
				speak: false, // 控制发送语音按钮
				showEmoji: false, // 是否展示emoji
				showAbilies: false, // 是否展示更多功能栏
				message: '', // 信息
				showSend: false, // 多余
				msgIsEmoji: false, // 判断信息内容是否为emoji
				recordLength: 0, // 录音长度
				showRecordMask: false,
				showRecordCancelMask: false,
				pageY: 0
			}
		},
		updated () {
			this.getCurrentPosition()
		},
		methods: {
			// 是否显示语音按钮
			speakWords () {
				this.showEmoji = false
				this.showAbilies = false
				this.speak = !this.speak
			},
			// 是否显示发送按钮
			showSendBtn () {
				this.showSend = !this.showSend
			},
			
			closeEmojiAndSend () {
				this.showSend = !this.showSend
				this.showEmoji = false
				this.showAbilies = false
			},
			
			// 发送消息
			sendMessage () {
				if (this.message === '') return
				this.$emit('sendMessage', {
					content: this.message,
					type: 0
				})
				this.message = ''
				this.showSend = !this.showSend
				this.msgIsEmoji = false
			},
			// 显示表情栏并动态获取高度
			showEmojiBar () {
				this.speak = false
				this.showAbilies = false
				this.showEmoji = !this.showEmoji
				
			},
			showMoreAbilityBar () {
				this.speak = false
				this.showEmoji = false
				this.showAbilies = !this.showAbilies
				
			},
			// 实时获取底部栏高度
			getCurrentPosition () {
				const query = uni.createSelectorQuery().in(this)
				query.select('.content-box').boundingClientRect(data => {
					this.$emit('getBottomHeight', data.height)
				}).exec();
			},
			// 获取单个表情
			selectEmoji (emoji) {
				this.message += emoji
				this.msgIsEmoji = true
			},
			showEmojiSendBtn () {
				if (this.message === '') return
				this.msgIsEmoji = true
			},
			// 回退
			deleteSingleEmoji () {
				if (!this.msgIsEmoji) return
				
				this.message = this.message.slice(0, -2)
				
				if (this.message === '') {
					this.msgIsEmoji = false
				}
			},
			// 发送表情
			sendEmojis () {
				if (!this.msgIsEmoji ) return
				
				this.$emit('sendMessage', {
					content: this.message,
					type: 0
				})
				this.message = ''
				this.showSend = !this.showSend
				this.msgIsEmoji = false
			},
			// 发送图片
			sendImages (imagePath) {
				this.sendFile({
					content: imagePath,
					type: 1
				})
			},
			sendLocationInfo (info) {
				this.sendFile({
					content: info,
					type: 3
				})
			},
			// 录音开始
			recordStart (e) {
				this.pageY = e.touches[0].pageY

				console.log('开始录音')
				this.showRecordMask = true
				recorderManager.start()	
						
				timeID = setInterval(()=> {
					this.recordLength++
					console.log(this.recordLength)
					if(this.recordLength>60) {
						clearInterval(timeID)
					}
				}, 1000)
				
			},
			// 录音结束
			recordEnd () {
				clearInterval(timeID)
				this.showRecordMask = false
				
				
				console.log('录音结束');
				recorderManager.stop()
				
				recorderManager.onStop((res) => {
				    // console.log('recorder stop' + JSON.stringify(res));
					const data = {
						recordPath: res.tempFilePath,
						duration: this.recordLength
					}
					if (!this.showRecordCancelMask) {
						this.sendFile({
							content: data,
							type: 2
						})
					}
					
					this.showRecordCancelMask = false
					this.recordLength = 0
				})
				
			},
			recordMove (e) {
				if (this.pageY - e.touches[0].pageY > 20) {
					this.showRecordMask = false
					this.showRecordCancelMask = true
				} else {
					this.showRecordMask = true
					this.showRecordCancelMask = false
				}
				
			},
			// 
			sendFile (dataObj) {
				this.$emit('sendMessage', dataObj)
			}
		},
		components: {
			emoji,
			moreAblity
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: 'icomoon';
		  src:  url('../../commons/fonts/icomoon.eot?7kkyc2');
		  src:  url('../../commons/fonts/icomoon.eot?7kkyc2#iefix') format('embedded-opentype'),
		    url('../../commons/fonts/icomoon.ttf?7kkyc2') format('truetype'),
		    url('../../commons/fonts/icomoon.woff?7kkyc2') format('woff'),
		    url('../../commons/fonts/icomoon.svg?7kkyc2#icomoon') format('svg');
		  font-weight: normal;
		  font-style: normal;
	}
	.content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-bottom: env(safe-area-inset-bottom);
		width: 100%;
		height: auto;
		position: fixed;
		bottom: 0;
		z-index: 9;
	}
	.main {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: auto;
		width: 100%;
		background: #f4f4f4;
		box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.25) inset; 
		padding-bottom: var(--status-bar-height);
		padding-top: 20rpx;
		.voice {
			width: 56rpx;
			height: 56rpx;
			margin: 0 20rpx 0 32rpx;
			image {
				width: 56rpx;
				height: 56rpx;
			}
		}
		.input-box {
			height: 76rpx;
			width: 100%;
			background: #ffffff;
			border-radius: 10rpx;
			padding: 10rpx;
		}
		.btn {
			height: 62rpx;
			padding: 0;
			text-align: center;
			line-height: 62rpx;
			color: $uni-text-color;
			font-size: $uni-font-size-lg;
		}
		.ablity {
			width: auto;
			height: 56rpx;
			display: flex;
			justify-content: space-between;
			margin-right: 32rpx;
			image {
				width: 56rpx;
				height: 100%;
			}
			.emoji {
				margin: 0 24rpx 0 20rpx;
			}
		}
		.send-btn {
			width: 112rpx;
			height: 56rpx;
			margin-right: 32rpx;
			margin-left: 20rpx;
			line-height: 56rpx;
			text-align: center;
			background-color: rgba(43, 153, 57, .8);
			color: #FFFFFF;
			font-size: $uni-font-size-base;
			border-radius: 10rpx;
		}
	}
	.emoji-bar {
		height: 460rpx;
		width: 100%;
		background: rgba(236, 237, 238, 1);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, .1);
		.emoji-deal {
			position: fixed;
			bottom: 40rpx;
			right: 28rpx;
			// width: 200rpx;
			height: 80rpx;
			.backward,
			.send {
				width: 100rpx;
				height: 80rpx;
				background-color: #fff;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				float: left;
				text-align: center;
				line-height: 80rpx;
				border-radius: 10rpx;
			}
			.backward {
				font-family: "icomoon";
				font-size: 40rpx;
				line-height: 85rpx;
				margin-right: 14rpx;
			}
			.select-emoji-backward {
				color: $uni-text-color;
			}
			.select-emoji-send {
				background-color: #33CC66;
				color: #fff;
			}
		}
	}
	.more-ablity-bar {
		height: 460rpx;
		width: 100%;
		background: rgba(236, 237, 238, 1);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, .1);
	}
	.record-mask {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 400rpx;
		height: 400rpx;
		margin: -200rpx 0 0 -200rpx;
		background-color: rgba($color: #c2ccd0, $alpha: .9);
		border-radius: 20rpx;
		.mask {
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				margin: 120rpx 0 20rpx 0;
				width: 80rpx;
				height: 80rpx;
			}
			p {
				font-size: 32rpx;
				color: #392f41;
			}
		}
		.cancel {
			p {
				padding: 6rpx;
				background-color: #ff3300;
				border-radius: 10rpx;
			}
		}
	}
</style>
