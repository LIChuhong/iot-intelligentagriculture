import axios from '@/libs/api.request'

//添加品牌账号信息
export const addVideoBrandAccount = (videoBrandAccount) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/v1/addVideoBrandAccount',
		data: videoBrandAccount,
		method: 'post'
	})
}

//更新品牌账号信息
export const updateVideoBrandAccount = (videoBrandAccount) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/v1/updateVideoBrandAccount',
		data: videoBrandAccount,
		method: 'post'
	})
}

//获取品牌账号信息
export const getVideoBrandAccount = (id) => {
	return axios.request({
		url: '/v1/getVideoBrandAccount',
		params: {
			'id': id
		},
		method: 'get'
	})
}

//获取品牌账号信息列表
export const getVideoBrandAccountList = (maxId,pageSize) => {
	return axios.request({
		url: '/v1/getVideoBrandAccountList',
		params: {
			'maxId': maxId,
			'pageSize':pageSize
		},
		method: 'get'
	})
}

//添加视频设备
export const addVideo = (video) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/v1/addVideo',
		data: video,
		method: 'post'
	})
}

//更新视频设备信息
export const updateVideo = (video) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/v1/updateVideo',
		data: video,
		method: 'post'
	})
}

//删除视频设备信息
export const delVideo = (id) => {
	const data = new URLSearchParams()
	data.append('id', id)
  return axios.request({
  	url: '/v1/delVideo',
		data,
  	method: 'post'
  })
}

//获取视频设备信息
export const getVideo = (id) => {
	return axios.request({
		url: '/v1/getVideo',
		params: {
			'id': id
		},
		method: 'get'
	})
}


//通过设备序列号获取视频设备信息
export const getVideoByDeviceSerialChannelNo = (deviceSerial,channelNo) => {
	return axios.request({
		url: '/v1/getVideoByDeviceSerialChannelNo',
		params: {
			'deviceSerial': deviceSerial,
			'channelNo': channelNo
		},
		method: 'get'
	})
}

//获取视频设备信息列表
export const getVideoList = (searchKey,maxId,pageSize) => {
	return axios.request({
		url: '/v1/getVideoList',
		params: {
			'searchKey': searchKey,
			'maxId': maxId,
			'pageSize':pageSize
		},
		method: 'get'
	})
}
