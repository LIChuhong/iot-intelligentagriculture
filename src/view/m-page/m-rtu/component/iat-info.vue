<template>
	<div>
		<div>
			<!-- 气象站 -->
			<div style="height: 6.25rem;text-align: center;">
				<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
			</div>
			<div style="margin: 1.25rem 0;">
				<div style="font-size: 1rem;text-align: center;" v-for="(item,index) in parameterDataList" :key="index">
					<p><span>
							<Icon :color="item.iconColor" :type="item.icon" /></span>{{item.parameterName}}:<span :style="{color:item.iconColor }">{{item.value}}{{item.unit}}</span></p>
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
	export default {
		props: ['rtuNumber'],
		data() {
			return {
				tips: '检测中...',
				btnValue: false,
				iaRtu: {},
				parameterDataList: [],
				showSpin: false,
				parameterIndex: null
			}
		},
		watch: {
			
		},
		methods: {
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
								 rtuData.parameterDataList.map(item => {
									if (item.parameterId == 18) {
										item.icon = ' iconfont icon-ic_kqwd'
										item.iconColor = '#0187fc'
										this.parameterDataList.push(item)
									} else if (item.parameterId == 32) {
										item.icon = ' iconfont icon-ic_kqwd'
										item.iconColor = '#0187fc'
										this.parameterDataList.push(item)
									} else if (item.parameterId == 33) {
										item.icon = ' iconfont icon-ic_yf'
										item.iconColor = '#06cce4'
										this.parameterDataList.push(item)
									} else {
										item.icon = ''
										item.iconColor = '#fff'
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
		computed() {

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
