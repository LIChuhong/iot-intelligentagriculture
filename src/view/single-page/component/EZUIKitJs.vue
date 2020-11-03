<template>
	<div class="hello-ezuikit-js">
		<div id="video-container" style="width:100%;height:100%"></div>
	</div>
</template>

<script>
	import EZUIKit from "ezuikit-js";

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
					
				}
				else {
					console.log(this.etWideHigh)
					this.player.reSize(this.etWideHigh.w,this.etWideHigh.h)
				}
				// alert(1)
			},
			getVideoInfo(value) {
				// console.log(value)
				var iaVideoList = this.iaVideoList
				for (var i = 0; i < iaVideoList.length; i++) {
					if (value.deviceSerial == iaVideoList[i].deviceSerial && value.channelNo == iaVideoList[i].channelNo) {
						this.showPlayer1(this.videoKey.accessToken, iaVideoList[i].highDefinitionUrl)
						break;
					}
				}
			},
			videoKey(value) {
				// console.log(value)
				if (value.videoBrandAccount != null && value.videoBrandAccount != '') {
					var videoBrandAccount = value.videoBrandAccount
					var videoDeviceInfo = value.videoDeviceInfo
					if (this.player == '') {
						this.showPlayer(videoBrandAccount.accessToken, videoDeviceInfo.highDefinitionUrl)
					} else {
						this.showPlayer1(videoBrandAccount.accessToken, videoDeviceInfo.highDefinitionUrl)
					}
					// this.showPlayer1(value.accessToken, this.iaVideoList[0].highDefinitionUrl)
				}
			}
		},
		methods: {
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
						template: "simple",
						splitBasis: 1,
						width: that.etWideHigh.w,
						height: that.etWideHigh.h
					});
				 // console.log(this.player)
				})

			}
		},
		mounted() {
			// this.showPlayer('', '')
		},
		destroyed() {}
	};
</script>
