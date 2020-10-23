<template>
	<div>
		<Form ref="linkForm" :model="linkForm" :rules="linkRule" :label-width="90" :label-colon="true" label-position="left">
			<FormItem label="联动名称" prop="linkageName">
				<Input :maxlength="50" type="text" v-model="linkForm.linkageName" placeholder="请输入联动名称">
				</Input>
			</FormItem>
			<FormItem label="联动类型" prop="linkageType">
				<RadioGroup v-model="linkForm.linkageType">
					<Radio :label="0"><span>执行联动</span></Radio>
					<Radio :label="1"><span>反馈联动</span></Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="联动设备编号" prop="linkageRtuNumber">
				<Input @on-change="refresh" type="number" v-model="linkForm.linkageRtuNumber" placeholder="请输入联动设备编号">
				</Input>
			</FormItem>
			<FormItem label="联动参数" prop="linkageParameterId">
				<Select v-model="linkForm.linkageParameterId" placeholder="请输入联动参数" @on-open-change="getLinkageParamList">
					<Option v-for="item in parameterList" :value="item.id" :key="item.id">{{ item.parameterName }}</Option>
				</Select>
			</FormItem>
			<FormItem label="延迟秒数" prop="delay">
				<Input style="width: 100px" type="number" v-model="linkForm.delay" placeholder="请输入联动延迟秒数">
				<span slot="append">秒</span></Input>
			</FormItem>
			<FormItem label="最大值" prop="parameterMaxValue">
				<Input type="number" v-model="linkForm.parameterMaxValue" placeholder="请输入联动参数无法通过检测的最大值">
				</Input>
			</FormItem>
			<FormItem label="最小值" prop="parameterMinValue">
				<Input type="number" v-model="linkForm.parameterMinValue" placeholder="请输入联动参数无法通过检测的最小值">
				</Input>
			</FormItem>
			<FormItem label="提示" prop="tips">
				<Input :maxlength="100" type="textarea" v-model="linkForm.tips" placeholder="请输入联动参数无法通过检测的提示">
				</Input>
			</FormItem>

			<FormItem style="text-align:center;">
				<Button @click="handleReset('linkForm')" style="margin-right:0.625rem">重置</Button>
				<Button type="primary" @click="handleSubmit('linkForm')">
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
	import {
		addRtuLinkage,getRtuLinkage,updateRtuLinkage
	} from '@/api/strategy.js'
	import {
		rtuTypeParameterList
	} from '@/api/rtu.js'
	export default {
		props:['linkId'],
		data() {
			return {
				showSpin: false,
				linkForm: {
					linkageName: '',
					linkageType: 0,
					linkageRtuNumber: '',
					linkageParameterId: '',
					delay: '0',
					parameterMaxValue: '',
					parameterMinValue: '',
					tips: '',
					linkageParameterIndex: ''
				},
				parameterList: [],
				linkRule: {
					linkageName: [{
						required: true,
						message: '联动名称不能为空',
						// validator: validateUserName,
						trigger: 'blur'
					}],
					linkageType: [{
						required: true,
						type: 'number',
						message: '请选择联动类型',
						trigger: 'change'
					}],
					linkageRtuNumber: [{
						required: true,
						// type: 'number',
						message: '请输入设备编号',
						trigger: 'blur'
					}],
					linkageParameterId: [{
						required: true,
						type: 'number',
						message: '请选择联动参数',
						trigger: 'blur'
					}],
					parameterMinValue: [{
						required: true,
						// type: 'number',
						message: '该项不能为空',
						trigger: 'blur'
					}],
					parameterMaxValue: [{
						required: true,
						// type: 'number',
						message: '该项不能为空',
						trigger: 'blur'
					}],
					delay: [{
						required: true,
						// type: 'number',
						message: '该项不能为空',
						trigger: 'blur'
					}],

				}

			}
		},
		methods: {
			getLinkInfo(){
				if(this.linkId != '' && this.linkId != null){
					this.showSpin = true
					getRtuLinkage(this.linkId).then(res=>{
						const data = res.data
						this.showSpin = false
						if(data.success == 1){
							var rtuLinkage = data.rtuLinkage
							this.linkForm = {
								linkageName:rtuLinkage.linkageName,
								linkageType:rtuLinkage.linkageType,
								linkageRtuNumber:rtuLinkage.linkageRtuNumber.toString(),
								linkageParameterId:rtuLinkage.linkageParameterId,
								parameterMinValue:rtuLinkage.parameterMinValue.toString(),
								parameterMaxValue:rtuLinkage.parameterMaxValue.toString(),
								delay:rtuLinkage.delay.toString(),
								tips:rtuLinkage.tips
							}
							
							// console.log(data.rtuLinkage)
							if(rtuLinkage.linkageRtuNumber){
								this.showSpin = true
								// console.log(this.linkForm)
								this.getLinkageParamList(true)
								// this.linkForm.linkageParameterId = rtuLinkage.linkageParameterId
							}
							console.log(data)
						}else{
							this.$Message.error(data.errorMessage)
						}
					}).catch(error=>{
						this.showSpin = false
						alert(error)
					})
				}
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						// this.showSpin = true
						var list = this.parameterList
						for(var i = 0; i < list.length ; i++){
							if(this.linkForm.linkageParameterId == list[i].id){
								this.linkForm.linkageParameterIndex = i
								break
							}
						}
						
						var rtuLinkage = {
							linkageName:this.linkForm.linkageName,
							linkageType:this.linkForm.linkageType,
							linkageRtuNumber:parseInt(this.linkForm.linkageRtuNumber),
							linkageParameterId:this.linkForm.linkageParameterId,
							linkageParameterIndex:this.linkForm.linkageParameterIndex,
							delay:parseInt(this.linkForm.delay),
							parameterMinValue:Number(this.linkForm.parameterMinValue),
							parameterMaxValue:Number(this.linkForm.parameterMaxValue),
							tips:this.linkForm.tips
							 // linkageParameterIconCode:"icon_p",
						}
						// console.log(rtuLinkage)
						this.showSpin = true
						if(this.linkId != null && this.linkId != ''){
							rtuLinkage.id = this.linkId
							updateRtuLinkage(rtuLinkage).then(res => {
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
						}else{
							addRtuLinkage(rtuLinkage).then(res => {
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
			},
			getLinkageParamList(val) {

				if (val) {
					if (this.linkForm.linkageRtuNumber != null && this.linkForm.linkageRtuNumber != '') {
						var rtuNumber = parseInt(this.linkForm.linkageRtuNumber)
						rtuTypeParameterList(rtuNumber).then(res => {
							const data = res.data
							this.showSpin = false
							if (data.success == 1) {
								// console.log(data)
								this.parameterList = data.parameterList
							} else {
								this.$Message.error(data.errorMessage)
							}
						}).catch(error => {
							this.showSpin = false
							alert(error)
						})
					} else {
						this.parameterList = []
						alert('请先填写联动设备编号，再进行联动参数选择')
					}
				}
			},
			refresh(){
				// alert(1)
				this.linkForm.linkageParameterId = ''
			}
		},
		watch: {
			'linkForm.linkageRtuNumber': function(val, oldVal) {
				// this.linkForm.linkageParameterId = ''
			}
		},
		mounted() {
			this.getLinkInfo()
		}
	}
</script>

<style>
</style>
