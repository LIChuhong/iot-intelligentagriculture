import axios from '@/libs/api.request'

//添加地块
export const addMassif = (iaMassif) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/addMassif',
		data:iaMassif,
  	method: 'post'
  })
}

//更新地块
export const updateMassif = (iaMassif) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/updateMassif',
		data:iaMassif,
  	method: 'post'
  })
}

//获取地块详情
export const getMassif = (id) => {
	return axios.request({
		url: '/v1/getMassif',
		params: {
			'id':id
		},
		method: 'get'
	})
}

//获取地块列表
export const getMassifList = (massifName,maxId,pageSize) => {
	return axios.request({
		url: '/v1/getMassifList',
		params:{
			'massifName':massifName,
			'maxId':maxId,
			'pageSize':pageSize
		},
		method: 'get'
	})
}

//添加画面数据
export const addIABigDataMap = (iaBigDataMap) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/addIABigDataMap',
		data:iaBigDataMap,
  	method: 'post'
  })
}

//更新画面数据
export const updateIABigDataMap = (iaBigDataMap) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/updateIABigDataMap',
		data:iaBigDataMap,
  	method: 'post'
  })
}

//获取画面数据列表
export const getIABigDataMapList = (mapName,maxId,pageSize) => {
	return axios.request({
		url: '/v1/getIABigDataMapList',
		params:{
			'mapName':mapName,
			'maxId':maxId,
			'pageSize':pageSize
		},
		method: 'get'
	})
}

//获取画面数据详情
export const getIABigDataMap = (id) => {
	return axios.request({
		url: '/v1/getIABigDataMap',
		params:{
			'id':id
		},
		method: 'get'
	})
}

//地块规划
export const updateIAMassifsMap = (iaMassifsMap) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/v1/updateIAMassifsMap',
		data:iaMassifsMap,
  	method: 'post'
  })
}