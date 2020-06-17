<template>
	<div ref="maps1" style="height:100%;overflow:auto;position: relative;">
		<Card ref="map1" style="overflow: auto;height: 100%;background: #dcdee2;">
			<div v-wheel :style="mapStyle" @touchstart="touchstartView" id="mapBgDiv1" ref="mapBgDiv1" class="mapClass">
				<img id="mapBgImg1" ref="mapBgImg1" :src="mapBgImgUrl" style="width:100%;z-index: 1;" draggable="false" />
				<div v-for="item in rtuImgList" :key="item.rtuNumber" class="drag1" :style="{top:item.heightScale+'%',left:item.widthScale+'%'}">
					<Poptip :title="item.rtuNumber" :transfer="true">
						<img :src="item.rtuTypeImgUrl" class="rtu1" :alt="item.rtuNumber" draggable="false" />
					</Poptip>
				</div>
			</div>

			<Spin fix v-show="showSpin" style="width: 100%;height: 100%;">
				<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
				<div>加载中...</div>
			</Spin>


		</Card>
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
				editor: false,
				zoom: 100,
				showMapList: false,
				orgId: this.$store.state.user.userInfo.orgId,
				value: false,
				mapBgImgUrl: '',
				rtuImgList: [],

				mapId: null,
				checkId: null,
				showSpin: false
			}
		},
		computed: {
			mapStyle() {
				return {
					transform: `translate(0%, 70%) scale(${this.zoom/100}, ${
		        this.zoom/100
		      })`,

				}
			}
		},
		directives: {
			wheel(el, bindings) {
				// inserted: function(el) {
				el.style.marginLeft = (el.getBoundingClientRect().width - el.offsetWidth) / 2 + 'px'
				el.style.marginTop = (el.getBoundingClientRect().height - el.offsetHeight) / 2 + 'px'
				el.onmousedown = function(e) {
					document.onmousemove = function(e) {}
					document.onmouseup = function() {
						document.onmousemove = document.onmouseup = null;
					}
				}

				
				el.ontouchstart = function(e) {
					
					document.ontouchmove = function(e) {
						
					}
					document.ontouchend = function() {
						document.ontouchmove = document.ontouchend = null;

					}
				}


			}
		},
		methods: {
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
			getCurRtusMap() {
				if (this.checkId != null) {
					this.showMap(this.checkId)
				} else {
					this.getTopMapInfo()
				}

			},
			getTopMapInfo() {
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
			zoomOut() {

			},
			zoomIn() {

			},

			touchstartView(event) {
				this.canMove = true
				this.initPageX = event.pageX
				this.initPageY = event.pageY
				this.oldMarginLeft = this.orgTreeOffsetLeft
				this.oldMarginTop = this.orgTreeOffsetTop
				on(document, 'touchmove', this.touchmoveView)
				on(document, 'touchend', this.touchendView)
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
	}

	.drag1 {
		position: absolute;
		width: 5%;
		z-index: 200 // overflow: auto
	}

	.mapClass {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;

	}
</style>


<!-- <template>
	<farm-list></farm-list>
</template>

<script>
	import FarmList from '@/view/page/farm-management/farm-list/farm-list.vue'
	export default {
		name: 'farm_list',
		components: {
			FarmList
		},
		data() {
			return {
				
			}
		},
		computed: {
			
		},
	}
</script>
 -->
