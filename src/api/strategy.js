import axios from '@/libs/api.request'

//添加策略
export const addSwitchsStrategy = (switchsStrategy) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/addSwitchsStrategy',
		data:switchsStrategy,
  	method: 'post'
  })
}

//删除策略
export const delSwitchsStrategy = (id) => {
	//console.log(vmOrg)
	const data = new URLSearchParams()
	data.append('id', id)
  return axios.request({
  	url: '/v1/delSwitchsStrategy',
		data,
  	method: 'post'
  })
}

//更改策略
export const updateSwitchsStrategy = (switchsStrategy) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/updateSwitchsStrategy',
		data:switchsStrategy,
  	method: 'post'
  })
}

//获取策略详情
export const getSwitchsStrategy = (id) => {
  return axios.request({
    url: '/v1/getSwitchsStrategy',
		params:{
			'id': id
		},
    method: 'get'
  })
}

//获取策略列表
export const getSwitchsStrategyList = (orgId,searchKey,maxId,pageSize) => {
  return axios.request({
    url: '/v1/getSwitchsStrategyList',
		params:{
			'orgId': orgId,
			'searchKey': searchKey,
			'maxId': maxId,
			'pageSize': pageSize
		},
    method: 'get'
  })
}

//获取执行模式策略列表
export const getExeModeSwitchsStrategyList = (exeMode,searchKey,maxId,pageSize) => {
  return axios.request({
    url: '/v1/getExeModeSwitchsStrategyList',
		params:{
			'exeMode': exeMode,
			'searchKey': searchKey,
			'maxId': maxId,
			'pageSize': pageSize
		},
    method: 'get'
  })
}

//获取组织所有策略列表
export const getOrgSwitchsStrategyList = (orgId) => {
  return axios.request({
    url: '/v1/getOrgSwitchsStrategyList',
		params:{
			'orgId': orgId
		},
    method: 'get'
  })
}

//添加控制策略定时
export const addSwitchsStrategyTimer = (switchsStrategyTimer) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/addSwitchsStrategyTimer',
		data:switchsStrategyTimer,
  	method: 'post'
  })
}

//更新控制策略定时
export const updateSwitchsStrategyTimer = (switchsStrategyTimer) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/updateSwitchsStrategyTimer',
		data:switchsStrategyTimer,
  	method: 'post'
  })
}

//获取控制策略定时列表
export const getSwitchsStrategyTimerList = (searchKey,maxId,pageSize) => {
  return axios.request({
    url: '/v1/getSwitchsStrategyTimerList',
		params:{
			'searchKey': searchKey,
			'maxId': maxId,
			'pageSize': pageSize
		},
    method: 'get'
  })
}

//启动禁用控制策略定时
export const enableSwitchsStrategyTimer = (id,enable) => {
	//console.log(vmOrg)
	const data = new URLSearchParams()
	data.append('id', id)
	data.append('enable', enable)
  return axios.request({
  	url: '/v1/enableSwitchsStrategyTimer',
		data,
  	method: 'post'
  })
}

//删除控制策略定时
export const delSwitchsStrategyTimer = (id) => {
	//console.log(vmOrg)
	const data = new URLSearchParams()
	data.append('id', id)
  return axios.request({
  	url: '/v1/delSwitchsStrategyTimer',
		data,
  	method: 'post'
  })
}

//11.获取控制策略定时详情
export const getSwitchsStrategyTimer = (id) => {
  return axios.request({
    url: '/v1/getSwitchsStrategyTimer',
		params:{
			'id': id
		},
    method: 'get'
  })
}

