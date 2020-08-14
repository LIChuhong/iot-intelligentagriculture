<template>
	<div>
		<Form :label-width="100" ref="paramAssForm" :model="paramAssForm" :rules="paramAssRule" label-position="left">

			<FormItem label="设备编号" prop="rtuNumber">
				<Input type="number" v-model="paramAssForm.rtuNumber" placeholder="请输入设备编号"></Input>
			</FormItem>
			<FormItem v-for="(item, index) in paramAssForm.warnParamList" :key="index" :label="'告警参数'+(index+1)" :prop="'warnParamList.' + index + '.id'">
				<div>
					<Select v-model="warnParam" @on-open-change="changeWarnParam" placeholder="请选择告警参数">
						<Option v-for="i in warnList" :value="i.value" :key="i.value">{{ item.label }}</Option>
					</Select>
					<Row>
						<Col span="18">
						<p>告警名称:{{item.warnName}}</p>
						<p>告警上限:{{item.warnMaxValue}}</p>
						<p>告警下限:{{item.warnMinValue}}</p>
						</Col>
						<Col span="6" style="overflow: hidden;">
						<p><Button size="small" type="primary">选择</Button></p>
						<p><Button size="small" v-show="index == (paramAssForm.warnParamList.length-1)" type="primary" ghost @click="handleAddwarnParam"
							 icon="ios-add"></Button></p>
						<p><Button size="small" v-show="index != 0" style="margin-top: 0.3125rem;" type="error" @click="handleRemove(index)"
							 icon="ios-trash"></Button></p>
						</Col>
					</Row>
				</div>
			</FormItem>
			<FormItem style="text-align: center;">
				<Button @click="handleReset('strategyForm')" style="margin-right: 8px">重置</Button>
				<Button type="primary" @click="handleSubmit('strategyForm')">
					<slot></slot>
				</Button>

			</FormItem>
		</Form>
		<Spin fix v-show="showSpin">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载中...</div>
		</Spin>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				paramAssForm: {
					rtuNumber: '',
					warnParamList: [{
						warnParam: '',
						warnName: '',
						warnMaxValue: null,
						warnMinValue: null
					}],
					warnList: []
				}
			}
		},
		methods: {
			handleAddwarnParam() {
				this.paramAssForm.warnParamList.push({
					warnParam: '',
					warnName: '',
					warnMaxValue: null,
					warnMinValue: null
				})
			},
			handleRemove(index) {
				this.paramAssForm.warnParamList.splice(index, 1)
			}
		}
	}
</script>

<style>
</style>
