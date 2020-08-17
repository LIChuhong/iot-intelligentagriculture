<template>
	<div class="warnRtuStyle">
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Select v-model="keyField" class="selStyle">
				<Option v-for="item in keyFieList" :key="item.id" :value="item.id">{{item.title}}</Option>
			</Select>
			<Input search enter-button placeholder="请输入关键字" @on-search="findWarnRtuList" class="inputStyle" />
		</div>
		<Table size="small" border :columns="warnRtuColumns" :data="warnRtuData" :loading="tableLoading">

			<template slot-scope="{ row, index }" slot="action">
				<Button type="text" size="small" @click="show_warn_info(row,index)">详情</Button>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		</div>
		<Modal title="编辑信息" v-model="showWRdetails" footer-hide>
		</Modal>
	</div>
</template>

<script>
	import {
		warnRtuColumns
	} from '@/data/columns.js'
	export default {
		data() {
			return {
				tableLoading: false,
				warnRtuColumns: warnRtuColumns,
				keyField: 0,
				showWRdetails: false,
				keyFieList: [{
						id: 0,
						title: '名称'
					},
					{
						id: 1,
						title: '编号'
					}
				],
				warnRtuData: [{}]
			}
		},
		methods: {
			findWarnRtuList() {

			}
		}
	}
</script>

<style>
	.warnRtuStyle .selStyle {
		width: 80px;
		float: left;
		margin-right: 8px;
	}

	.warnRtuStyle .inputStyle {
		width: 300px;
		float: left;
	}

	@media screen and (min-width:300px) and (max-width:900px) {
		.warnRtuStyle {
			margin-top: 0.625rem;
		}
		.warnRtuStyle .inputStyle{
			width: 60%;
		}

		.warnRtuStyle .ivu-modal-body {
			padding: 0;
		}

		.warnRtuStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
	}
</style>
