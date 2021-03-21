<template>
	<view class="emoji">
		<h3 class="all-emoji">所有表情</h3>
		
		<view class="emoji-content">
			<view class="emoji-ls" v-for="(ls,index) in emojis" :key="index">
			   	<view class="single-emoji" v-for="(item, i) in ls" :key="i" @tap="selectEmoji(item)">
					{{item}}
			   	</view>
			</view>
			<view class="empty"><!--  占位置 --></view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emojis: [
					['😀', '😁','😂','🤣','😃','😄','😅'],
					['😆','😉','😊','😋','😎','😍','😘'],
					['😗','😙','🤔','😐','😑','😶','🙄'],
					['😏','😣','😥','😮','🤐','😯','😪'],
					['😫','😴','😌','😛','😜','😝','🤤'],
					['😒','😓','😔','😕','🙃','🤑','😲'],
					['☹','🙁','😖','😞','😟','😤','😢'],
					['😭','😦','😧','😨','😩','😬','😰'],
					['😱','😳','😵','😡','😠','😷','🤒'],
					['🤕','🤢','🤧','😇','🤠','🤡','🤥'],
					['🤓','😈','👿','👹','👺','💀','👂'],
					['👂🏻','👂🏼','👂🏽','👂🏾','👂🏿','👃','👃🏻'],
					['👃🏼','👃🏽','👃🏾','👃🏿','👣','👀','👁'],
					['👅','👄','💋','🕶','👔','👕','👖'],
					['👗','👘','👙','👚','👛','👜','👝'],
					['🎒','👞','👟','👠','👡','👢','👑'],
					['👒','🎩','⛑','💄', '💍','🌂' ,'💼']
				],
			}
		},
		methods: {
			selectEmoji (emoji) {
				this.$emit('selectEmoji', emoji)
			}
		}
	}
</script>

<style lang="scss">
	.emoji {
		width: 100%;
		// height: auto;
		height: 460rpx;
		padding: 20rpx 20rpx 120rpx 20rpx;
		box-sizing: border-box;
		overflow-y: auto;
		background-color: #f4f4f4;
		z-index: 9;
		.all-emoji {
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			font-weight: normal;
			padding-left: 10rpx;
		}
		.emoji-content {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			.emoji-ls {
				display: flex;
				justify-content: flex-start;
				// margin-bottom: 100rpx;
				// &:last-child {
				// 	padding-bottom: 100rpx;
				// }
				.single-emoji {
					width: 100rpx;
					height: 100rpx;
					font-size: 50rpx;
					line-height: 100rpx;
					text-align: center;
				}
			}
			.empty {
				height: 100rpx;
			}
		}
		
	}
</style>
