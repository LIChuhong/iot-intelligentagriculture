<template>
	<div style="height: 100%;overflow: hidden;">
		<div v-show="!editor" ref="maps1" style="height:100%;position: relative;overflow: hidden;background: #dcdee2;">
			<!-- <div ref="map1" > -->
			<div :style="mapStyle" @mousewheel="mouseWheel" @mousedown="mousedownView" @touchstart="touchstartView" id="mapBgDiv1" ref="mapBgDiv1">
				<img id="mapBgImg1" ref="mapBgImg1" :src="mapBgImgUrl" style="height: 100%;" draggable="false" />
				<div v-for="item in rtuImgList" :key="item.rtuNumber" class="drag1" :style="{top:item.heightScale+'%',left:item.widthScale+'%',cursor:'pointer'}" :title="item.rtuNumber">
					<Poptip :title="item.rtuNumber" @on-popper-show="getRtuDataInfo(item)">
						<div slot="content">
							<div style="font-size: 0.75rem;" v-for="(item , index) in parameterDataList" :key="index"><span>{{item.parameterName}}:{{item.value}}{{item.unit}}</span></div>
						</div>
						<img :src="item.rtuTypeImgUrl" class="rtu1" :alt="item.rtuNumber" draggable="false" />
					</Poptip>

				</div>

			</div>

			<!-- </div> -->
			<div style="position: absolute;right:5%;text-align: center;top:1.25rem;z-index: 100;">
				<Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
					<Icon @click.native="handleFullscreen" :type="value ? 'md-contract' : 'md-expand'" :size="23"></Icon>
				</Tooltip>
				<div style="margin: 1.25rem;">
					<button class="zoom-button" @click="getRtusMapList">
						<Icon type="md-more" :size="20" color="#fff" />
					</button>
				</div>
				<div>
					<button class="zoom-button" @click="getCurRtusMap">
						<Icon type="md-refresh" :size="20" color="#fff" />
					</button>
				</div>

			</div>

			<div class="zoom-box" style="position: absolute;bottom: 3.125rem;right:5%;">

				<zoom-controller v-model="zoom" :min="20" :max="300"></zoom-controller>
			</div>
			<Modal title="农场列表" v-model="showMapList" footer-hide>
				<map-list v-if="showMapList" @get-map-info="getMapInfo"></map-list>
			</Modal>
			<Spin fix v-show="showSpin" style="background: rgba(255,255,255,0.3);">
				<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
				<div>加载中...</div>
			</Spin>

		</div>
		<farm-form v-if="editor" :mapId="mapId" @go-back="goBack" style="z-index: 100;"></farm-form>

	</div>
</template>

<script>
	import {
		on,
		off
	} from '@/libs/tools'
	import MapList from '../component/map-list.vue'
	import bg from '@/assets/images/map.jpg'
	import FarmForm from '../component/farm-form.vue'
	import {
		getTopMap,
		getMapList,
		getMap
	} from '@/api/farm.js'
	import {
		getRtuData
	} from '@/api/rtu.js'
	import ZoomController from '../component/zoom-controller.vue'
	export default {
		name: 'farm_list',
		components: {
			MapList,
			ZoomController,
			FarmForm
		},
		data() {
			return {
				editor: false,
				zoom: 100,
				showMapList: false,
				orgId: this.$store.state.user.userInfo.orgId,
				value: false,
				mapBgImgUrl: '',
				rtuImgList: [],
				orgTreeOffsetLeft: 0,
				orgTreeOffsetTop: 0,
				initPageX: 0,
				initPageY: 0,
				oldMarginLeft: 0,
				oldMarginTop: 0,
				canMove: false,
				mapId: null,
				checkId: null,
				showSpin: false,
				parameterDataList: [],
				mapHeight: 0,
				mapWidth: 0

			}
		},
		watch: {
			zoom(newVal, oldVal) {
				console.log(newVal)
				console.log(oldVal)
				if (newVal < oldVal) {
					this.mapHeight = this.mapHeight * (oldVal - 20) / oldVal
				}
				if (newVal > oldVal) {
					this.mapHeight = this.mapHeight * (oldVal + 20) / oldVal
				}

			}
		},
		computed: {
			mapStyle() {
				return {
					// transform: `translate(-50%, -50%) scale(${this.zoom/100}, ${
					//      this.zoom/100
					//    })`,
					transform: `translate(-50%, -50%)`,
					height: `${this.mapHeight}px`,
					// width: `${this.mapWidth}px`,
					marginLeft: `${this.orgTreeOffsetLeft}px`,
					marginTop: `${this.orgTreeOffsetTop}px`,
				}
			},

		},

		methods: {
			getRtuDataInfo(item) {
				this.showSpin = true
				this.parameterDataList = []
				getRtuData(item.rtuNumber).then(res => {
					const data = res.data
					this.showSpin = false
					if (data.success == 1) {
						// console.log(data)
						// this.iaRtu = data.iaRtu
						const rtuData = data.rtuData
						if (rtuData.parameterDataList != null && rtuData.parameterDataList) {
							this.parameterDataList = rtuData.parameterDataList.map(item => {
								// if()
								return item
							})

						}

					} else {
						this.$Message.error(item.rtuNumber + data.errorMessage)
					}
				}).catch(error => {
					this.showSpin = false
					alert(error)
				})
			},
			goBack(val) {
				this.editor = false
			},
			touchstartView() {

			},

			mouseWheel(event) {
				// console.log(event)
				if (event.deltaY < 0) {
					if (this.zoom > 100) {
						this.mapHeight = this.mapHeight * (this.zoom - 20) / this.zoom
						this.mapWidth = this.mapWidth * (this.zoom - 20) / this.zoom
						this.zoom -= 20
					}

				} else {
					if (this.zoom < 300) {
						this.mapHeight = this.mapHeight * (this.zoom + 20) / this.zoom
						this.mapWidth = this.mapWidth * (this.zoom + 20) / this.zoom
						this.zoom += 20
					}
				}

			},
			editorMapInfo(row) {

			},
			getMapInfo(row, val) {
				if (val == 'check') {
					this.showMapList = false
					this.checkId = row.id
					this.showMap(row.id)
				}
				if (val == 'editor') {
					this.showMapList = false
					// this.showMap(row.id)
					this.mapId = row.id
					this.editor = true
				}
				if (val == 'del') {
					if (this.checkId == row.id) {
						this.checkId = null
					}

				}

				// alert(row)
			},
			showMap(id) {
				this.resetParameters()
				getMap(id).then(res => {
					const data = res.data
					this.showSpin = true
					if (data.success == 1) {
						// console.log(data)
						this.showSpin = false
						const map = data.map
						const iaRtuList = data.iaRtuList
						this.rtuImgList = iaRtuList
						// console.log(this.rtuImgList)
						this.mapBgImgUrl = map.bgImgUrl
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.showSpin = false
					alert(error)
				})
			},
			getRtusMapList() {
				this.showMapList = true

			},
			resetParameters() {
				this.orgTreeOffsetLeft = 0
				this.orgTreeOffsetLeft = 0
				this.zoom = 100
			},
			getCurRtusMap() {
				this.resetParameters()
				this.$nextTick(function() {
					this.$refs.mapBgDiv1.style.height = this.$refs.maps1.clientHeight + 'px'

				})
				if (this.checkId != null) {
					this.showMap(this.checkId)
				} else {
					this.getTopMapInfo()
				}

			},
			getTopMapInfo() {
				this.resetParameters()
				this.showSpin = true
				getTopMap(this.orgId).then(res => {
					this.showSpin = false
					const data = res.data
					if (data.success == 1) {
						if (data.map != null && data.iaRtuList != null) {
							const map = data.map
							const iaRtuList = data.iaRtuList
							this.$nextTick(function() {
								this.$refs.mapBgDiv1.style.height = this.$refs.maps1.clientHeight + 'px'
								this.mapHeight = this.$refs.maps1.clientHeight
								// this.mapWidth = 
							})
							this.rtuImgList = iaRtuList
							// console.log(this.rtuImgList)
							this.mapBgImgUrl = map.bgImgUrl
						}
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.showSpin = false
					alert(error)
				})
			},
			zoomOut() {

			},
			zoomIn() {

			},
			mousedownView(event) {

				this.canMove = true
				this.initPageX = event.pageX
				this.initPageY = event.pageY
				this.oldMarginLeft = this.orgTreeOffsetLeft
				this.oldMarginTop = this.orgTreeOffsetTop
				let that = this
				// on(document, 'mousemove', this.mousemoveView)
				// on(document, 'mouseup', this.mouseupView)
				document.onmousemove = function(event) {
					if (!that.canMove) return
					const {
						pageX,
						pageY
					} = event
					that.orgTreeOffsetLeft = that.oldMarginLeft + pageX - that.initPageX
					that.orgTreeOffsetTop = that.oldMarginTop + pageY - that.initPageY
				};
				document.onmouseup = function() {
					that.canMove = false
				}
			},

			handleFullscreen() {
				// let main = main.body
				let main = this.$refs.maps1
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
					// this.$refs.mapBgDiv1.style.height = this.$refs.maps1.clientHeight + 'px'


				} else {
					this.value = true
					// this.$refs.mapBgDiv1.style.height = this.$refs.maps1.clientHeight + 'px'
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

			},
		},
		created() {},
		mounted() {
			this.getTopMapInfo()
		},


	}
</script>

<style lang="less">
	html,body{
		padding: 0;
		margin: 0
	}
	.trans(@duration) {
		transition:~"all @{duration} ease-in";
	}

	.zoom-button {
		width: 30px;
		height: 30px;
		line-height: 10px;
		border-radius: 50%;
		background: rgb(124, 180, 41);
		box-shadow: 0px 2px 8px 0px rgba(218, 220, 223, 0.7);
		border: none;
		cursor: pointer;
		outline: none;

		&:active {
			box-shadow: 0px 0px 2px 2px rgba(218, 220, 223, 0.2) inset;
		}

		.trans(0.1s);

		&:hover {
			background: #1890ff;
			.trans(0.1s);
		}
	}


	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;


	}

	.rtu1 {
		width: 100%;
		height: 100%;
		z-index: 2;
		// display: inline
		-moz-transform: none;
		-webkit-transform: none;
		-o-transform: none;
		-ms-transform: none;
		transform: none;

	}

	.drag1 {
		position: absolute;
		width: 2%;
		-moz-transform: none;
		-webkit-transform: none;
		-o-transform: none;
		-ms-transform: none;
		transform: none;
	}

	#mapBgDiv1 {
		position: absolute;
		top: 50%;
		left: 50%;

	}
</style>
