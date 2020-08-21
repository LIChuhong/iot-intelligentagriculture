<template>
	<div>
		<Form :label-width="120" ref="dataForm" :model="dataForm" :rules="dataRule" label-position="right">

			<FormItem label="数据画面名称" prop="dataPictureName">
				<Input type="text" :maxlength="100" v-model="dataForm.dataPictureName" placeholder="请输入数据画面名称"></Input>
			</FormItem>
			<FormItem label="关联农场" prop="contactFarmId">
				<Select v-model="dataForm.contactFarmId" @on-open-change="getFarmList" placeholder="请选择关联农场">
					<Option v-for="i in farmList" :value="i.id.toString()" :key="i.id">{{ i.mapName }}</Option>
				</Select>
			</FormItem>
			<FormItem label="农场地理坐标" prop="farmPathName">
				<Input readonly v-model="farmPathName" search enter-button="选择" placeholder="请选择农场地理坐标" @on-search="getFarmPath"></Input>
			</FormItem>
			<FormItem v-for="(item, index) in dataForm.videoList" :key="index" :label="'视频'+(index+1)" :prop="'videoList.' + index">
				<Row>
					<Col span="22">
					<div style="overflow: hidden;">
						<p style="width:4.375rem;float: left;">设备名称：</p>
						<Input style="width:70%;" v-model="item.videoName" placeholder="请输入设备名称" /></Input>
					</div>
					<div style="overflow: hidden;margin: 0.3125rem 0;">
						<p style="width:4.375rem;float: left;">高清地址：</p>
						<Input style="width:70%;" v-model="item.hdAddress" placeholder="请输入高清地址" />
					</div>
					<div style="overflow: hidden;">
						<p style="width:4.375rem;float: left;">流畅地址：</p>
						<Input style="width:70%;" v-model="item.fluentAddress" placeholder="请输入流畅地址" />
					</div>

					</Col>
					<Col span="2">
					<Button size="small" v-show="index != 0" style="margin-top: 0.3125rem;" type="error" @click="handleRemove(index)"
					 icon="ios-trash"></Button>
					<Button size="small" v-show="index == dataForm.videoList.length-1" type="primary" ghost @click="handleAddDataList"
					 icon="ios-add"></Button>

					</Col>
				</Row>
			</FormItem>
			<FormItem style="text-align: center;">
				<Button @click="handleReset('dataForm')" style="margin-right: 8px">重置</Button>
				<Button type="primary" @click="handleSubmit('dataForm')">
					<slot></slot>
				</Button>

			</FormItem>
		</Form>
		<Modal title="农场地理位置" v-model="showMap" fullscreen>
			<baidu-map class="bm-map" map-type="BMAP_NORMAL_MAP" scroll-wheel-zoom="true" :center="center" :zoom="zoom" @ready="handler"
			 @click="getPoint">
				<bm-control>
					<Input v-model="keyword" @on-search="findArea" placeholder="请输入查找地址" style="width:100%" icon="ios-search"></Input>
				</bm-control>
				<!-- <bm-view class="bm-map"></bm-view> -->
				<bm-local-search :select-first-result="true" :page-capacity="5" :keyword="keyword" :auto-viewport="true" :zoom="15"
				 :location="location" :panel="false"></bm-local-search>
			</baidu-map>
			<template slot="footer">
				<div style="overflow: hidden;text-align: left;">
					<span>选择位置:{{dataForm.farmPathName}}</span>
					<Button type="primary" @click="handleSubmit('dataForm')" style="float: right;">
						确定
					</Button>
				</div>
				
			</template>
		</Modal>
		<Spin fix v-show="showSpin">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载中...</div>
		</Spin>
	</div>
</template>

<script>
	import {
		getMapList
	} from '@/api/farm.js'
	export default {
		components: {

		},
		data() {
			return {
				farmAddr: '',
				customAataList: [],
				location: '',
				keyword: '',
				center: {
					lng: 116.404,
					lat: 39.915
				},
				zoom: 15,
				showMap: false,
				orgId: this.$store.state.user.userInfo.orgId,
				showSpin: false,
				farmList: [],
				dataForm: {
					dataPictureName: '',
					contactFarmId: '',
					farmPathName: '',
					farmPath: '',
					videoList: [{
						videoName: '',
						hdAddress: '',
						fluentAddress: ''
					}]
				},
				dataRule: {
					dataPictureName: [{
						required: true,
						message: '数据画面名称不能为空',
						// validator: validateUserName,
						trigger: 'blur'
					}],
					contactFarmId: [{
						required: true,
						message: '请选择关联农场',
						trigger: 'change'
					}],
					farmPathName: [{
						required: true,
						message: '请选择农场地理坐标',
						trigger: 'blur'
					}],

				}

			}
		},
		methods: {
			getPoint(e) {
				let geocoder = new BMap.Geocoder();
				geocoder.getLocation(e.point, rs => {
					console.log(rs)
					this.dataForm.farmPathName = rs.address;
					//地址描述(string)=
					// console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
					// console.log(rs.addressComponents);//结构化的地址描述(object)
					// console.log(rs.addressComponents.province); //省
					// console.log(rs.addressComponents.city); //城市
					// console.log(rs.addressComponents.district); //区县
					// console.log(rs.addressComponents.street); //街道
					// console.log(rs.addressComponents.streetNumber); //门牌号
					// console.log(rs.surroundingPois); //附近的POI点(array)
					// console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
				});
				// this.modalTitle =
			},
			findArea(val) {
				this.keyword = val
			},
			getFarmPath() {
				this.showMap = true
			},
			getFarmList() {
				getMapList(this.orgId).then(res => {
					const data = res.data
					if (data.success == 1) {
						this.farmList = data.mapList
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					alert(error)
				})
			},
			handleRemove(index) {
				this.dataForm.videoList.splice(index, 1)
			},
			handleAddDataList() {
				this.dataForm.videoList.push({
					videoName: '',
					hdAddress: '',
					fluentAddress: ''
				})
			},

			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {}

				})
			},
			handler({
				BMap,
				map
			}) {
				// console.log(BMap, map)
				this.center.lng = 116.404
				this.center.lat = 39.915
				this.zoom = 15
			}



		},
		mounted() {},
		created() {
			// this.getRtuList()
		}
	}
</script>

<style>
	.bm-map {
		width: 100%;
		height: 100%;
	}
</style>
