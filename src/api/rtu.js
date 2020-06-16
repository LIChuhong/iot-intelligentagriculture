import axios from '@/libs/api.request'

//添加机器
export const addRtu = (newRtu) => {
	console.log(newRtu)
  return axios.request({
    url: '/v1/addRtu',
		data:newRtu,
    method: 'post'
  })
}

//复制机器
export const copyRtu = (rtuNumber,copyCount) => {
	const data = new URLSearchParams()
	data.append('rtuNumber', rtuNumber)
	data.append('copyCount', copyCount)
  return axios.request({
    url: '/v1/copyRtu',
		data,
    method: 'post'
  })
}

//获取机器信息
export const getRtu = (rtuNumber) => {
  return axios.request({
    url: '/v1/getRtu',
		params:{
			'rtuNumber': rtuNumber
		},
    method: 'get'
  })
}

//更新机器
export const updateRtu = (newRtu) => {
  return axios.request({
    url: '/v1/updateRtu',
		data:newRtu,
    method: 'post'
  })
}

//获取机器列表
export const getRtuList = (keyField,searchKey,maxId,pageSize) => {
  return axios.request({
    url: '/v1/getRtuList',
		params:{
			'keyField': keyField,
			'searchKey': searchKey,
			'maxId': maxId,
			'pageSize': pageSize
		},
    method: 'get'
  })
}

//查询机器实时数据
export const getRtuData = (rtuNumber) => {
  return axios.request({
    url: '/v1/getRtuData',
		params:{
			'rtuNumber': rtuNumber
		},
		method: 'get'
  })
}

//控制设备
export const setRtuData = (rtuData) => {
  return axios.request({
    url: '/v1/setRtuData',
		data:rtuData,
    method: 'post'
  })
}

//获取机器调试信息
export const debugRtu = (rtuNumber) => {
  return axios.request({
    url: '/v1/debugRtu',
  	params:{
  		'rtuNumber': rtuNumber
  	},
  	method: 'get'
  })
}

//清除机器调试信息
export const clearRtuLogs = (rtuNumber) => {
	const data = new URLSearchParams()
	data.append('rtuNumber', rtuNumber)
  return axios.request({
    url: '/v1/clearRtuLogs',
		data,
    method: 'post'
  })
}


//获取机器类型列表
export const getAllRtuTypeList = () => {
  return axios.request({
    url: '/v1/getAllRtuTypeList',
  	method: 'get'
  })
}

//启禁用机器
export const isEnableRtu = (rtuNumber,isEnable) => {
	//console.log(vmOrg)
	const data = new URLSearchParams()
	data.append('rtuNumber', rtuNumber)
	data.append('isEnable', isEnable)
  return axios.request({
  	url: '/v1/isEnableRtu',
		data,
  	method: 'post'
  })
}


