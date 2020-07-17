<template>
	<div ref="dom"></div>
</template>

<script>
	import echarts from 'echarts'
	import {
		on,
		off
	} from '@/libs/tools'
	export default {
		props:{
			legendName:{
				type:String,
				default:'近一月降雨量'
			},
			lineData:{
				type:Array,
				default:[]
			},
			lineColor:{
				type:String,
				default:'#83bff6'
			}
		},
		data() {
			return {
				dom: null,
				screenWidth: null
			}
		},
		methods: {
			resize() {
				this.dom.resize()
			}

		},

		mounted() {
			console.log(this.legendName)
			var dataAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149];
			const option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					// data: ['近一月降雨量'],
					 bottom:'20%',
					padding:0,
					icon:'roundRect',
					itemHeight :6,
					itemWidth:15,
					textStyle:{
						color:'#fff',
						fontSize:8,
						 lineHeight:0
					}
					
				},
				
				grid: {
					left: '3%',
					// right: '4%',
					bottom: '35%',
					width: '94%',
					height: '55%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: dataAxis,
					axisLabel: {
						// inside: true,
						textStyle: {
							color: '#fff',
							fontSize: 10,
							lineHeight: 0
						}
					},
					splitLine: {
						show: false
					},
				}],
				yAxis: [{
					type: 'value',
					axisLabel: {
						textStyle: {
							color: '#999',
							fontSize: 10,
							lineHeight: 0

						}
					},
					splitLine: {
						show: false
					},
				}],
				series: [{
						name: this.legendName,
						type: 'line',
						// stack: '总量',
						itemStyle: {
							color: this.lineColor
						},
						lineStyle: {
							color: this.lineColor
						},
						areaStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: this.lineColor
								},
								{
									offset: 1,
									color: '#eee'
								}
							])
						},
						data: data
					},

				]
			}
			// console.log(option)
			this.$nextTick(() => {
				this.dom = echarts.init(this.$refs.dom)
				this.dom.setOption(option)
				// window.onresize = this.dom.resize
				on(window, 'resize', this.resize)

			})

		},
		beforeDestroy() {
			off(window, 'resize', this.resize)
		}
	}
</script>

<style>
</style>
