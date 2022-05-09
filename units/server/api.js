import request from './request'
import config from './config'

export default {
	// 首页专题列表
	indexProjectList: (params) => {
		return request.post(config.api.serviceUrl + '/index_project_list', params, false)
	},
}