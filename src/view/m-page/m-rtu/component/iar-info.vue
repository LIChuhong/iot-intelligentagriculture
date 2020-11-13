<template>
	<div>
		<!-- 气象站 -->
		<div style="height: 6.25rem;text-align: center;">
			<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
		</div>
		<div class="iarStyle">
			<!-- <p>信号强度:</p> -->
			
				<div style="width: 50%;text-align: center;" v-for="(item,index) in parameterDataList" :key="index">
				<p><span><Icon :color="item.iconColor" :type="' iconfont'+ ' ' +item.iconFont" /></span>{{item.parameterName}}:<span :style="{color:item.iconColor }">{{item.value}}{{item.unit}}</span></p>
				
			</div>
		</div>
		<Spin fix v-show="showSpin" style="background: rgba(255,255,255,0.3);">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>检测中...</div>
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
							this.getRuDataInfo()
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
									if (item.parameterId == 9) {
										item.iconColor = '#0187fc'
									} else if (item.parameterId == 10) {
										item.iconColor = '#16c8c4'
									} else if (item.parameterId == 11) {
										item.iconColor = '#fc9143'
									} else if (item.parameterId == 12) {
										item.iconColor = '#ffce6b'
									} else if (item.parameterId == 13) {
										item.iconColor = '#67c300'
									} else if (item.parameterId == 14) {
										item.iconColor = '#16c8c4'
									} else if (item.parameterId == 15) {
										item.iconColor = '#fc9143'
									} else if (item.parameterId == 16) {
										item.iconColor = '#ffce6b'
									} else if (item.parameterId == 17) {
										item.iconColor = '#0187fc'
									} else if (item.parameterId == 18) {
										item.iconColor = '#4ad595'
									}else{
										item.iconColor = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
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
			
		},
	}
</script>

<style>
	.iarStyle{
		display: flex;
		flex-wrap:wrap;
		margin: 1.25rem 0;
	}
	.iarStyle p {
		margin: 0.3125rem 0;
		font-size: 1rem;
		
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
