<template>
	<div>
		<!-- 水肥一体机 -->
		<div style="height: 6.25rem;text-align: center;">
			<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
		</div>
		<div class="iasfStyle">
			<!-- <p>信号强度:</p> -->
			<!-- <p v-for="(item,index) in parameterDataList" :key="index"><span><Icon :type="item.icon" /></span>{{item.parameterName}}:{{item.value}}{{item.unit}}</p> -->
			<Row>
				<Col span="12" v-for="(item,index) in parameterDataList" :key="index">
				<p><span>
						<Icon :type="item.icon" /></span>{{item.parameterName}}:{{item.value}}{{item.unit}}</p>
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
				parameterDataList: [],
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
									if (item.parameterName == '1路泵开关区分量') {
										item.icon = ' iconfont icon-ic_kqwd'
									} else if (item.parameterName == '1路泵开关') {
										item.icon = ' iconfont icon-ic_fs'
									} else if (item.parameterName == '2路电机开关区分量') {
										item.icon = ' iconfont icon-ic_ssyl'
									} else if (item.parameterName == '2路电机开关') {
										item.icon = ' iconfont icon-ic_dtjyl'
									} else if (item.parameterName == '3路泵开关区分量') {
										item.icon = ' iconfont icon-ic_zryl'
									} else if (item.parameterName == '3路泵开关') {
										item.icon = ' iconfont icon-ic_zyl'
									} else if (item.parameterName == '电池阀1开关区分量') {
										item.icon = ' iconfont icon-ic_trsf'
									} else if (item.parameterName == '电池阀1开关') {
										item.icon = ' iconfont icon-ic_dqy'
									} else if (item.parameterName == '电池阀2开关区分量') {
										item.icon = ' iconfont icon-ic_fx'
									} else if (item.parameterName == '电池阀2开关') {
										item.icon = ' iconfont icon-ic_kqsd'
									} else {
										item.icon = " "
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
			this.getRuDataInfo()
		},
	}
</script>

<style>
	.iasfStyle p {
		margin: 0.3125rem 0;
	}

	.iasfStyle p span {
		color: #00bfff;
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
