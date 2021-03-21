<template>
	<view class="function">
		<view class="ab-list">
			<view class="photo common-style" @tap="imageDeal('album', 9)">
				<view class="icon"></view>
				<view class="title">照片</view>
			</view>
			<view class="take-pic common-style" @tap="imageDeal('camera', 1)">
				<view class="icon"></view>
				<view class="title">拍摄</view>
			</view> 
			<view class="locate common-style" @tap="location">
				<view class="icon"></view>
				<view class="title">位置</view>
			</view>
			<view class="video common-style">
				<view class="icon"></view>
				<view class="title">视频</view>
			</view>
			<view class="folder common-style wrap-column">
				<view class="icon"></view>
				<view class="title">文件</view>
			</view>		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			imageDeal (sourceType, count) {
				uni.chooseImage({
				    count: count, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [sourceType], //从相册选择
				    success: (res) => {
						res.tempFilePaths.filter((imgPath) => {
							this.$emit('dealWithImage', imgPath)
						})
				    }
				});
			},
			location () {
				uni.chooseLocation({
				    success: (res) => {
				        // console.log('位置名称：' + res.name);
				        // console.log('详细地址：' + res.address);
				        // console.log('纬度：' + res.latitude);
				        // console.log('经度：' + res.longitude);
						this.$emit('locationInfo', {
							name: res.name,
							address: res.address,
							latitude: res.latitude,
							longitude: res.longitude
						})
				    }
				});
			}
			
		},
	}
</script>

<style lang="scss">
	@font-face {
		font-family: 'icomoon';
		  src:  url('../../../commons/fonts/icomoon.eot?7kkyc2');
		  src:  url('../../../commons/fonts/icomoon.eot?7kkyc2#iefix') format('embedded-opentype'),
		    url('../../../commons/fonts/icomoon.ttf?7kkyc2') format('truetype'),
		    url('../../../commons/fonts/icomoon.woff?7kkyc2') format('woff'),
		    url('../../../commons/fonts/icomoon.svg?7kkyc2#icomoon') format('svg');
		  font-weight: normal;
		  font-style: normal;
	}
	ul, li {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.function {
		// width: 100%;
		height: 460rpx;
		background-color: #ecedee;
		.ab-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 34rpx 60rpx 0 54rpx;
			.common-style {
				font-family: "icomoon";
				width: 120rpx;
				height: 120rpx;
				background: #ffffff;
				border-radius: 24rpx;
				line-height: 120rpx;
				text-align: center;
				// margin-right: 52rpx;
				.title {
					font-size: 24rpx;
					color: rgba(39,40,50,0.5);
					width: auto;
					height: 24rpx;
					line-height: 60rpx;
				}
				.icon {
					font-size: 54rpx;
					color: #272832;
				}
			}
			.take-pic {
				margin: 0 52rpx;
			}
			.locate {
				margin-right: 52rpx;
			}
			.wrap-column {
				margin-top: 78rpx;
			}
		}
		
		
		
		
		// ul {
		// 	display: flex;
		// 	justify-content: space-between;
		// 	flex-wrap: wrap;
		// 	padding: 34rpx 60rpx 0 54rpx;
		// 	li {
		// 		font-family: "icomoon";
		// 		width: 120rpx;
		// 		height: 120rpx;
		// 		background: #ffffff;
		// 		border-radius: 24rpx;
		// 		line-height: 120rpx;
		// 		text-align: center;
		// 		// margin-right: 52rpx;
		// 		&:nth-child(2) {
		// 			margin: 0 52rpx;
		// 		}
		// 		&:nth-child(3) {
		// 			margin-right: 52rpx;
		// 		}
		// 		&:last-child {
		// 			margin-top: 78rpx;
		// 		}
		// 		p {
		// 			&:first-child {
		// 				font-size: 54rpx;
		// 				color: #272832;
		// 			}
		// 			&:last-child {
		// 				font-size: 24rpx;
		// 				color: rgba(39,40,50,0.5);
						
		// 			}
		// 		}
				
		// 	}
		// }
	}
	
</style>
