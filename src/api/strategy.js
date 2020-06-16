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