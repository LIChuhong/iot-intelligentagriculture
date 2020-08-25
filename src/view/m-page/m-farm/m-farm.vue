<template>
	<div ref="maps1" class="map1Style" style="overflow:hidden;height: 100%;">
		<!-- <Card ref="map1" style="overflow:hidden;height: 100%;background: #dcdee2;"> -->
		<div :style="mapStyle" @touchstart="touchstartView" id="mapBgDiv1" ref="mapBgDiv1">
			<img id="mapBgImg1" ref="mapBgImg1" :src="mapBgImgUrl" style="width:100%;" draggable="false" />
			<div v-for="item in rtuImgList" :key="item.rtuNumber" class="drag1" :style="{top:item.heightScale+'%',left:item.widthScale+'%',cursor:'pointer'}" :title="item.rtuNumber">
				<Poptip :title="item.rtuNumber" :transfer="true" @on-popper-show="getRtuDataInfo(item)">
					<div slot="content">
						<div style="font-size: 0.75rem;" v-for="(item , index) in parameterDataList" :key="index"><span>{{item.parameterName}}:{{item.value}}{{item.unit}}</span></div>
					</div>
					<img :src="item.rtuTypeImgUrl" class="rtu1" :alt="item.rtuNumber" draggable="false" />
				</Poptip>
			</div>
		</div>
		<!-- </Card> -->
		<div style="position: absolute;right:5%;text-align: center;top:1.25rem;z-index: 100;">
			<!-- <Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
				<Icon @click.native="handleFullscreen" :type="value ? 'md-contract' : 'md-expand'" :size="23"></Icon>
			</Tooltip> -->
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

			<zoom-controller v-model="zoom" :min="100" :max="300"></zoom-controller>
		</div>
		<Modal title="农场列表" v-model="showMapList" footer-hide>
			<map-list v-if="showMapList" @get-map-info="getMapInfo"></map-list>
		</Modal>
		<Spin fix v-show="showSpin" style="background: rgba(255,255,255,0.3);">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载中...</div>
		</Spin>
	</div>
</template>

<script>
	import {
		on,
		off
	} from '@/libs/tools'
	import MapList from '@/view/page/farm-management/component/map-list.vue'
	import bg from '@/assets/images/map.jpg'
	import FarmForm from '@/view/page/farm-management/component/farm-form.vue'
	import {
		getTopMap,
		getMapList,
		getMap
	} from '@/api/farm.js'
	import {
		getRtuData
	} from '@/api/rtu.js'
	import ZoomController from '@/view/page/farm-management/component/zoom-controller.vue'
	export default {
		name: 'farm_list',
		components: {
			MapList,
			ZoomController,
			FarmForm
		},
		data() {
			return {
				parameterDataList: [],
				editor: false,
				zoom: 100,
				showMapList: false,
				orgId: this.$store.state.user.userInfo.orgId,
				value: false,
				mapBgImgUrl: '',
				rtuImgList: [],

				mapId: null,
				checkId: null,
				showSpin: false,
				orgTreeOffsetLeft: 0,
				orgTreeOffsetTop: 0,
				initPageX: 0,
				initPageY: 0,
				oldMarginLeft: 0,
				oldMarginTop: 0,
				canMove: false,
			}
		},
		computed: {
			mapStyle() {
				// console.log(this.orgTreeOffsetLeft)
				// console.log(this.orgTreeOffsetTop)
				return {
					transform: `translate(-50%, -50%) scale(${this.zoom/100}, ${
		        this.zoom/100
		      })`,
					marginLeft: `${this.orgTreeOffsetLeft}px`,
					marginTop: `${this.orgTreeOffsetTop}px`,

				}
			}
		},
		directives: {},
		methods: {
			touchstartView(event) {
				let that = this
				let x1 = 0
				// alert(x1)
				if (event.touches.length <= 1) {
					this.canMove = true
					this.initPageX = event.touches[0].pageX
					this.initPageY = event.touches[0].pageY
					this.oldMarginLeft = this.orgTreeOffsetLeft
					this.oldMarginTop = this.orgTreeOffsetTop


				} else if (event.touches.length >= 2) {
					// alert(event.changedTouches[0].pageX)
					// alert(event.changedTouches[1].pageX)
					x1 = that.getDistance(event.touches[0], event.touches[1])
					// alert(x1)

				}

				document.ontouchmove = function(event) {
					if (event.touches.length == 1) {
						if (!that.canMove) return

						that.orgTreeOffsetLeft = that.oldMarginLeft + event.touches[0].pageX - that.initPageX
						that.orgTreeOffsetTop = that.oldMarginTop + event.touches[0].pageY - that.initPageY
						// console.log(that.initPageX)
					} else if (event.touches.length >= 2) {

						var x2 = that.getDistance(event.touches[0], event.touches[1])
						if (x2 > x1) {
							if (that.zoom < 300) {
								that.zoom += 2
							}
						}
						if (x2 < x1) {
							if (that.zoom > 100) {
								that.zoom -= 2
							}
						}
					}
				};
				document.ontouchend = function() {
					that.canMove = false
				}
			},
			getDistance(p1, p2) {
				var x = p2.pageX - p1.pageX,
					y = p2.pageY - p1.pageY;
				return Math.sqrt((x * x) + (y * y));
			},

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

			touchmoveView() {
				if (!this.canMove) return
				const {
					pageX,
					pageY
				} = event
				this.orgTreeOffsetLeft = this.oldMarginLeft + pageX - this.initPageX
				this.orgTreeOffsetTop = this.oldMarginTop + pageY - this.initPageY
			},
			touchendView(e) {
				this.canMove = false
				off(document, 'touchmove', this.touchmoveView)
				off(document, 'touchend', this.touchendView)
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
			},
		},
		created() {
			this.getTopMapInfo()
		}
	}
</script>

<style lang="less">
	@media screen and (min-width:300px) and (max-width:900px) {
		.map1Style{
			line-height:0;
			// padding: 0;
			// margin: 0
			
			
		}
		.trans(@duration) {
			transition:~"all @{duration} ease-in";
		}

		.map1Style .zoom-button {
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


		.map1Style .demo-spin-icon-load {
			animation: ani-demo-spin 1s linear infinite;
		}

		.map1Style .rtu1 {
			line-height:1.5;
			width: 100%;
			height: 100%;
			z-index: 2;
		}

		.map1Style .drag1 {
			line-height:0;
			position: absolute;
			width: 3%;

		}

		
		.map1Style #mapBgDiv1 {
			position:relative;
			top: 50%;
			left: 50%;
			width: 100%;
			// height: 100%


		}

		// .map1Style .ivu-card-body{
		// 	padding: 0;
		// 	margin: 0
		// 	
		// }
	}
</style>
