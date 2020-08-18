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