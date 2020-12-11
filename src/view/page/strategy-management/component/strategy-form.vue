<template>
	<div>
		<Form :label-width="100" ref="strategyForm" :model="strategyForm" :rules="strategyRule" label-position="left">

			<FormItem label="策略名称" prop="strategyName">
				<Input type="text" :maxlength="100" v-model="strategyForm.strategyName" placeholder="请输入策略名称"></Input>
			</FormItem>
			<FormItem label="所属组织" prop="belongOrgId">
				<Input readonly v-model="belongOrgName" search enter-button="选择" placeholder="请选择所属组织" @on-search="showBelongOrgList"></Input>
			</FormItem>
			<FormItem label="异常马上结束" prop="isMustAllPass">
				<Checkbox v-model="strategyForm.isMustAllPass"></Checkbox>
			</FormItem>
			<FormItem label="执行模式" prop="exeMode">
				<RadioGroup v-model="strategyForm.exeMode">
					<Radio :label="0"><span>手动</span></Radio>
					<Radio :label="1"><span>自动</span></Radio>
				</RadioGroup>
			</FormItem>
			<FormItem v-for="(item, index) in strategyForm.switchsGroupStrategyList" :key="index" :label="'策略小组'+(index+1)"
			 :prop="'switchsGroupStrategyList.' + index + '.sortIndex'">
				<Row>
					<Col span="22">
					<div style="overflow: hidden;">
						<p style="width:4.375rem;float: left;">排序：</p><Input style="width:60%;" type="number" v-model="item.sortIndex"
						 placeholder="请输入排序"></Input>
					</div>
					<div style="overflow: hidden;margin: 0.3125rem 0;">
						<p style="width:4.375rem;float: left;">工作时长：</p>
						<TimePicker :editable="false" v-model="item.workTime" format="HH:mm:ss" placeholder="选择工作时长" style="width:60%"></TimePicker>
					</div>
					<div style="overflow: hidden;">
						<p style="width:4.375rem;float: left;">下组延迟：</p>
						<TimePicker :editable="false" v-model="item.delayTime" format="HH:mm:ss" placeholder="选择执行下组策略的延迟时间" style="width: 60%"></TimePicker>
					</div>
					<div style="overflow: hidden; margin: 0.3125rem 0 0;">
						<p style="width:4.375rem;float: left;">操控设备：</p>
						<Button size="small" type="primary" ghost @click="addrtuList(index)" icon="md-add">添加设备</Button>
						<div style="float: left;width:100%;border: 0.0625rem solid #dcdee2;margin-top: 0.3125rem;">
							<span v-for="(i,index1) in item.rtuNumberList" :key="index1" style="background: #c5c8ce;padding: 0.3125rem;border-radius:5%;margin-left: 0.3125rem;">{{i.rtuNumber}}
								<Icon type="md-close" style="margin-left: 0.3125rem;cursor:pointer;" @click="delRtu(index,index1)" /></span>

						</div>

					</div>
					</Col>
					<Col span="2">

					<Button size="small" v-show="index == strategyForm.switchsGroupStrategyList.length-1" type="primary" ghost @click="handleAddSgsList"
					 icon="ios-add"></Button>
					<Button size="small" v-show="index != 0" style="margin-top: 0.3125rem;" type="error" @click="handleRemove(index)"
					 icon="ios-trash"></Button>
					</Col>
				</Row>
			</FormItem>
			<FormItem style="text-align: center;">
				<Button @click="handleReset('strategyForm')" style="margin-right: 8px">重置</Button>
				<Button type="primary" @click="handleSubmit('strategyForm')">
					<slot></slot>
				</Button>

			</FormItem>
		</Form>
		<Modal :title="'当前选择:'+ belongOrgTitle" v-model="showBelongOrg">
			<div class="tree-style">
				<org-tree v-if="showBelongOrg" @getBelongOrgInfo="showBelongOrgInfo" :orgTypeId="null"></org-tree>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="belongOrgOk">确定</Button>
			</div>
		</Modal>
		<Modal title="选择操控设备列表" v-model="showRtuModal" footer-hide>
			<rtu-form v-if="showRtuModal" :list="list" @check-rtu-ok="checkRtuOk"></rtu-form>
		</Modal>
		<Spin fix v-show="showSpin">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载中...</div>
		</Spin>
	</div>
</template>

<script>
	import OrgTree from '@/view/components/org-tree.vue'
	import RtuForm from './rtu-list.vue'
	import {
		formatSeconds
	} from '@/libs/tools.js'
	import {
		addSwitchsStrategy,
		getSwitchsStrategy,
		updateSwitchsStrategy
	} from '@/api/strategy.js'
	export default {
		props: {
			strategyId: {
				type: Number
			}
		},
		components: {
			OrgTree,
			RtuForm
		},
		data() {
			return {
				showSpin: false,
				showRtuModal: false,
				selLoading: false,
				showBelongOrg: false,
				belongOrgTitle: '',
				belongOrgInfo: '', //所属组织信息
				belongOrgName: '', //所属组织名称
				strategyForm: {
					strategyName: '',
					belongOrgId: '',
					isMustAllPass: true,
					exeMode: 0,
					switchsGroupStrategyList: [{
						sortIndex: '',
						delayTime: '',
						workTime: '',
						rtuNumberList: []
					}]
				},
				rtuList: [],
				index: null,
				list: [],
				strategyRule: {
					strategyName: [{
						required: true,
						message: '策略名称不能为空',
						// validator: validateUserName,
						trigger: 'blur'
					}],
					belongOrgId: [{
						required: true,
						type: 'number',
						message: '请选择用户所属组织',
						trigger: 'change'
					}],
				}

			}
		},
		methods: {
			handleReset(name) {
				this.$refs[name].resetFields();
				this.belongOrgName = ''
				this.strategyForm.switchsGroupStrategyList = [{
					sortIndex: '',
					delayTime: '',
					workTime: '',
					rtuNumberList: []
				}]

			},
			handleRemove(index) {
				this.strategyForm.switchsGroupStrategyList.splice(index, 1)
			},
			delRtu(index, index1) {
				this.strategyForm.switchsGroupStrategyList[index].rtuNumberList.splice(index1, 1)
			},
			checkRtuOk(list) {
				// console.log(list)
				this.strategyForm.switchsGroupStrategyList[this.index].rtuNumberList = list
				this.showRtuModal = false
				this.index = null
			},
			addrtuList(index) {
				this.index = index
				this.list = this.strategyForm.switchsGroupStrategyList[index].rtuNumberList
				this.showRtuModal = true
			},
			handleAddSgsList() {
				this.strategyForm.switchsGroupStrategyList.push({
					sortIndex: '',
					delayTime: '',
					workTime: '',
					rtuNumberList: []
				})
			},
			showBelongOrgList() { //显示所属组织列表
				this.belongOrgTitle = this.belongOrgName
				this.showBelongOrg = true

			},
			showBelongOrgInfo(data) { //显示所选所属组织信息
				this.belongOrgInfo = data
				this.belongOrgTitle = data[0].orgName
			},
			belongOrgOk() { //确定所属组织
				//const selectedNodes = this.$refs.belongOrgTree.getSelectedNodes();
				this.strategyForm.belongOrgId = this.belongOrgInfo[0].id
				this.belongOrgName = this.belongOrgInfo[0].orgName
				this.showBelongOrg = false
			},
			getStrategyInfo() {

				if (this.strategyId != null && this.strategyId != '') {
					this.showSpin = true
					getSwitchsStrategy(this.strategyId).then(res => {
						this.showSpin = false
						const data = res.data
						if (data.success == 1) {
							// console.log(data)
							let switchsStrategy = data.switchsStrategy
							let switchsGroupStrategyList = []
							let list = switchsStrategy.switchsGroupStrategyList

							for (var i = 0; i < list.length; i++) {
								let rtuNumberList = []
								let list1 = list[i].rtuNumberList
								for (var j = 0; j < list1.length; j++) {
									rtuNumberList.push({
										rtuNumber: list1[j]
									})
								}
								switchsGroupStrategyList.push({
									sortIndex: list[i].sortIndex,
									delayTime: formatSeconds(list[i].delayTime),
									workTime: formatSeconds(list[i].workTime),
									rtuNumberList: rtuNumberList
								})
							}
							// console.log(switchsGroupStrategyList)
							this.strategyForm = {
								strategyName: switchsStrategy.strategyName,
								belongOrgId: switchsStrategy.belongOrgId,
								isMustAllPass: switchsStrategy.mustAllPass,
								switchsGroupStrategyList: switchsGroupStrategyList,
								exeMode: switchsStrategy.exeMode

							}
							this.belongOrgName = switchsStrategy.orgName

						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						this.showSpin = false
						alert(error)
					})
				}
			},

			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						let switchsGroupStrategyList = []
						let list = this.strategyForm.switchsGroupStrategyList
						for (var i = 0; i < list.length; i++) {
							let rtuNumberList = []
							let list1 = list[i].rtuNumberList
							for (var j = 0; j < list1.length; j++) {
								rtuNumberList.push(list1[j].rtuNumber)
							}
							// console.log(rtuNumberList)
							let delayTime = Number(list[i].delayTime.substr(0, 2)) * 3600 + Number(list[i].delayTime.substr(3, 2)) * 60 +
								Number(list[i].delayTime.substr(6, 2))
							let workTime = Number(list[i].workTime.substr(0, 2)) * 3600 + Number(list[i].workTime.substr(3, 2)) * 60 +
								Number(list[i].workTime.substr(6, 2))
							switchsGroupStrategyList.push({
								sortIndex: Number(parseInt(list[i].sortIndex)),
								delayTime: delayTime,
								workTime: workTime,
								rtuNumberList: rtuNumberList
							})
						}
						let strategyForm = {
							strategyName: this.strategyForm.strategyName,
							belongOrgId: this.strategyForm.belongOrgId,
							mustAllPass: this.strategyForm.isMustAllPass,
							switchsGroupStrategyList: switchsGroupStrategyList,
							exeMode: this.strategyForm.exeMode
						}
						this.showSpin = true
						if (this.strategyId != null && this.strategyId != '') {
							strategyForm.id = this.strategyId
							updateSwitchsStrategy(strategyForm).then(res => {
								this.showSpin = false
								const data = res.data
								if (data.success == 1) {
									this.$Message.success('更新成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})
						} else {
							addSwitchsStrategy(strategyForm).then(res => {
								this.showSpin = false
								const data = res.data
								if (data.success == 1) {
									this.$Message.success('添加成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})
						}



					}

				})
			}

		},
		mounted() {
			this.getStrategyInfo()
		},
		created() {
			// this.getRtuList()
		}
	}
</script>

<style>
</style>
