<template>
	<div class="demo-tabs-style1">
		<Tabs type="card" v-model="tabsName">
			<div slot="extra" style="padding:0.3rem 0.5rem 0;">
				<Button v-show="tabsName == '添加定时'" @click="addTiming" type="primary" icon="md-add">{{tabsName}}</Button>
				<Button v-show="tabsName == '添加策略'" @click="addStrategy" type="primary" icon="md-add">{{tabsName}}</Button>
			</div>
			<TabPane label="定时" name="添加定时">
				添加定时
			</TabPane>
			<TabPane label="策略" name="添加策略">
				添加策略
			</TabPane>
			<!-- <TabPane label="标签三">标签三的内容</TabPane> -->
		</Tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabsName: '添加定时'
			}
		},
		methods: {
			addTiming() {
				alert(1)
			},
			addStrategy() {
				alert(2)
			}
		}
	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
			/* height: 120px; */
			/* margin-top: -16px; */
		}

		.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
			height: 2.5rem;
		}

		.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
			height: 2.4375rem;
			padding: 0.625rem 1rem 0.25rem
		}


	}
</style>
