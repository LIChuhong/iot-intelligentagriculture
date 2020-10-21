<template>
	<div>
		<Form ref="videoForm" :model="videoForm" :rules="videoRule" :label-width="100" :label-colon="true" label-position="left">
			<FormItem label="视频名称" prop="videoName">
				<Input :maxlength="20" type="text" v-model="videoForm.videoName" placeholder="请输入视频名称">
				</Input>
			</FormItem>
			<FormItem label="设备序列号" prop="deviceSerial">
				<Input :maxlength="10" type="text" v-model="videoForm.deviceSerial" placeholder="请输入设备序列号">
				</Input>
			</FormItem>
			<FormItem label="设备类型" prop="videoType">
				<RadioGroup v-model="videoForm.videoType">
					<Radio :label="0"><span>枪机</span></Radio>
					<Radio :label="1"><span>球机</span></Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="所属品牌" prop="brandTag">
				<Input readonly v-model="videoForm.brandTag" search enter-button="选择" placeholder="请选择所属品牌标识" @on-search="showBrandList"></Input>

			</FormItem>
			<FormItem v-show="videoForm.brandTag == 'YSY'" label="设备信息" prop="videoDeviceInfo">
				<Row>
					<Col span="6"><span>设备序列号：</span></Col>
					<Col span="18"><Input :maxlength="100" type="text" v-model="videoForm.videoDeviceInfo.deviceSerial" placeholder="请输入设备序列号"></Input></Col>
					<Col span="6"><span>设备名称：</span></Col>
					<Col span="18"><Input :maxlength="100" type="text" v-model="videoForm.videoDeviceInfo.deviceName" placeholder="请输入设备名称"></Input></Col>
					<Col span="6"><span>通道：</span></Col>
					<Col span="18"><Input :maxlength="100" type="number" v-model="videoForm.videoDeviceInfo.channelNo" placeholder="请输入设备通道"></Input></Col>
					<Col span="6"><span>流畅地址：</span></Col>
					<Col span="18"><Input :maxlength="500" type="text" v-model="videoForm.videoDeviceInfo.fluentUrl" placeholder="请输入视频流畅地址"></Input></Col>
					<Col span="6"><span>高清地址：</span></Col>
					<Col span="18"><Input :maxlength="500" type="text" v-model="videoForm.videoDeviceInfo.highDefinitionUrl"
					 placeholder="请输入视频高清地址"></Input></Col>
				</Row>
			</FormItem>
			<FormItem label="设备描述" prop="videoDesc">
				<Input maxlength="255" v-model="videoForm.videoDesc" type="textarea" :rows="5" placeholder="请输入设备描述"></Input>
			</FormItem>
			<FormItem style="text-align:center;">
				<Button @click="handleReset('videoForm')" style="margin-right:0.625rem">重置</Button>
				<Button type="primary" @click="handleSubmit('videoForm')">
					<slot></slot>
				</Button>
			</FormItem>
		</Form>
		<Modal title="选择所属品牌" v-model="showBrand" footer-hide>
			<brand-list v-if="showBrand" :show-brand="showBrand" @get-brand-info="getBrandInfo"></brand-list>
		</Modal>
		<Spin fix v-show="showSpin">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载中...</div>
		</Spin>
	</div>
</template>
<script>
	import BrandList from '../brand-list/brand-list.vue'
	import {
		addVideo,getVideo,updateVideo
	} from '@/api/video.js'
	export default {
		components: {
			BrandList
		},
		props:['videoId'],
		data() {
			return {
				showSpin: false,
				showBrand: false,
				videoForm: {
					videoName: '',
					deviceSerial: '',
					videoType: 0,
					videoDesc: '',
					brandTag: '',
					brandAccountId: '',
					videoDeviceInfo: {
						deviceSerial: '',
						deviceName: '',
						channelNo: '',
						fluentUrl: '',
						highDefinitionUrl: ''
					}
				},
				videoRule: {
					videoName: [{
						required: true,
						message: '视频名称不能为空',
						trigger: 'blur'
					}],
					deviceSerial: [{
						required: true,
						message: '视频序列号不能为空',
						trigger: 'blur'
					}],
					brandTag: [{
						required: true,
						message: '请选择所属品牌',
						trigger: 'change'
					}],
					videoType: [{
						required: true,
						type: 'number',
						message: '请选择设备类型',
						trigger: 'change'
					}],
				}
			}
		},
		methods: {
			getVideoInfo(){
				if(this.videoId != null && this.videoId != ''){
					getVideo(this.videoId).then(res=>{
						const data = res.data
						if(data.success == 1){
							// console.log(data)
							const video = data.video
							this.videoForm = {
								deviceSerial:video.deviceSerial,
								videoName:video.videoName,
								brandAccountId:video.brandAccountId,
								videoType:video.videoType,
								videoDesc:video.videoDesc,
								brandTag:video.brandTag,
								videoDeviceInfo:JSON.parse(video.videoDeviceInfoJson)
							}
						}else{
							this.$Message.error(data.errorMessage)
						}
					}).catch(error=>{
						alert(error)
					})
				}
			},
			showBrandList() {
				this.showBrand = true
			},
			getBrandInfo(row) {
				this.videoForm.brandTag = row.brandTag
				this.videoForm.brandAccountId = row.id
				if (this.videoForm.brandTag == 'YSY') {
					this.videoForm.videoDeviceInfo.deviceSerial = this.videoForm.deviceSerial
					this.videoForm.videoDeviceInfo.deviceName = this.videoForm.videoName
				}
				// console.log(row)
				this.showBrand = false
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						var videoDeviceInfo = this.videoForm.videoDeviceInfo
						if (this.videoForm.brandTag == 'YSY') {

							if (videoDeviceInfo.deviceSerial == '') {
								alert("设备信息中的序列号不能为空")
								return
							}
							if (videoDeviceInfo.channelNo == '') {
								alert("设备信息中的设备通道不能为空")
								return
							}
							this.videoForm.videoDeviceInfo.channelNo = parseInt(videoDeviceInfo.channelNo)
							var video = {
								videoName: this.videoForm.videoName,
								deviceSerial: this.videoForm.deviceSerial,
								videoType: this.videoForm.videoType,
								videoDesc: this.videoForm.videoDesc,
								brandTag: this.videoForm.brandTag,
								brandAccountId: this.videoForm.brandAccountId,
								videoDeviceInfoJson: JSON.stringify(this.videoForm.videoDeviceInfo)
							}
							this.showSpin = true
							if(this.videoId != null && this.videoId != ''){
								video.id = this.videoId
								updateVideo(video).then(res => {
									const data = res.data
									this.showSpin = false
									if (data.success == 1) {
										this.$Message.success('更新成功');
								
									} else {
										this.$Message.error(data.errorMessage);
									}
								}).catch(error => {
									this.showSpin = false
									alert(error)
								})
							}else{
								addVideo(video).then(res => {
									const data = res.data
									this.showSpin = false
									if (data.success == 1) {
										this.$Message.success('添加成功');
								
									} else {
										this.$Message.error(data.errorMessage);
									}
								}).catch(error => {
									this.showSpin = false
									alert(error)
								})
							}
							
						} else {
							videoDeviceInfo = {
								deviceSerial: '',
								deviceName: '',
								channelNo: '',
								fluentUrl: '',
								highDefinitionUrl: ''
							}
							alert('该所属品牌无效，请选择其他品牌')
						}

						// }
					} else {
						//this.$Message.error('Fail!');
					}
				})
			},


		},
		mounted() {
			this.getVideoInfo()
		}
	}
</script>

<style>
</style>
