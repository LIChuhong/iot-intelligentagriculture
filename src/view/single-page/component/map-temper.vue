<template>
	<div ref="dom" class="charts chart-bar"></div>
</template>

<script>
	import echarts from 'echarts'
	// import tdTheme from './charts-json/theme.json'
	import {
		on,
		off
	} from '@/libs/tools'
	// echarts.registerTheme('tdTheme', tdTheme)
	export default {
		name: 'ChartTemper',
		props: {
			value: Object,
			text: String,
			subtext: String
		},
		data() {
			return {
				dom: null
			}
		},
		methods: {
			resize() {
				this.dom.resize()
			}
		},
		mounted() {
			var data = []

			//let legend = this.value.map(_ => _.name)
			let option = {
				// title: {
				// 	text: '当天空气温度、土壤温度变化曲线',
				// 	textStyle: {
				// 		//fontSize: 16
				// 	}
				// },
				// legend: {
				// 	top: 30
				// },
				dataset: {
					// 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
					// 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
					dimensions: ['time', '湿度', '温度'],
					source: [
						{
							time: '1时',
							'湿度': 43.3,
							'温度': 15.8
						},
						{
							time: '3时',
							'湿度': 83.1,
							'温度': 23.4
						},
						{

							time: '5时',
							'湿度': 86.4,
							'温度': 25.2
						},
						{
							time: '7时',
							'湿度': 72.4,
							'温度': 13.9
						},
						{
							time: '9时',
							'湿度': 43.3,
							'温度': 35.8
						},
						{
							time: '11时',
							'湿度': 83.1,
							'温度': 33.4
						},
						{

							time: '13时',
							'湿度': 86.4,
							'温度': 35.2
						},
						{
							time: '15时',
							'湿度': 72.4,
							'温度': 23.9
						}
					]
				},
				grid: {
					left: '3%',
					// right: '4%',
					top: '35%',
					width: '94%',
					bottom:'10%',
					 // height: '70%',
					containLabel: true
				},
				tooltip: {
					confine: true,
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						animation: false,
						label: {
							backgroundColor: '#505765'
						}
					}
				},
				xAxis: {
					type: 'category',
					axisLabel: {
						// inside: true,
						show: true,
						textStyle: {
							color: '#fff',
							fontSize: 10,
							lineHeight: 0
						},
					
					},
					splitLine: {
						show: false
					},
					
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
					
				},
				yAxis: {
					splitLine: {
						show: false
					},
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						textStyle: {
							color: '#fff',
							fontSize: 10,
							lineHeight: 0
					
						}
					}
				},
				series: [{
						type: 'line',
						itemStyle: {
							color: '#00a7fe'
						},
						lineStyle: {
							color: '#00a7fe'
						},
					},
					{
						type: 'line',
						itemStyle: {
							color: '#3ed795'
						},
						lineStyle: {
							color: '#3ed795'
						},
						markPoint: {
							// data: [{
							// 		type: 'max',
							// 		name: '最大值'
							// 	},
							// 	{
							// 		type: 'min',
							// 		name: '最小值'
							// 	}
							// ]
						},
					},
				]
			};
			this.$nextTick(() => {
				this.dom = echarts.init(this.$refs.dom)
				this.dom.setOption(option)
				on(window, 'resize', this.resize)
			})
		},
		beforeDestroy() {
			off(window, 'resize', this.resize)
		}
	}
</script>
