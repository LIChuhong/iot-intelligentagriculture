<template>
	<div style="height: 100%;overflow:hidden;">
		<div ref="maps1" style="height:100%;position: relative;overflow:auto;background: #dcdee2;display: flex;justify-content:center">
			<!-- <div ref="map1" > -->
			<div :style="mapStyle" @touchstart="touchstartView" id="mapBgDiv1" ref="mapBgDiv1">
				<img id="mapBgImg1" ref="mapBgImg1" :src="mapBgImgUrl" style="height: 100%;" draggable="false" />
				<div v-for="item in rtuImgList" :key="item.rtuNumber" class="drag1" :style="{top:item.heightScale+'%',left:item.widthScale+'%',cursor:'pointer'}" :title="item.rtuNumber">
					<Poptip :title="item.rtuNumber" @on-popper-show="getRtuDataInfo(item)">
						<div slot="content">
							<div style="font-size: 0.75rem;" v-for="(item , index) in parameterDataList" :key="index"><span>{{item.parameterName}}:{{item.value}}{{item.unit}}</span></div>
						</div>
						<div class="rtuImgStyle">
						<img :src="item.rtuTypeImgUrl" class="rtu1"  :alt="item.rtuNumber+item.rtuTypeName" :draggable="false" />
						</div>
					</Poptip>

				</div>

			</div>
		</div>
		<div style="position: absolute;right:5%;text-align: center;top:1.25rem;z-index: 100;">
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
		
			<zoom-controller v-model="zoom" :min="60" :max="300" :step="5"></zoom-controller>
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
		name: 'm_farm',
		components: {
			MapList,
			ZoomController,
		},
		data() {
			return {
				zoom: 100,
				showMapList: false,
				orgId: this.$store.state.user.userInfo.orgId,
				mapBgImgUrl: '',
				rtuImgList: [],
				orgTreeOffsetLeft: 0,
				orgTreeOffsetTop: 0,
				initPageX: 0,
				initPageY: 0,
				oldMarginLeft: 0,
				oldMarginTop: 0,
				canMove: false,
				checkId: null,
				showSpin: false,
				parameterDataList: [],
				mapHeight: 0,
				mapWidth: 0

			}
		},
		watch: {
			zoom(newVal, oldVal) {
				if (newVal < oldVal) {
					this.mapHeight = this.mapHeight * (oldVal - 5) / oldVal
				}
				if (newVal > oldVal) {
					this.mapHeight = this.mapHeight * (oldVal + 5) / oldVal
				}

			}
		},
		computed: {
			mapStyle() {
				return {
					height: `${this.mapHeight}px`,
					// width: `${this.mapWidth}px`,
					left:'0',
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
			touchstartView(event) {
				let that = this
				let x1 = 0
				
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
						that.orgTreeOffsetLeft = that.oldMarginLeft + pageX - that.initPageX
						that.orgTreeOffsetTop = that.oldMarginTop + pageY - that.initPageY
					} else if (event.touches.length >= 2) {
						var x2 = that.getDistance(event.touches[0], event.touches[1])
						if (x2 > x1) {
							if (that.zoom < 300) {
								that.zoom += 5
																
							}
						}
						if (x2 < x1) {
							if (that.zoom > 60) {
								that.zoom -= 5
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
		
			editorMapInfo(row) {

			},
			getMapInfo(row, val) {
				if (val == 'check') {
					this.showMapList = false
					this.checkId = row.id
					this.showMap(row.id)
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
				// this.mapHeight = 0
				this.orgTreeOffsetLeft = 0
				this.orgTreeOffsetLeft = 0
				// this.zoom = 100
				
			},
			getCurRtusMap() {
				this.resetParameters()
				this.zoom = 100
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
		max-width: 100%;
		max-height: 100%;
		z-index: 2;
		// display: inline
		// -moz-transform: none;
		// -webkit-transform: none;
		// -o-transform: none;
		// -ms-transform: none;
		// transform: none;

	}
	.rtuImgStyle {
		width: 1.875rem;
		height: 1.875rem;
		border-radius: 50%;
		background: #00BFFF;
		line-height:1.875rem;
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
	

	.drag1 {
		// overflow: hidden;
		position: absolute;
		// width:  2%;
		height:1.875rem;
		width: 1.875rem;
		-moz-transform: none;
		-webkit-transform: none;
		-o-transform: none;
		-ms-transform: none;
		transform: none;
	}

	#mapBgDiv1 {
		position: absolute;
		// top: 50%;
		// left: 50%;

	}
</style>
