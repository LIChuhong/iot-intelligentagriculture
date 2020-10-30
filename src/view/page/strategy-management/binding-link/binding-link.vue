<template>
	<div>
		<div style="text-align: center;margin-bottom: 1.25rem;">

			<span>设备编号：</span>
			<Input type="number" v-model="rtuNumber" placeholder="请输入设备编号" style="width: 18.75rem;"></Input>
			<Button type="primary" icon="md-add" @click="showBindingLink = true" ghost style="margin: 0 1.25rem;">添加绑定</Button>
			<Button type="primary" @click="handleSubmit">提交</Button>

		</div>
		<div>
			<p>绑定联动列表：</p>
			<Table size="small" border :columns="bindingLinkColumns" :data="bindingLinkData" :loading="tableLoading">
				
				<template slot-scope="{ row, index }" slot="linkageType">
					<span v-show="row.linkageType == 0">执行联动</span>
					<span v-show="row.linkageType == 1">反馈联动</span>
					<span v-show="row.linkageType == 2">监测联动</span>
				
				</template>
				
				<template slot-scope="{ row, index }" slot="action">
				
					<Button icon="md-trash" type="error" size="small">删除</Button>
				
				</template>
			
			</Table>
		</div>
		<Modal title="选择联动" v-model="showBindingLink" footer-hide>
			<binding-link-list @change-linding-ok="changeLindingOk"></binding-link-list>
		</Modal>
	</div>


</template>

<script>
	import { linkColumns } from '@/data/columns.js'
	import BindingLinkList from '../component/binding-link-list.vue'
	export default {
		components:{
			BindingLinkList
		},
		data() {
			return {
				showBindingLink:false,
				bindingLinkColumns:linkColumns,
					rtuNumber: '',
					bindingLinkData:[]
			}
		},
		methods:{
			handleSubmit(){
				
			},
			changeLindingOk(list){
				this.bindingLinkData = list
				this.showBindingLink = false
			}
		}
	}
</script>

<style>
</style>
