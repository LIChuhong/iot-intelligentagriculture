<template>
	<div>
		<!-- 浇灌器 -->
		<Row>
			<Col span="8" style="text-align:left;">
			<Button type="success" ghost >浇水记录</Button>
		    	<Button style="margin: 0.625rem 0;" type="info">设置浇水</Button>
			<!-- <ButtonGroup>
				<Button @click="setRtu" :disabled="btnValue" type="primary">开</Button>
				<Button @click="setRtu" :disabled="!btnValue" type="primary">关</Button>
			</ButtonGroup> -->
			<!-- <RadioGroup v-model="buttonSize" type="button">
				<Radio label="large">开</Radio>
				<Radio label="default"></Radio>
			</RadioGroup> -->

			</Col>
			<Col span="8" style="text-align: center">
			<img :src="iaRtu.rtuTypeImgUrl" width="100%" />
			</Col>

			<Col span="8">
			<div style="margin-bottom:0.625rem" v-for="(item , index) in parameterDataList" :key="index"><span>{{item.parameterName}}:{{item.value}}{{item.unit}}</span></div>
			<!-- <div style="margin: 0.625rem 0;"><span>控制状态:</span></div>
				<div><span>剩余时间:</span></div> -->
			</Col>
		</Row>
		<div style="text-align: center;margin: 1.875rem 0;">
			<ButtonGroup>
				<Button @click="setRtu" :disabled="btnValue" type="primary">开</Button>
				<Button @click="setRtu" :disabled="!btnValue" type="primary">关</Button>
			</ButtonGroup>
			
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
				tips:'检测中...',
				btnValue:false,
				iaRtu: {},
				parameterDataList: [],
				showSpin: false
			}
		},
		methods: {
			setRtu() {
				var value = 0
				if(!this.btnValue){
					value = 1
				}
				var rtuData = {
					rtuNumber: this.rtuNumber,
					orderType: 2,
					parameterDataList: [{
						parameterIndex: 2,
						value: 0
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
				setRtuData(rtuData).then(res=>{
					const data = res.data
					this.showSpin = false
					if(data.success == 1){
						this.btnValue = !this.btnValue
						if(value == 1){
							this.$Message.success('开启成功')
						}else{
							this.$Message.success('关闭成功')
						}
					}else{
						this.$Message.error(data.errorMessage)
					}
				}).catch(error=>{
					this.showSpin = false
					alert(error)
				})
				
			},
			getRtuInfo() {
				if (this.rtuNumber != null && this.rtuNumber != '') {
					getRtu(this.rtuNumber).then(res => {
						const data = res.data
						if (data.success == 1) {
							// console.log(data)
							this.iaRtu = data.iaRtu
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
							if (rtuData.parameterDataList != null && rtuData.parameterDataList) {
								this.parameterDataList = rtuData.parameterDataList.map(item => {
									// if()
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
			this.getRuDataInfo()
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
