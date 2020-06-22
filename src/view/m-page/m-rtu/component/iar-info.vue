<template>
	<div>
		<!-- 气象站 -->
		<div style="height: 6.25rem;text-align: center;">
			<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
		</div>
		<div class="iarStyle">
			<!-- <p>信号强度:</p> -->
			<Row>
				<Col span="12" v-for="(item,index) in parameterDataList" :key="index">
				<p><span><Icon :type="item.icon" /></span>{{item.parameterName}}:{{item.value}}{{item.unit}}</p>
				</Col>
			</Row>
		</div>
		<Spin fix v-show="showSpin" style="background: rgba(255,255,255,0.3);">
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
							const rtuData = data.rtuData
							if(rtuData.parameterDataList != null && rtuData.parameterDataList){
								this.parameterDataList = rtuData.parameterDataList.map(item=>{
									if(item.parameterName == '空气温度'){
										item.icon = ' iconfont icon-ic_kqwd'
									}else if(item.parameterName == '风速'){
										item.icon = ' iconfont icon-ic_fs'
									}else if(item.parameterName == '瞬时降雨量'){
										item.icon = ' iconfont icon-ic_ssyl'
									}else if(item.parameterName == '当天降雨量'){
										item.icon = ' iconfont icon-ic_dtjyl'
									}else if(item.parameterName == '昨天降雨量'){
										item.icon = ' iconfont icon-ic_zryl'
									}else if(item.parameterName == '总降雨量'){
										item.icon = ' iconfont icon-ic_zyl'
									}else if(item.parameterName == '土壤水分'){
										item.icon = ' iconfont icon-ic_trsf'
									}else if(item.parameterName == '大气压'){
										item.icon = ' iconfont icon-ic_dqy'
									}else if(item.parameterName == '风向'){
										item.icon = ' iconfont icon-ic_fx'
									}else if(item.parameterName == '空气湿度'){
										item.icon = ' iconfont icon-ic_kqsd'
									}else{
										item.icon = " "
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
	.iarStyle p {
		margin: 0.3125rem 0;
	}

	.iarStyle p span {
		color:#87ceeb;
	}
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
