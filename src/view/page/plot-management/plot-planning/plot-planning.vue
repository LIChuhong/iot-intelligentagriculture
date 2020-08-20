<template>
	<div style="width: 100%;height: 100%;">
		<baidu-map class="bm-view" map-type="BMAP_SATELLITE_MAP" :center="center" :zoom="zoom" @ready="handler">

			<bm-polygon v-for="(path , i) in polygonPath.paths" :key="i" :path="path" stroke-color="blue" :fill-color="'rgb('+ Math.floor(Math.random()*255)+','+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255)+')'"
			 :fill-opacity="0.8" :stroke-opacity="0.5" :stroke-weight="2" @click="alertpath" :editing="true" @lineupdate="updatePolygonPath($event,i)">

			</bm-polygon>
			<bm-marker v-for="(item , i) in polygonPath.markerPaths" :key="i" :position="item.position" :dragging="true"
			 animation="BMAP_ANIMATION_BOUNCE">
			</bm-marker>

			<bm-control>
				<button @click="toggle('polygonPath')">{{ polygonPath.editing ? '停止绘制' : '开始绘制' }}</button>
				<!-- <button @click="toggle('polygonPath')">{{ polygonPath.editing ? '停止绘制' : '开始绘制' }}</button> -->
			</bm-control>

		</baidu-map>
	</div>
</template>

<script>
	// import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
	// import BmControl from 'vue-baidu-map/components/controls/Control.vue'
	// import BmPolygon from 'vue-baidu-map/components/overlays/Polygon.vue'
	export default {
		components: {
			// BaiduMap,
			// BmControl,
			// BmPolygon
		},
		data() {
			return {
				farm: {
					farm: '', //农场信息
					center: { //农场位置
						lng: 116.404,
						lat: 39.915
					},
					cropMarkerPaths: [{ //地块列表
						plotName: '' ,//地块信息
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
					editing: false,
					markerPaths: [{
							position: {
								lng: 116.412732,
								lat: 39.911707,
							}
						},
						{
							position: {
								lng: 116.39455,
								lat: 39.910932
							}
						},
						{
							position: {
								lng: 116.403461,
								lat: 39.921336
							}
						}
					],
					paths: [
						[{
								lng: 116.412732,
								lat: 39.911707,

							},
							{
								lng: 116.39455,
								lat: 39.910932,
							},
							{
								lng: 116.403461,
								lat: 39.921336,
							}
						],
						[{
								lng: 116.412732,
								lat: 39.911707,

							},
							{
								lng: 116.39455,
								lat: 39.910932
							},
							{
								lng: 116.403461,
								lat: 39.921336
							}
						],

						[{
								lng: 116.412732,
								lat: 39.911707,

							},
							{
								lng: 116.39455,
								lat: 39.910932
							},
							{
								lng: 116.403461,
								lat: 39.921336
							},

						],

					], // 绘制完成后的经纬度，其实是在画的时候动态push的，因为在点击的时候触发了 paintPolygon 函数

				},
				center: {
					lng: 0,
					lat: 0
				},
				zoom: 1,
				polyline: {
					editing: false,
					paths: []
				}

			}
		},
		computed: {

		},
		watch: {

		},
		methods: {
			alertpath(e) {
				console.log(e.currentTarget.so)
				console.log(this.polygonPath.paths[0])
			},

			updatePolygonPath(e, i) {
				this.polygonPath.paths[i] = e.target.getPath();

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
				this.zoom = 15
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
