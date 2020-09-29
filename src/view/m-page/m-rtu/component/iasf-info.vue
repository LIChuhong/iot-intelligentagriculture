<template>
	<div>
		<!-- 水肥一体机 -->
		<div style="height: 6.25rem;text-align: center;">
			<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
		</div>
		<div class="iasfStyle">
			<!-- <p>信号强度:</p> -->
			<!-- <p v-for="(item,index) in parameterDataList" :key="index"><span><Icon :type="item.icon" /></span>{{item.parameterName}}:{{item.value}}{{item.unit}}</p> -->

			<!-- <div style="width: 50%;" v-for="(item,index) in parameterDataList" :key="index">
				<p><span>
						<Icon :color="item.iconColor" :type="item.icon" /></span>{{item.parameterName}}:<span :style="{color:item.iconColor}">{{item.title}}</span></p>
			</div>
			<div style="width: 50%;" v-for="(item,index) in parameterDataList1" :key="'1'+index">
				<p><span>
						<Icon :color="item.iconColor" :type="item.icon" /></span>{{item.parameterName}}:<span :style="{color:item.iconColor}">{{item.title}}</span></p>
			</div> -->
			<sf-model></sf-model>
			

		</div>

		<Spin fix v-show="showSpin" style="background: rgba(255,255,255,0.3);">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>检测中...</div>
		</Spin>

	</div>
</template>

<script>
	import SfModel from '@/view/page/farm-management/component/sf-model.vue'
	import {
		getRtu,
		getRtuData
	} from '@/api/rtu.js'
	export default {
		props: ['rtuNumber'],
		components:{
			SfModel
		},
		data() {
			return {
				iaRtu: {},
				parameterDataList: [],
				parameterDataList1: [],
				showSpin: false
			}
		},
		methods: {
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
							var list = []
							var list1 = []
							if (rtuData.parameterDataList != null && rtuData.parameterDataList) {
								rtuData.parameterDataList.map(item => {
									if (item.parameterId == 20 || item.parameterId == 22 || item.parameterId == 28 || item.parameterId == 35) {
										item.icon = ' iconfont icon-ic_kqwd'
										if (item.value == 1) {
											item.title = '开'
											item.iconColor = '#00bfff'
										} else {
											item.title = '关'
											item.iconColor = 'red'
										}
										list.push(item)
									} else if (item.parameterId == 25 || item.parameterId == 27 || item.parameterId == 37 || item.parameterId ==35) {
										item.icon = ' iconfont icon-ic_kqwd'
										if (item.value == 1) {
											item.title = '开'
											item.iconColor = '#00bfff'
										} else {
											item.title = '关'
											item.iconColor = 'red'
										}
										list1.push(item)
									} else {
										item.icon = " "
										if (item.value == 1) {
											item.title = '开'
											item.iconColor = '#00bfff'
										} else {
											item.title = '关'
											item.iconColor = 'red'
										}
									}

								})

							}
							this.parameterDataList = list
							this.parameterDataList1 = list1
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
	.iasfStyle {
		display: flex;
		flex-wrap: wrap
	}

	.iasfStyle p {
		margin: 0.3125rem 0;
		/* font-size: 1rem; */
	}

	.iasfStyle p span {
		color: #00bfff;
	}

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
