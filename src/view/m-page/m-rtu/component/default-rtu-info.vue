<template>
	<div>
		<div ref="ezuikt1">
			<EZUIKitJs :et-wide-high="etWideHigh"></EZUIKitJs>
			<!-- 默认通用 -->
			<!-- <Icon size="30" type=" iconfont icon-llj" /> -->
			<!-- <iframe src="https://open.ys7.com/ezopen/h5/rec?autoplay=1&audio=1&accessToken=at.c53bra70c34o68zxb9inx6x7blhmwm4y-54w6bdnl88-1y6m3k0-lb0v6jgpn&hd=1&deviceSerial=E38539884&channelNo=1" width="300" height="300"></iframe> -->
			<!-- <a style="position: absolute;right: 0;top: 0;" @click="linkDownload">详情</a> -->
			<div style="height: 6.25rem;text-align: center;">
				<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
			</div>
			<div style="margin: 1.25rem 0;">
				<div style="font-size: 1rem;text-align: center;" v-for="(item,index) in parameterDataList" :key="index">
					<p><span>
							<Icon :color="item.iconColor" :type="' iconfont'+ ' ' +item.iconFont" /></span>{{item.parameterName}}:<span
						 :style="{color:item.iconColor }">{{item.value}}{{item.unit}}</span></p>
				</div>
			</div>
		</div>
		<Spin fix v-show="showSpin" style="background: rgba(255,255,255,0.3);">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>{{tips}}</div>
		</Spin>
	</div>
</template>

<script>
	import {
		getRtu,
		getRtuData,
		setRtuData
	} from '@/api/rtu.js'
	import EZUIKitJs from '@/view/components/EZUIKitJs.vue'
	export default {
		props: ['rtuNumber'],
		components: {
			EZUIKitJs
		},
		data() {
			return {
				tips: '检测中...',
				btnValue: false,
				iaRtu: {},
				parameterDataList: [],
				showSpin: false,
				parameterIndex: null,
				etWideHigh: {
					w: 300,
					h: 400
				},
			}
		},
		watch: {

		},
		methods: {
			getEtWideHigh() {
				var w = this.$refs.ezuikt1.offsetWidth
				var h = 400
				// alert(22)
				this.etWideHigh = {
					w: w,
					h: h
				}
				console.log(1+this.etWideHigh)

				// alert(JSON.stringify(this.etWideHigh))
			},
			getRtuInfo() {
				this.showSpin = true
				if (this.rtuNumber != null && this.rtuNumber != '') {
					getRtu(this.rtuNumber).then(res => {
						this.showSpin = false
						const data = res.data
						if (data.success == 1) {
							// console.log(data)
							this.iaRtu = data.iaRtu
							this.getRtuDataInfo()
						} else {
							this.$Message.error(this.rtuNumber + data.errorMessage)
						}
					}).catch(error => {
						this.showSpin = false
						alert(error)
					})
				}

			},
			getRtuDataInfo() {
				if (this.rtuNumber != null && this.rtuNumber != '') {
					this.showSpin = true
					getRtuData(this.rtuNumber).then(res => {
						const data = res.data
						this.showSpin = false
						if (data.success == 1) {
							const rtuData = data.rtuData
							if (rtuData.parameterDataList != null && rtuData.parameterDataList) {
								this.parameterDataList = rtuData.parameterDataList.map(item => {
									item.iconColor = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' +
										Math.floor(Math.random() * 255) + ')'

									return item
								})

							}
						} else {
							this.$Message.error(this.rtuNumber + data.errorMessage)
						}
					}).catch(error => {
						this.showSpin = false
						alert(error)
					})
				}

			}

		},
		computed() {
			// this.getEtWideHigh()

		},
		mounted() {
			this.getEtWideHigh()
		},
		created() {
			this.getRtuInfo()

		},
	}
</script>

<style>
	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}

	@keyframes ani-demo-spin {
		from {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
