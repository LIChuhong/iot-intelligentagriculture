<template>
	<div>
		<div style="height: 6.25rem;text-align: center;">
			<img :src="iaRtu.rtuTypeImgUrl" style="height:100%;" />
		</div>
		<div class="iawStyle">
			<p>信号强度:</p>
			<p>抽水泵状态:</p>
			<p>增压泵状态:</p>
			<p>搅拌电机状态:</p>
			<p>电磁阀1状态:</p>
			<p>电磁阀2状态:</p>
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
