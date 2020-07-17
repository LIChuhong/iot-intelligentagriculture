<template>
	<div class="map">
		<img :src="mapBg" width="100%" height="100%" />
		<div class="titleText">
			<h2>自然农场大数据平台</h2>
		</div>
		<div class="mapContent">

		</div>
		<div class="publicStyle minh lDistance bTop">
			<img src="../../../assets/images/map/soil1.png" />
			<div class="titleImg">
				<img src="../../../assets/images/map/soil.png" />
			</div>
		</div>
		<div class="publicStyle maxh lDistance bBottom">
			<img src="../../../assets/images/map/soil1.png" />
			<div class="titleImg">
				<img src="../../../assets/images/map/soil.png" />
			</div>
			<div class="titleImg" style="top:10%;height: 90%;overflow: hidden;background: #00BFFF;line-height: 1;">
				<div style="height: 50%;background: #19BE6B;">
					<div style="display: flex;justify-content:space-around;text-align: center;">
						<div style="width: 20%;background: #00BFFF;">aha</div>
						<div style="width: 20%;">aha</div>
						<div style="width: 20%;">aha</div>
					
						
					</div>
				</div>
			</div>

		</div>

		<div class="publicStyle maxh rDistance bTop">
			<img src="../../../assets/images/map/soil1.png" />
			<div class="titleImg">
				<img src="../../../assets/images/map/soil.png" />
			</div>
			<div class="titleImg" style="top:10%;height: 90%;overflow: hidden;">
				<div v-for="item in 10" :key="item" style="width: 50%;padding:2% 5% 0;overflow: hidden;float: left;height: 20%;">

					<div style="float:left;height: 100%;">
						<Icon type=" iconfont icon-ic_kqwd" size="30" color="red" />
					</div>
					<div style="overflow: hidden;float: left;height: 100%;line-height: 1;">
						<p style="font-size: 1rem;">36C</p>
						<p style="font-size: 10px;">空气温度</p>
					</div>
				</div>
			</div>
		</div>
		<div class="publicStyle minh rDistance bBottom">
			<img src="../../../assets/images/map/soil1.png" />
			<div class="titleImg">
				<img src="../../../assets/images/map/soil.png" />
			</div>
			<div class="titleImg" style="top:10%;height: 90%;overflow: hidden;">
				<div v-for="item in 3" :key="item" style="float: left;width: 33%;height: 100%;text-align: center;line-height: 1;">
					<div style="margin-top: 40%;">

						<Icon type=" iconfont icon-ic_kqwd" size="30" color="red" />
						<p style="font-size: 1rem;">36C</p>
						<p style="font-size: 10px;">温度</p>
					</div>
				</div>

			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import mapBg from '@/assets/images/mapBg.png'
	export default {

		data() {
			return {
				mapBg
			}
		}
	}
</script>

<style lang="less">
	.count-style {
		font-size: 50px;
	}

	.map {
		// line-height: 0
		height: 100%;
		position: relative;
		overflow: hidden;
		width: 100%;
		color: #ffffff
	}

	.map .maxh {
		height: 58%
	}

	.map .minh {
		height: 30%
	}

	.map .bTop {
		top: 8%
	}

	.map .bBottom {
		bottom: 3%
	}

	.map .lDistance {
		left: 2%
	}

	.map .rDistance {
		right: 2%
	}

	.map .publicStyle {
		position: absolute;
		width: 28%;
		line-height: 0;
		overflow: hidden;

	}

	.publicStyle img {
		width: 100%;
		height: 100%
	}

	.titleImg {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
	}

	.map .mapContent {
		position: absolute;
		top: 8%;
		width: 40%;
		left: 30%;
		bottom: 3%;
		// background: #00BFFF;
	}

	.map .titleText {
		text-align: center;
		color: #ffffff;
		position: absolute;
		top: 0;
		width: 40%;
		height: 100%;
		left: 30%;

	}

	@media screen and (max-width: 1600px) {
		// html {
		// 	font-size: 60px;
		// }
	}

	@media screen and (max-width: 1200px) {
		// html {
		// 	font-size: 60px;
		// }
	}

	@media screen and (max-width: 800px) {
		// html {
		// 	font-size: 16px;
		// }
	}

	@media screen and (max-width: 600px) {
		// html {
		// 	font-size: 12px;
		// }
	}
</style>
