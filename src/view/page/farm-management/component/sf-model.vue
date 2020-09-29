<template>
	<div>
		<div style="display: flex;flex-wrap: wrap">
			<div v-for="(item,i) in waterTankList" :key="i" style="padding-left: 0.625rem;">
				<p>
					<Checkbox v-model="item.value">{{item.label}}</Checkbox>
				</p>
				<p>注水容量:{{item.waterCapacity}}(L)</p>
				<p>肥料容量:<Input type="number" style="width: 4.375rem;" v-model="item.fertilizerCapacity" size="small" />(kg)</p>
				<p>水肥比例:{{item.fert}}/{{item.water}}(kg/L)</p>
			</div>

		</div>
		<div style="display: flex;flex-wrap: wrap">
			<div style="padding-left: 0.625rem;">恒定流量:<Input type="number" size="small" style="width:4.375rem;" v-model="constantFlow" />(m³/h)</div>
			<div style="padding-left: 0.625rem;">停止容量:<Input type="number" size="small" style="width:4.375rem;" v-model="stopCapacity" />(L)</div>
			<div style="padding-left: 0.625rem;">浇灌策略:
				<Select size="small" v-model="wateStrategy" style="width:6.25rem">
					<Option v-for="item in wateStrategyList" :value="item.id" :key="item.id">{{ item.label }}</Option>
				</Select>
			</div>
		</div>
		<div style="display: flex;flex-wrap: wrap">

			<div style="padding-left: 0.625rem;">注水时间:{{waterTime}}</div>
			<div style="padding-left: 0.625rem;">搅拌时间:{{mixingTime}}分钟</div>
			<div style="padding-left: 0.625rem;">灌溉时间:{{irrigationTime}}</div>
			<div style="padding-left: 0.625rem;">施肥时间:{{fertilizationTime}}</div>
		</div>
		<div style="display: flex;flex-wrap: wrap;justify-content:space-around">
			<div >
				<Button type="primary">一键启动</Button>
			</div>
			<div>
				<Button type="primary">一键停止</Button>
			</div>
			<div>
				<Button type="primary">暂停</Button>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				wateStrategyList: [{
					id: 0,
					label: '浇灌策略'
				}],
				wateStrategy: 0,
				fertilizationTime: '10分20秒', //施肥时间
				irrigationTime: '10分20秒', //施肥时间
				mixingTime: 2, //搅拌时间
				waterTime: '10分20秒', //注水时间
				constantFlow: 5, //恒定流量
				stopCapacity: 100, //停止容量
				waterTankList: [{
						value: false,
						label: "使用A水箱",
						waterCapacity: 30.16, //注水容量
						fertilizerCapacity: 2, //肥料容量
						fert: 1, //水肥比例
						water: 20.55
					},
					{
						value: false,
						label: "使用B水箱",
						waterCapacity: 30.16,
						fertilizerCapacity: 2,
						fert: 1,
						water: 20.34
					},
					{
						value: false,
						label: "使用C水箱",
						waterCapacity: 30.16,
						fertilizerCapacity: 2,
						fert: 1,
						water: 20.44
					}
				]
			}
		}
	}
</script>

<style>
</style>
