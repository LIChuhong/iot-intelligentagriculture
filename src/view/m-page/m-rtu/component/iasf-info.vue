<template>
	<div>
		<div style="height: 6.25rem;text-align: center;">
			<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
		</div>
		<div class="iawStyle">
			<p><span>信号强度:</span></p>
			<Row>
			    <Col span="12">
			        <p>空气温度:</p>
					<p>风速:</p>
					<p>瞬时雨量:</p>
					<p>当天降雨量:</p>
					<p>大气压(mbar):</p>
			    </Col>
			    <Col span="12">
			        <p>空气湿度:</p>
					<p>风向:</p>
					 <p>昨日雨量:</p>
					 <p>总雨量:</p>
					  <p>土壤水分:</p>
			    </Col>
			</Row>
			
		</div>
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
			}
		},
		methods: {
			getRtuInfo() {
				if (this.rtuNumber != null && this.rtuNumber != '') {
					getRtu(this.rtuNumber).then(res => {
						const data = res.data
						if (data.success == 1) {
							console.log(data)
							this.iaRtu = data.iaRtu
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
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
	.iawStyle p{
		margin: 0.3125rem 0;
	}
</style>
