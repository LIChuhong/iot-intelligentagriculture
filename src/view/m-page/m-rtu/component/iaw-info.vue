<template>
	<div>
		<!-- 浇灌器 -->
		<Row>
		    <Col span="8">
		        <div style="margin-bottom:0.625rem" v-for="(item , index) in parameterDataList" :key="index"><span>{{item.parameterName}}:{{item.value}}{{item.unit}}</span></div>
				<!-- <div style="margin: 0.625rem 0;"><span>控制状态:</span></div>
				<div><span>剩余时间:</span></div> -->
		    </Col>
		    <Col span="8" style="text-align: center">
		       <img :src="iaRtu.rtuTypeImgUrl" width="100%"/>
		    </Col>
			<Col span="8" style="text-align: right;">
			    <Button type="success" ghost >浇水记录</Button>
				<Button style="margin: 0.625rem 0;" type="info">设置浇水</Button>
				
			</Col>
		</Row>
		<Spin fix v-show="showSpin"  style="background: rgba(255,255,255,0.3);">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载中...</div>
		</Spin>
	</div>
</template>

<script>
	import {
		getRtu,
		getRtuData
	} from '@/api/rtu.js'
	import {
		getSignal
	} from '@/libs/tools.js'
	export default {
		props: ['rtuNumber'],
		data() {
			return {
				iaRtu: {},
				parameterDataList:[],
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
						} else {
							this.$Message.error(this.rtuNumber+data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				}

			},
			getRuDataInfo(){
				if (this.rtuNumber != null && this.rtuNumber != '') {
					this.showSpin = true
					getRtuData(this.rtuNumber).then(res => {
						const data = res.data
						this.showSpin = false
						if (data.success == 1) {
							// console.log(data)
							// this.iaRtu = data.iaRtu
							const rtuData = data.rtuData
							if(rtuData.parameterDataList != null && rtuData.parameterDataList){
								this.parameterDataList = rtuData.parameterDataList.map(item=>{
									if(item.parameterId == 4){
										item.icon = getSignal(value)
									}
									return item
								})
								
							}
							
						} else {
							this.$Message.error(this.rtuNumber+data.errorMessage)
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
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
	
</style>
