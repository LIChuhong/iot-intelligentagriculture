<template>
	<baidu-map class="bm-view" map-type="BMAP_SATELLITE_MAP" :center="center" :zoom="zoom"
	 @ready="handler" scroll-wheel-zoom="true" >
		<!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type> -->
		<!-- <bm-marker :position="center" :dragging="true" animation="BMAP_HYBRID_MAP" /> -->
		<bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT">
			<Select v-model="model1" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
		</bm-control>
		<bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true">
			<!-- <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" /> -->
		</bm-marker>
	</baidu-map>
</template>

<script>
	export default {
		components: {
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
