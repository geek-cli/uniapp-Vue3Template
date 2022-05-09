import pages from '@/pages.json'; // 所有页面

// 获取页面参数字符串
function getQueryStr(params) {
	let query = ""; // 页面参数
	if(params){
		// 判断参数是否为对象
		if(Object.prototype.toString.call(params) === "[object Object]") {
			for(var key in params) {
				query += `&${key}=${params[key]}`
			}
			query = "?" + query.slice(1);
		}
	}
	return query
}

export default (option)=>{
	let path = "";
	// 如果传递的为字符串 说明要直接跳转
	if(Object.prototype.toString.call(option) === "[object String]") {
		path = option;
	} 
	// 如果传入的为对象
	else if(Object.prototype.toString.call(option) === "[object Object]"){
		// path跳转 path需要为页面的绝对路径
		if(option.path) {
			// 查看是否有该页面
			path = pages.pages.filter((page)=>{return page.path === option.path.slice(1)})[0];
			// 如果页面不存在
			if(!path) {
				return console.error(`路由中没有找到路径为 ${option.path} 的路由`);
			}
			
			// 页面参数
			let query = getQueryStr(option.query);
			
			path = option.path + query;
		} 
		// name跳转
		else if(option.name){
			path = pages.pages.filter((page)=>{return page.name === option.name})[0]; // 找出第一个满足name的页面
			// 如果页面不存在
			if(!path) {
				return console.error(`路由中没有找到name为 ${option.name} 的路由`);
			}
			
			path = path.path;
			path[0] !== "/" ? path = "/" + path : ""; // 如果非绝对路径则手动添加
			
			// 页面参数
			let query = getQueryStr(option.params);
			
			// 路径
			path = path + query;
		}
	} else {
		return console.error('参数应为 string 或 object');
	}
	// 跳转页面
	uni.navigateTo({
		url: path
	})
}