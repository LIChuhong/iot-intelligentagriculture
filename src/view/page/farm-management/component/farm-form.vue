<template>
	<div ref="maps" style="height: 100%;overflow: auto;background: #f8f8f9">

		<div ref="map" style="width:80%;float: left;overflow:hidden;background: #808695;height:100%;display: flex;justify-content:center;position: relative;">
			<div v-show="showMap" id="mapBgDiv" ref="mapBgDiv" style="position: absolute;height: 100%;overflow:hidden;background: #00BFFF;">
				<img id="mapBgImg" ref="mapBgImg"  :src="mapBgImgUrl" style="z-index: 1;height: 100%;" draggable="false" :class="{ widthActive:value }" />
				<div v-for="item in rtuImgList" :key="item.rtuNumber" v-drag class="drag" :style="{top:item.heightScale+'%',left:item.widthScale+'%'}">
					<Poptip :title="item.rtuNumber">
						<div class="rtuImgStyle">
							<img :src="item.rtuTypeImgUrl" class="rtu" :alt="item.rtuNumber" :draggable="false" />
						</div>
					</Poptip>
				</div>
			</div>

		</div>
		<div style="width:20%;float: right;background:#dcdee2;height: 100%;position:relative;">
			<!-- <div style="position: absolute;height: 100%;"> -->
			<div style="padding: 5px;text-align: center;">
				<!-- <Button style="margin: 5px 0;" type="success" @click="belongOrgOk">上传地图</Button> -->
				<Upload :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="500"
				 :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadAction" :headers="uploadHeaders"
				 :on-error="handleError">
					<Button style="margin: 5px 0;" type="success">上传地图</Button>
				</Upload>
				<Input search enter-button placeholder="请输入名称关键字..." size="small" />
			</div>
			<div style="position: absolute;top:75px;bottom: 95px;background: #c5c8ce;;padding: 5px;overflow: auto;text-align: left;width: 100%;">
				<!-- <CheckboxGroup v-model="checkRtuData" @on-change="checkRtu">
					<Checkbox style="display: block;" v-for="item in rtuListData" :key="item.id" :label="item">({{item.rtuNumber}}){{item.rtuTypeName}}</Checkbox>
				</CheckboxGroup> -->
				<Tree @on-check-change="checkRtu" :data="rtuListData" show-checkbox multiple></Tree>
				<div v-show="showAddRtu" style="text-align: center;">
					<a>加载更多...</a>
				</div>
			</div>

			<div style="position:absolute;bottom: 0;text-align: center;">
				地图名称:<Input v-model="mapName" placeholder="请输入地图名称" style="width: 70%;" size="small" />
				<Button style="margin: 5px 0;" type="primary" @click="saveMap">保存</Button>
			</div>
			<div v-show="mapId != null" style="position: absolute;bottom: 0;right: 0;"><a @click="goBack">返回</a></div>

		</div>
		<!-- </div> -->
		<div style="position: absolute;right:30px;">
			<Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
				<Icon @click.native="handleFullscreen" :type="value ? 'md-contract' : 'md-expand'" :size="23"></Icon>
			</Tooltip>
		</div>

	</div>
</template>

<script>
	import rainfallDetector from '@/assets/images/rainfallDetector.png'
	import bg from '@/assets/images/map.jpg'
	import {
		addMap,
		getMap,
		updateMap
	} from '@/api/farm.js'
	import {
		getRtuList,
	} from '@/api/rtu'
	export default {
		props: {
			mapId: {
				type: Number,
				default: null
			}
		},
		data() {
			return {
				// belongOrgId:this.$store.state.user.userInfo.belongOrgId,
				showMap: false,
				value: false,
				rtuImgList: [],
				rtuListData: [],
				uploadAction: this.$config.baseUrl.dev + '/v1/uploadFiles',
				uploadHeaders: {
					From: this.$store.state.app.iotInterFace,
					Token: this.$store.state.user.token,
					Dir: '/uploadFile/maps/'
				},
				checkRtuData: [],
				mapBgImgUrl: '',
				searchKey: '',
				maxId: 0,
				pageSize: 50,
				keyField: 0,
				showAddRtu: true,
				mapName: null,

			}
		},

		directives: {
			drag(el, bindings) {
				el.onmousedown = function(e) {

					let mapHeight = document.getElementById('mapBgDiv').offsetHeight;
					let mapWidth = document.getElementById('mapBgDiv').offsetWidth;
					let disx = e.clientX - el.offsetLeft;
					let disy = e.clientY - el.offsetTop;
					// console.log('disx:'+disx)
					document.onmousemove = function(e) {
						el.style.left = (e.clientX - disx) / mapWidth * 100 + '%';
						el.style.top = (e.clientY - disy) / mapHeight * 100 + '%';
					}
					document.onmouseup = function() {
						document.onmousemove = document.onmouseup = null;
					}
				}
			},

		},
		methods: {
			saveMap() {
				let rtusPostionJson = []
				let maps = document.getElementsByClassName('drag');
				// console.log(maps)
				for (var i = 0; i < maps.length; i++) {
					rtusPostionJson.push({
						'rtuNumber': parseInt(maps[i].getElementsByTagName("img")[0].alt),
						'x': parseFloat(maps[i].style.left),
						'y': parseFloat(maps[i].style.top)
					})

				}
				let imgWidth = document.getElementById("mapBgImg").offsetWidth
				let imgHeight = document.getElementById("mapBgImg").offsetHeight
				let map = {
					"mapName": this.mapName,
					"bgImgUrl": this.mapBgImgUrl,
					"rtuPostionList": rtusPostionJson,
					"belongOrgId": this.$store.state.user.userInfo.belongOrgId,
					"imgWidth": imgWidth,
					"imgHeight": imgHeight
				}
				if (this.mapId != null && this.mapId != '') {
					map.id = this.mapId
					// console.log(map)
					updateMap(map).then(res => {
						const data = res.data
						if (data.success == 1) {
							this.$Message.success('更改成功')
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				} else {
					addMap(map).then(res => {
						const data = res.data
						if (data.success == 1) {
							this.$Message.success('保存成功')
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				}



			},
			goBack() {
				this.$emit('go-back', '')
			},
			belong() {
				this.mapBgImgUrl = bg
			},
			checkRtu(list, item) {
				if (this.mapBgImgUrl == null || this.mapBgImgUrl == '') {
					this.$Message.warning('请先选择地图再选择设备')
					item.checked = false
					return
				}
				this.rtuImgList = list
				// console.log(this.rtuListData)
			},
			getRtuList(list) {
				// console.log(list)
				getRtuList(this.keyField, this.searchKey, this.maxId, this.pageSize).then(res => {
					const data = res.data
					if (data.success == 1) {
						data.iaRtuList.map(item => {
							// item.imgSrc = rainfallDetector
							if (this.maxId < item.id) {
								this.maxId = item.id
							}
							item.title = item.rtuNumber + '(' + item.rtuName + '|' + item.rtuTypeName + ')'
							item.checked = false
							for (var i = 0; i < list.length; i++) {
								if (item.id == list[i].id) {
									item.checked = true
									item.heightScale = list[i].heightScale
									item.widthScale = list[i].widthScale
								}
							}
							this.rtuListData.push(item)
							if (data.iaRtuList.length == this.pageSize) {
								this.showAddRtu = true
							} else {
								this.showAddRtu = false
							}
						})
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					alert(error)
				})
			},
			handleSuccess(response, file) {

				if (response.success == 1) {
					// console.log(response.sizeList)
					this.showMap = true
					this.mapBgImgUrl = response.srcList.toString()
				} else {
					this.$Message.error(response.errorMessage);
				}
			},
			handleError(error) {
				this.$Message.error(error);
			},
			handleFormatError(file) {
				this.$Message.warning('上传格式错误，请选择jpg/jpeg/png图片');
			},
			handleMaxSize(file) {
				this.$Message.warning('上传图片过大，请选择少于50kb的图片上传');
			},
			handleFullscreen() {
				// let main = main.body
				let main = this.$refs.maps
				if (this.value) {
					this.value = false
					if (document.exitFullscreen) {
						document.exitFullscreen()
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen()
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen()
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen()
					}

				} else {
					this.value = true
					if (main.requestFullscreen) {
						main.requestFullscreen()
					} else if (main.mozRequestFullScreen) {
						main.mozRequestFullScreen()
					} else if (main.webkitRequestFullScreen) {
						main.webkitRequestFullScreen()
					} else if (main.msRequestFullscreen) {
						main.msRequestFullscreen()
					}
				}
				// console.log(main)
				//this.launchFullScreen(main)

			},
			getMapInfo() {
				// alert(1)
				if (this.mapId != null && this.mapId != '') {
					getMap(this.mapId).then(res => {
						const data = res.data
						if (data.success == 1) {
							this.showMap = true
							const map = data.map
							const iaRtuList = data.iaRtuList
							this.mapBgImgUrl = map.bgImgUrl
							this.rtuImgList = iaRtuList
							this.mapName = map.mapName
							// this.checkRtuData = iaRtuList
							// console.log(this.rtuImgList)
							this.getRtuList(iaRtuList)
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				} else {
					this.getRtuList([])
				}
			}
		},

		mounted() {
			// this.getRtuList()

		},
		created() {
			// this.$route.meta.keepAlive = true
			this.getMapInfo()
		},

	}
</script>

<style>
	.widthActive{
		max-width: 100%;
	}
	.rtu {
		max-width: 100%;
		max-height: 100%;
		z-index: 2;
	}

	.rtuImgStyle {
		width: 1.875rem;
		height: 1.875rem;
		border-radius: 50%;
		background: #00BFFF;
		line-height: 1.875rem;
		background: rgba(255, 0, 0, 0.5);
		overflow: hidden;
		box-shadow: 0 0 5px #000;
		border-radius: 50%;
		color: #fff;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center
	}

	.drag {
		/* width: 100px; */
		/* display: inline-block; */
		position: absolute;
		height: 1.875rem;
		width: 1.875rem;
		/* width: 2%; */
		/* height: 4%; */
		/* background: #DB7093; */
		/* overflow: hidden; */
		/* z-index: 1; */

	}
</style>
