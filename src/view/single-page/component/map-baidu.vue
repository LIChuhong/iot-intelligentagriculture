<template>
	<baidu-map class="bm-view" map-type="BMAP_SATELLITE_MAP" :center="center" :zoom="zoom"
	 @ready="handler" scroll-wheel-zoom="true">
		<!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type> -->
		<!-- <bm-marker :position="center" :dragging="true" animation="BMAP_HYBRID_MAP" /> -->
		<bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true">
			<!-- <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" /> -->
		</bm-marker>
	</baidu-map>
</template>

<script>
	// import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
	// import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
	// import BmLabel from 'vue-baidu-map/components/overlays/Label.vue'
	export default {
		components: {
			// BaiduMap,BmMarker,BmLabel
		},
		data() {
			return {
				center: {
					lng: 0,
					lat: 0
				},
				zoom: 1
			}
		},
		methods: {
			handler({
				BMap,
				map
			}) {
				console.log(BMap, map)
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
