<template>
	<div>
		<div>
			<!-- 土壤检测器 -->
			<div style="height: 6.25rem;text-align: center;position: relative">
				<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
				<div style="position: absolute;right:1.875rem;bottom:0">
					<Icon @click="showVideo('live')" :type="' iconfont' + ' ' +  videoIcon" size="40" color="red"></Icon>
					<!-- <span v-show="videoIcon != ''" @click="showVideo('rec')">回看</span> -->
				</div>
			</div>
			<div style="margin: 1.25rem 0;">
				<div style="font-size: 1rem;text-align: center;" v-for="(item,index) in parameterDataList" :key="index">
					<p><span>
							<Icon :color="item.iconColor" :type="' iconfont'+ ' ' +item.iconFont" /></span>{{item.parameterName}}:<span :style="{color:item.iconColor }">{{item.value}}{{item.unit}}</span></p>
				</div>
			</div>
		</div>
		<Spin fix v-show="showSpin" style="background: rgba(255,255,255,0.3);">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>{{tips}}</div>
		</Spin>
		<Modal v-model="showVideoInfo" title="视频详情" footer-hide fullscreen>
			<video-info :video-info="videoInfo" v-if="showVideoInfo"></video-info>
		</Modal>
	</div>
</template>

<script>
	import {
		getRtu,
		getRtuData,
		setRtuData
	} from '@/api/rtu.js'
	import {
		getVideo
	} from '@/api/video.js'
	import VideoInfo from '../component/video-info.vue'
	export default {
		props: ['rtuNumber'],
		components: {
			VideoInfo
		},
		data() {
			return {
				tips: '检测中...',
				btnValue: false,
				iaRtu: {},
				parameterDataList: [],
				showSpin: false,
				parameterIndex: null,
				videoInfo: '',
				videoIcon: '',
				showVideoInfo: false
			}
		},
		watch: {
			
		},
		methods: {
			showVideo(suffix) {
				if(this.videoInfo.brandTag == 'YSY'){
					this.videoInfo.suffix = suffix
					this.showVideoInfo = true
				}
			},
			getVideoInfo(id,presetPoint){
				getVideo(id).then(res => {
					const data = res.data
					if (data.success == 1) {
						this.videoInfo = data.video
						var video = data.video
						if (video.videoType == 0) {
							this.videoIcon = 'icon-qj0'
						}
						if (video.videoType == 1) {
							this.videoIcon = 'icon-qj1'
						}
						if(presetPoint != null){
							this.videoInfo.presetPoint = 0
						}else{
							this.videoInfo.presetPoint = 1
						}
						this.videoInfo.rtuNumber = this.rtuNumber
					}
			
				}).catch(error => {
					alert(error)
				})
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
							var iaRtu = data.iaRtu
							if(iaRtu.videoId > 0){
								var video = iaRtu.video
								// this.videoInfo = video
								if(video){
									this.videoInfo = video
									if (video.videoType == 1) {
										this.videoIcon = 'icon-qj1'
									}
									if (video.videoType == 0) {
										this.videoIcon = 'icon-qj0'
									}
									if(iaRtu.presetPoint != null){
										this.videoInfo.presetPoint = 0
									}else{
										this.videoInfo.presetPoint = 1
									}
									this.videoInfo.rtuNumber = this.rtuNumber
								}
							}
							// if (data.iaRtu.videoId > 0) {
							// 	this.getVideoInfo(data.iaRtu.videoId,data.iaRtu.presetPoint)
							// }
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
								 rtuData.parameterDataList.map(item => {
									 
									if (item.parameterId == 18) {
										 item.iconColor = '#0187fc'
										this.parameterDataList.push(item)
									} else if (item.parameterId == 32) {
										item.iconColor = '#8f3ef7'
										this.parameterDataList.push(item)
									} else if (item.parameterId == 33) {
										 item.iconColor = '#06cce4'
										this.parameterDataList.push(item)
									} else {
										item.iconColor =  'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
									}
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
