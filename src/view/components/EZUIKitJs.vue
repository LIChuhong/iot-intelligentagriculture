<template>
	<div class="hello-ezuikit-js">
		<div id="video-container" style="width:100%;height:100%"></div>
	</div>
</template>

<script>
	import EZUIKit from "ezuikit-js"
	import {
		getVideoByDeviceSerialChannelNo
	} from '@/api/video.js'

	export default {
		name: "HelloWorld",
		 props: ['videoKey', 'iaVideoList', 'getVideoInfo', 'etWideHigh'],
		data() {
			return {
				player: '',
			}
		},
		watch: {
			etWideHigh() {
				if (this.player == '') {
			
				} else {
					// console.log(this.etWideHigh)
					this.player.reSize(this.etWideHigh.w, this.etWideHigh.h)
				}
				// alert(1)
			},
		
		},
		methods: {
			getNewVideoInfo(deviceSerial, channelNo) {
				getVideoByDeviceSerialChannelNo(deviceSerial, channelNo).then(res => {
					const data = res.data
					if (data.success == 1) {
						// console.log(data)
						var video = data.video
						var videoBrandAccount = video.videoBrandAccount
						var videoDeviceInfo = video.videoDeviceInfo
						this.showPlayer1(videoBrandAccount.accessToken, videoDeviceInfo.highDefinitionUrl)
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					alert(error)
				})

			},
			showPlayer1(accessToken, iaVideoUrl) {
				this.$nextTick(() => {
					this.player.play({
						accessToken: accessToken,
						url: iaVideoUrl,
					});
				})
			},
			showPlayer(accessToken, iaVideoUrl) {
				var that = this
				// alert(JSON.stringify(this.etWideHigh))
				this.$nextTick(() => {
					this.player = new EZUIKit.EZUIKitPlayer({
						autoplay: true,
						id: "video-container",
						accessToken: accessToken,
						url: iaVideoUrl,
						template: "security",
						// splitBasis: 1,
						// header: ['capturePicture', 'save', 'zoom'],
						// footer: ['fullScreen','capturePicture', 'save', 'zoom'],
						width: that.etWideHigh.w,
						height: that.etWideHigh.h
					});
					// console.log(this.player)
				})

			}
		},
		mounted() {
			// this.showPlayer('', '')
			this.showPlayer('at.c53bra70c34o68zxb9inx6x7blhmwm4y-54w6bdnl88-1y6m3k0-lb0v6jgpn','ezopen://EDSXIU@open.ys7.com/E38539884/1.hd.live')
		},
		destroyed() {}
	};
</script>
