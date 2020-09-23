<template>
	<div>
		<!-- 气象站 -->
		<div style="height: 6.25rem;text-align: center;">
			<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
		</div>
		<div style="display: flex;margin: 1.25rem 0;font-size: 1rem;">
			<p style="width: 50%;text-align: center;">状态:
				<Icon :color="iat.iconColor" :type="iat.icon" />
			</p>
			<p>剩余时间:<span :style="{color:iat.iconColor}">{{iat.restTime}}秒</span></p>
		</div>
		<div style="text-align: right;padding-right: 1.25rem;">
			<Cascader style="display: inline-block;" :transfer="true" :data="iat.timeList" @on-change="setRtu">
				<Button :disabled="iat.restTime > 0" style="margin-right:1.25rem ;" type="primary" shape="circle">开</Button>
			</Cascader>
			<Button @click="setRtu(0)" :disabled="iat.restTime == 0" type="primary" shape="circle">关</Button>
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
	import {
		getSignal
	} from '@/libs/tools.js'
	import { rtuTimeDataList } from '@/view/components/js/data.js'
	export default {
		props: ['rtuNumber'],
		data() {
			return {
				tips:'检测中...',
				iaRtu: {},
				parameterDataList: [],
				showSpin: false,
				iat: {
					show: false,
					iconColor: '',
					icon: '',
					restTime: 0,
					timeList: [],
				},
				timer: '',
			}
		},
		methods: {
			showRemTime() {
				//倒计时
			
				if (this.iat.restTime <= 0) {
					this.setStateValue(0)
					clearInterval(this.timer);
				} else {
					this.iat.restTime--;
			
				}
			},
			getRtuInfo() {
				if (this.rtuNumber != null && this.rtuNumber != '') {
					getRtu(this.rtuNumber).then(res => {
						const data = res.data
						if (data.success == 1) {
							// console.log(data)
							this.iaRtu = data.iaRtu
							this.getRuDataInfo()
						} else {
							this.$Message.error(this.rtuNumber + data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				}

			},
			setRtu(value) {
				// alert(this.iat.setRtuTimeValue)
				if (value != 0) {
					value = Number(value[0])
					// alert(value)
				}
				var rtuData = {
					rtuNumber: this.rtuNumber,
					orderType: 2,
					parameterDataList: [{
							parameterIndex: 2,
							value: 1
						},
						{
							parameterIndex: 3,
							value: value
						},
					]
				}
				// console.log(rtuData)
				this.showSpin = true
				this.tips = '操作中...'
				setRtuData(rtuData).then(res => {
					const data = res.data
					this.showSpin = false
					if (data.success == 1) {
						var rtuData = data.rtuData
						var paramList = rtuData.parameterDataList
						for (var i = 0; i < paramList.length; i++) {
							if (paramList[i].parameterId == 25) {
								this.iat.restTime = paramList[i].value
								this.setStateValue(paramList[i].value)
								clearInterval(this.timer);
								this.timer = setInterval(this.showRemTime, 1000);
								if (paramList[i].value > 0) {
									this.$Message.success('开启成功')
								} else {
									this.$Message.success('关闭成功')
								}
							}
						}
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.showSpin = false
					alert(error)
				})

			},

			setStateValue(stateValue) {
				if (stateValue > 1) {
					this.iat.icon = " iconfont icon-water_switch_opened"
					this.iat.iconColor = "#19be6b"
				} else if (stateValue == 0) {
					this.iat.icon = " iconfont icon-water_switch_closed"
					this.iat.iconColor = "#ed4014"
					this.iat.restTime = 0
				} else {
					this.iat.icon = ''
				}
			},
			getRuDataInfo() {
				if (this.rtuNumber != null && this.rtuNumber != '') {
					this.showSpin = true
					getRtuData(this.rtuNumber).then(res => {
						const data = res.data
						this.showSpin = false
						if (data.success == 1) {
							// console.log(data)
							// this.iaRtu = data.iaRtu
							const rtuData = data.rtuData
							if (rtuData.parameterDataList != null && rtuData.parameterDataList) {

								rtuData.parameterDataList.map(item => {
									if (item.parameterId == 25) {
										this.setStateValue(item.value)
										this.iat.show = true
										this.iat.restTime = item.value
										clearInterval(this.timer);
										this.timer = setInterval(this.showRemTime, 1000);
									}
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

		},
		created() {
			this.getRtuInfo()
			this.iat.timeList = rtuTimeDataList
		},
		beforeDestroy() {
			clearInterval(this.timer);
		}
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
