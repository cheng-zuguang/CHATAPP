<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="back">
				<image src="../../static/images/userInfo/back.png"></image>
			</view>
			<view class="top-bar-center">
				<h3>详细</h3>
			</view>
			<view class="top-bar-right"> <!-- 占位 --></view>
		</view>
		<view class="main">
			<ul class="user-info">
				<li>
					<view class="user-content">
						<h5>头像</h5>
						<!-- <image :src="imgUrl" class="avatar"></image> -->
						<image-cropper 
							:src="tempFilePath" 
							@confirm="confirm"  
							@cancel="cancel">
						</image-cropper>
						<image :src="imgUrl" @tap="upload" class="avatar"></image>
					</view>
					
					<image 
						src="../../static/images/userInfo/seemore.png" 
						class="see-more"></image>
				</li>
				<li @tap="modify(false)">
					<view class="user-content">
						<h5>签名</h5>
						<view class="desc">
							所所所所所所所所所所所所aaaaaaaaaaa
						</view>
					</view>
					<image 
						src="../../static/images/userInfo/seemore.png" 
						class="see-more"></image>
				</li>
				<li>
					<view class="user-content">
						<h5>注册</h5>
						<view class="desc">
							2019-12-15 13:22:55
						</view>
					</view>
					<view></view>
				</li>
				<li @tap="modify(false)">
					<view class="user-content" >
						<h5>昵称</h5>
						<view class="desc">
							mmandGG
						</view>
					</view>
					<image 
						src="../../static/images/userInfo/seemore.png" 
						class="see-more"></image>
				</li>
				<li>
					<view class="user-content">
						<h5>性别</h5>
						<view class="desc">
							<picker @change="bindPickerChange" :value="index" :range="array">
							    <view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
					<image 
						src="../../static/images/userInfo/seemore.png" 
						class="see-more"></image>
				</li>
				<li>
					<view class="user-content">
						<h5>生日</h5>
						<view class="desc">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							    <view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
					<image 
						src="../../static/images/userInfo/seemore.png" 
						class="see-more"></image>
				</li>
				<li @tap="modify(false)">
					<view class="user-content">
						<h5>电话</h5>
						<view class="desc">
							12345678890
						</view>
					</view>
					<image 
						src="../../static/images/userInfo/seemore.png" 
						class="see-more"></image>
				</li>
				<li>
					<view class="user-content">
						<h5>邮箱</h5>
						<view class="desc">
							123456@qq.com
						</view>
					</view>
					<view></view>
				</li>
				<li @tap="modify(true)">
					<view class="user-content" >
						<h5>密码</h5>
						<view class="desc">
							********
						</view>
					</view>
					<image 
						src="../../static/images/userInfo/seemore.png" 
						class="see-more"></image>
				</li>
			</ul>
			<view class="exit" @tap="">退出登录</view>
			
			
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue"
	
	export default {
		components: {
		    ImageCropper,
		},
		data() {
			const currentDate = this.getDate({
			    format: true
			})
			return {
				imgUrl: '../../static/images/img/dm.jpg',
				tempFilePath: "",
				array: ['男', '女'],
				index: 0,
				date: currentDate,
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			back () {
				uni.navigateBack({
				    delta: 1
				})
			},
			modify (showPsw) {
				uni.navigateTo({
				    url: '../modifyUserInfo/modifyUserInfo?show=' + showPsw
				})
			},
			// 选择性别
			bindPickerChange (e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.index = e.target.value
			},
			// 获取日期
			bindDateChange (e) {
				this.date = e.target.value
			},
			// 时间处理函数
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				
				if (type === 'start') {
			        year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			// 图片裁剪
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift();
					},
				});
			},
			confirm(e) {
				this.tempFilePath = "";
				this.imgUrl = e.detail.tempFilePath;
				
				// #ifdef APP-PLUS||MP
				//除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
				//按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
				//待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了
				
				uni.uploadFile({
					url: "后端地址上传图片接口地址",
					filePath: this.imgUrl,
					name: "file",
					fileType: "image",
					//formData:{},传递参数
					success: (uploadFileRes) => {
					var backstr = uploadFileRes.data;
						//自定义操作
					},
				
					fail(e) {
						console.log("this is errormes " + e.message);
					},
			    });
			
			    // #endif
			},
			cancel() {
				console.log("canceled");
				this.tempFilePath = "";
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
			width: 88rpx;
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
		width: 100%;
		margin-top: 130rpx;
		.user-info {
			list-style: none;
			padding: 0;
			margin: 0;
			li {
				height: 148rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.user-content {
					padding-left: 32rpx;
					height: 100%;
					display: flex;
					align-items: center;
					h5 {
						font-size: 32rpx;
						width: 88rpx;
						font-weight: 400;
						color: #272832;
						margin-right: 40rpx;
					}
					.avatar {
						width: 108rpx;
						height: 108rpx;
						border-radius: 20rpx;
					}
					.desc {
						height: 44rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 1;    
						overflow: hidden;
						font-size: 32rpx;
						font-weight: 400;
						color: rgba(39,40,50,0.6);
						padding-right: 20rpx;
					}
					
				}
				.see-more {
					width: 16rpx;
					height: 28rpx;
					margin-right: 38rpx;
					
				}
				&:nth-child(3),
				&:nth-child(8),
				&:nth-child(9) {
					margin-bottom: 12rpx;
					box-shadow: 0px 2rpx 0px 0px #eeeeee; 
				}
			}
		}
		
		.exit {
			width: 100%;
			height: 80rpx;
			border-radius: 5px;
			margin: 160rpx 0 8rpx 0;
			text-align: center;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #ff5d5b;
		}
	}
	
</style>
