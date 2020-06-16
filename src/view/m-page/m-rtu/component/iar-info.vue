<template>
	<div>
		<Row>
        <Col span="8">
            <div><span>信号强度:</span></div>
			<div style="margin: 0.625rem 0;"><span>控制状态:</span></div>
			<div><span>剩余时间:</span></div>
        </Col>
        <Col span="8" style="text-align: center">
           <img :src="iaRtu.rtuTypeImgUrl" style="height: 6.25rem;"/>
        </Col>
		<Col span="8" style="text-align:right">
		    <Button type="success" ghost>浇水记录</Button>
			<Button style="margin: 0.625rem 0;" type="info">设置浇水</Button>
		</Col>
    </Row>
	</div>
</template>

<script>
	import { getRtu,getRtuData} from '@/api/rtu.js'
	export default{
		props:['rtuNumber'],
		data(){
			return{
				iaRtu:{},
			}
		},
		methods:{
			getRtuInfo(){
				if(this.rtuNumber != null && this.rtuNumber != ''){
					getRtu(this.rtuNumber).then(res=>{
						const data = res.data
						if(data.success == 1){
							console.log(data)
							this.iaRtu = data.iaRtu
						}else{
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				}
				
			}
		},
		computed(){
			
		},
		created() {
			this.getRtuInfo()
		},
	}
</script>

<style>
</style>
