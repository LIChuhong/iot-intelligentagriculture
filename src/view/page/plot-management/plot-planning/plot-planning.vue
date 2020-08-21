<template>
	<div style="width: 100%;height: 100%;">
		<baidu-map class="bm-view" map-type="BMAP_SATELLITE_MAP" scroll-wheel-zoom="true" :center="center" :zoom="zoom"
		 @ready="handler" :double-click-zoom="false" @rightclick="showInfoWindow">
			<bm-polygon v-for="(path , i) in polygonPath.paths" :key="i" :path="path" :stroke-color="polygonPath.colors[i].color"
			 :fill-color="polygonPath.colors[i].color" :fill-opacity="0.5" :stroke-opacity="1" :stroke-weight="2" @click="changePlotList"
			 :editing="true" @lineupdate="updatePolygonPath($event,i)">
			</bm-polygon>
			<bm-marker v-for="(item , i) in polygonPath.markerPaths" :key="i" :position="item.position" animation="BMAP_ANIMATION_BOUNCE"
			 :icon="{url: item.icon, size: {width:30, height: 30}}" :title="item.label" :dragging="true" @dragging="markDragging($event,i)">
			</bm-marker>

			<bm-control>
				<Button @click="addPlot">添加地块</Button>
			</bm-control>
			<bm-info-window :position="infoWindow.path" title="确定删除该多边形吗？" :show="infoWindow.show" @close="infoWindowClose">
				<div style="text-align: right;"><Button @click="delPolyon" type="primary">确定</Button></div>
			</bm-info-window>

		</baidu-map>
		<Modal title="选择地块" v-model="showPlotList" footer-hide>
			<plan-plot-list v-show="showPlotList" @get-plot-info="getPlotInfo"></plan-plot-list>
		</Modal>
	</div>
</template>

<script>
	import PlanPlotList from '../component/plan-plot-list.vue'
	export default {
		components: {
			PlanPlotList
		},
		data() {
			return {
				infoWindow: {
					path: {
						lng: '',
						lat: ''
					},
					show: false,
				},
				plotPath: null,
				showPlotList: false,
				farm: {
					plotList: [{}],
					farm: '', //农场信息
					center: { //农场位置
						lng: 116.404,
						lat: 39.915
					},
					cropMarkerPaths: [{ //地块列表
						plotName: '', //地块信息
						position: { //作物图标位置
							lng: 116.404,
							lat: 39.915
						}

					}],
					polygonPath: [ //多边形位置
						[{
								lng: 116.412732,
								lat: 39.911707,
							},
							{
								lng: 116.412732,
								lat: 39.911707,
							},
						],
						[{
								lng: 116.412732,
								lat: 39.911707,
							},
							{
								lng: 116.412732,
								lat: 39.911707,
							},
						],
					]
				},
				plotList: [{
					position: {
						lng: 116.404,
						lat: 39.915
					}
				}],

				polygonPath: {
					colors: [],
					editing: false,
					markerPaths: [],
					paths: [], // 绘制完成后的经纬度，其实是在画的时候动态push的，因为在点击的时候触发了 paintPolygon 函数

				},
				center: {
					lng: 0,
					lat: 0
				},
				zoom: 1,
				polyline: {
					editing: false,
					paths: []
				},
				delIndex: null,

			}
		},

		methods: {
			delPolyon() {
				this.polygonPath.paths.splice(this.delIndex, 1)
				this.infoWindow.show = false

			},
			ptInPolygon(point, paths) { //判断传入的points点是否在ply多边形里面，是返回true，否返回false
				// var paths = this.polygonPath.paths

				// console.log(paths)
				 var resultNum = -1
				for (var i = 0; i < paths.length; i++) {
					var ply = new BMap.Polygon(paths[i])
					var result = BMapLib.GeoUtils.isPointInPolygon(point, ply);
					if (result) {
						resultNum = i
					}
				}
				return resultNum
			},
			showInfoWindow(e) {
				var resultNum = this.ptInPolygon(e.point, this.polygonPath.paths)
				if (resultNum > -1) {
					this.infoWindow.path = e.point
					this.delIndex = resultNum
					this.infoWindow.show = true
				}
				// console.log(a)
			},
			addPlot() {
				// console.log(this.polygonPath.colors)
				var color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(
					Math.random() * 255) + ')'
				this.polygonPath.colors.push({
						color: color
					}),
					this.polygonPath.paths.push([{
							lng: 116.404,
							lat: 39.915,
							// color:color

						},
						{
							lng: 116.404,
							lat: 39.915,
							// color:color
						},
						{
							lng: 116.404,
							lat: 39.915,
							// color:color
						},
					])
			},
			getPlotInfo(row) {
				var x = 0,
					y = 0;
				var path = this.plotPath; //返回多边型的点数组；ply是多边形覆盖物
				for (var k = 0; k < path.length; k++) {
					x = x + parseFloat(path[k].lng);
					y = y + parseFloat(path[k].lat);
				}
				x = x / path.length;
				y = y / path.length;
				// console.log(row)
				// console.log(this.polygonPath.markerPaths)
				this.polygonPath.markerPaths.push({
					position: {
						lng: x,
						lat: y,
					},
					icon: row.cropImgUrl,
					label: row.massifName + '-' + row.cropName

				})
				this.showPlotList = false
			},
			changePlotList(e) {
				// console.log(e.target.getPath())
				// console.log(this.polygonPath.paths)
				this.plotPath = e.target.getPath()
				// console.log(this.polygonPath.paths[0])
				this.showPlotList = true
			},

			updatePolygonPath(e, i) {
				this.polygonPath.paths[i] = e.target.getPath();

			},
			markDragging(e, i) {

				// console.log(e.point)
				this.polygonPath.markerPaths[i].position = e.point
				// console.log(this.polygonPath.markerPaths[i].position)
			},
			addPolygonPoint() {
				this.polygonPath.push({
					lng: 116.404,
					lat: 39.915
				})
			},
			handler({
				BMap,
				map
			}) {
				// console.log(BMap, map)
				this.center.lng = 116.404
				this.center.lat = 39.915
				this.zoom = 18
			}
		}
	}
</script>

<style>
	.bm-view {
		width: 100%;
		height: 100%;
	}
</style>
