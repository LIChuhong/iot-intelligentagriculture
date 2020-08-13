import axios from '@/libs/api.request'

//添加告警
export const addParameterWarnInfo = (parameterWarnInfo) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/v1/addParameterWarnInfo',
		data: parameterWarnInfo,
		method: 'post'
	})
}

//3.更新告警信息
export const updateParameterWarnInfo = (parameterWarnInfo) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/v1/updateParameterWarnInfo',
		data: parameterWarnInfo,
		method: 'post'
	})
}

//获取合作信息
// export const getOrg = (id) => {
// 	return axios.request({
// 		url: '/v1/getOrg',
// 		params: {
// 			'id':id
// 		},
// 		method: 'get'
// 	})
// }

//获取告警列表
export const getParameterWarnInfoList = (warnName, maxId, pageSize) => {
	return axios.request({
		url: '/v1/getParameterWarnInfoList',
		params: {
			'warnName': warnName,
			'maxId': maxId,
			'pageSize': pageSize
		},
		method: 'get'
	})
}
