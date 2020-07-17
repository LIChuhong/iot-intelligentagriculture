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
				default:'近一年降雨量'
			},
			barData:{
				type:Array,
				default:[]
			},
			barColor:{
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
			var data = [{
				id: '1',
				value: 230
			}, {
				id: '2',
				value: 220
			}, {
				id: '3',
				value: 450
			}, {
				id: ' 4',
				value: 130
			}, {
				id: '5',
				value: 720
			}, {
				id: '6',
				value: 80
			}, {
				id: ' 7',
				value: 75
			}, {
				id: '8',
				value: 860
			}, {
				id: '9',
				value: 30
			}, {
				id: '10',
				value: 580
			}, {
				id: ' 11',
				value: 50
			}, {
				id: '12',
				value: 70
			}];
			this.barData = data
			const option = {
				tooltip: {
					confine: true,
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							// backgroundColor: '#6a7985',
							lineHeight: 0,
							fontSize: 10

						},
					},
					textStyle: {
						fontSize: 12,
						lineHeight: 0,
					}
				},
				legend: {
					bottom: '20%',
					padding: 0,
					icon: 'roundRect',
					itemHeight: 6,
					itemWidth: 15,
					textStyle: {
						color: '#fff',
						fontSize: 8,
						lineHeight: 0
					}

				},
				dataset: {
					// dimensions: ['id','value'],
					source: this.barData
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
							color: '#999',

						}
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
				// dataZoom: [{
				// 	type: 'inside'
				// }],
				series: [{
					name: this.legendName,
					type: 'bar',
					encode: {
						// 将 "amount" 列映射到 X 轴。
						// x: 'id',
						// 将 "product" 列映射到 Y 轴。
						// y: 'product'
					},

					itemStyle: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[{
									offset: 0,
									color: '#eee'
								},
								// {
								// 	offset: 0.5,
								// 	color: this.barColor
								// },
								{
									offset: 1,
									color: this.barColor
								}
							]
						)
					},
					emphasis: {
						itemStyle: {
							color:this.barColor

						}
					},
				}]
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
