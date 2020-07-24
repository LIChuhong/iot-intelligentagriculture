<template>
	<div class="map">
		<img :src="mapBg" width="100%" height="100%" />
		<div class="titleText">
			<h2>自然农场大数据平台</h2>
		</div>
		<div class="mapContent">
			<!-- <map-line style="height: 100%;width: 100%;"></map-line> -->
			<div class="compent" style="left: 2%">
				<img src="../../../assets/images/map/warningCurve.png" class="img1" />
				<div class="title">
					<img src="../../../assets/images/map/wc.png" />
					<span style="color: #00b8ff">报警信息</span>
				</div>
				<div style="position: absolute;top:40%;width: 100%;text-align: center;color: #98b8db;">
					<p>暂无信息</p>
				</div>
			</div>
			<div class="compent" style="right: 2%;">
				<img src="../../../assets/images/map/warningCurve.png" class="img1" />
				<div class="title">
					<img src="../../../assets/images/map/wc.png" height="100%" />
					<span style="color: #00b8ff">当天空气、土壤温度变化曲线</span>
				</div>
				<div style="position: absolute;width: 100%;height: 100%;">
					<map-temper class="curveEchart"></map-temper>
				</div>
			</div>
			<map-baidu class="curveEchart"></map-baidu>
		</div>
		<div class="publicStyle minh lDistance bTop">
			<img src="../../../assets/images/map/soil1.png" />
			<div class="titleImg">
				<img src="../../../assets/images/map/watch.png" />
			</div>
		</div>
		<div class="publicStyle maxh lDistance bBottom">
			<img src="../../../assets/images/map/soil1.png" />
			<div class="titleImg">
				<img src="../../../assets/images/map/curve.png" />
			</div>
			<div class="titleImg" style="top:10%;height: 90%;overflow: hidden;line-height: 1;font-size: 0.625rem;">
				<div style="height: 50%;overflow: hidden;">
					<div class="curve">
						<div v-for="(item, index) in curveList" :key="item"><button @click="curveBtn(index)" :class="{btnColor1:change1 == index}">{{item.value}}</button></div>
					</div>
					<div class="curve1">
						<map-bar class="curveEchart" :barColor="'#0075ff'"></map-bar>
					</div>
					<div class="curve1">
						<map-line class="curveEchart" :legendName="'近一月降雨量'" :lineColor="'#00a7fe'"></map-line>
					</div>
				</div>
				<div style="height: 50%;overflow: hidden;">
					<div class="curve">
						<div v-for="(item, index) in curveList1" :key="item"><button @click="curveBtn1(index)" :class="{btnColor1:change2 == index}">{{item.value}}</button></div>
					</div>
					<div class="curve1">
						<map-line class="curveEchart" :legendName="'近一年日平均曲线'" :lineColor="'#c624e6'"></map-line>
					</div>
					<div class="curve1">
						<map-line class="curveEchart" :legendName="'近一月日平均曲线'" :lineColor="'#11cdab'"></map-line>
					</div>
				</div>
				<!-- </div> -->

			</div>
		</div>

		<div class="publicStyle maxh rDistance bTop">
			<img src="../../../assets/images/map/soil1.png" />
			<div class="titleImg">
				<img src="../../../assets/images/map/weather.png" />
			</div>
			<div class="titleImg" style="top:10%;height: 90%;overflow: hidden;">
				<div v-for="item in mlList" :key="item" style="width: 50%;padding:2% 5% 0;overflow: hidden;float: left;height: 20%;">

					<div style="float:left;height: 100%;">
						<Icon :type="item.icon" size="35" :color="item.iconColor" />
					</div>
					<div style="overflow: hidden;float: left;height: 100%;line-height: 1;">
						<p style="font-size: 1rem;">{{item.value}}</p>
						<p style="font-size:0.75rem;color: #31abe3;margin-top: 0.125rem;">{{item.name}}</p>
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
				<div v-for="item in soilList" :key="item" style="float: left;width: 33%;height: 100%;text-align: center;line-height: 1;">
					<div style="margin-top: 35%;">

						<Icon :type="item.icon" size="40" :color="item.iconColor" />
						<p style="font-size: 1rem;">{{item.value}}</p>
						<p style="font-size:0.75rem;color: #31abe3;margin-top: 0.125rem;">{{item.name}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import mapBg from '@/assets/images/mapBg.png'
	import MapBar from '../component/map-bar.vue'
	import MapLine from '../component/map-line.vue'
	import MapBaidu from '../component/map-baidu.vue'
	import MapTemper from '../component/map-temper.vue'
	export default {
		components: {
			MapBar,
			MapLine,
			MapBaidu,
			MapTemper
		},
		data() {
			return {
				mapBg,
				// screenWidth:null
				mlList: [], //气象列表
				soilList: [], //土壤列表
				curveList:[
					{
					value:'降雨量',
					},
					{
					value:'空气湿度',
					},
					{
					value:'空气温度',
					},
					{
					value:'大气压',
					},
					{
					value:'水分',
					},
					
					],
					curveList1:[
						{
						value:'土壤湿度',
						},
						{
						value:'土壤温度',
						},
						{
						value:'盐度',
						}],
				change1:0,
				change2:0
				
			}
		},
		methods:{
			curveBtn(index){
				 this.change1 = index;
				 // e.target.style.background = "#000000"
				
			},
			curveBtn1(index){
				 this.change2 = index;
				 // e.target.style.background = "#000000"
				
			}
		},
		mounted() {
			this.soilList = [{
					name: '温度',
					icon: ' iconfont icon-ic_kqwd',
					iconColor: '#0187fc',
					value: '36℃'
				}, {
					name: '水分',
					icon: ' iconfont icon-ic_trsf',
					iconColor: '#8f3ef7',
					value: '23%'
				}, {
					name: '养分',
					icon: ' iconfont icon-ic_yf',
					iconColor: '#06cce4',
					value: '1.8ms/cm'
				}],
				this.mlList = [{
						name: '空气温度',
						icon: ' iconfont icon-ic_kqwd',
						iconColor: '#0187fc',
						value: '36℃'
					},
					{
						name: '当天降雨量',
						icon: ' iconfont icon-ic_dtjyl',
						iconColor: '#16c8c4',
						value: '11mm'
					},
					{
						name: '空气湿度',
						icon: ' iconfont icon-ic_kqsd',
						iconColor: '#16c8c4',
						value: '63%'
					},
					{
						name: '瞬时降雨量',
						icon: ' iconfont icon-ic_ssyl',
						iconColor: '#fc9143',
						value: '0mm'
					},
					{
						name: '大气压',
						icon: ' iconfont icon-ic_dqy',
						iconColor: '#fc9143',
						value: '999百帕'
					},
					{
						name: '昨天降雨量',
						icon: ' iconfont icon-ic_zryl',
						iconColor: '#ffce6b',
						value: '23mm'
					},
					{
						name: '风速',
						icon: ' iconfont icon-ic_fs',
						iconColor: '#ffce6b',
						value: '3.1m/s'
					},
					{
						name: '总降雨量',
						icon: ' iconfont icon-ic_zyl',
						iconColor: '#0187fc',
						value: '236mm'
					},
					{
						name: '风向',
						icon: ' iconfont icon-ic_fx',
						iconColor: '#67c300',
						value: '西南风2级'
					},
					{
						name: '土壤水分',
						icon: ' iconfont icon-ic_trsf',
						iconColor: '#4ad595',
						value: '26%'
					}
				]
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

	.curve {
		display: flex;
		justify-content: space-around;
		text-align: center;
		font-size: 0.625rem;
		padding-top: 0.3125rem;
		color: #31abe3
	}
	.curve button{
		color: #31abe3;
		background: #0d319a;
		border:0;
		padding: 0 0.3125rem
		
		
	}
	.curve .btnColor1{
		// background: #000000;
		 background-image: linear-gradient(to right, #a541ff , #3fbbfe);
		color:#ffffff
	}
	
	.curve1{
		float: left;width: 50%;height: 100%;
	}

	.curveEchart {
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
		// height: 100%
		// background: #00BFFF;
	}

	.mapContent .compent {
		position: absolute;
		z-index: 1;
		width: 45%;
		top: 2%;
		// right: 2%;
		// height: auto;
		overflow: hidden;
		height: 25%;
	}

	.compent .img1 {
		position: absolute;
		width: 100%;
		height: 100%
	}

	.compent .title {
		position: absolute;
		top: 0;
		padding: 0.625rem;
		color: '#00b8ff';
	}

	.map .title span{
		// color: '#00b8ff';
		padding-left: 0.3125rem;
		font-size: 0.75rem;
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
