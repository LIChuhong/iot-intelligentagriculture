<template>
	<link-form style="width: 50%;margin:  0 auto;">添加</link-form>
</template>


<script>
	import LinkForm from '../component/link-form.vue'
	export default{
		components:{
			LinkForm
		},
		data(){
			return{
				linkForm:{
					linkageName:'',
					linkageType:'',
					linkageRtuNumber:'',
					linkageParameterId:'',
					parameterMaxValue:'',
					parameterMinValue:'',
					tips:''
				}
			}
		}
	}
</script>

<style>
</style>
