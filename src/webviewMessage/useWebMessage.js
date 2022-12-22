
export default function useWebMessage() {
	// 发送消息
	let sendMessage = (data = {})=>{
		// #ifdef H5
		// h5传递数据为了方便获取就手动包了和uni.postMessage一样的数据外壳
		window.frames[0].postMessage({
			data: {
				arg: data
			}
		}, "*");
		// #endif	
	}
	// h5接收消息
	let H5ReceiveMessage = (callback)=>{
		window.addEventListener("message", (e) => {
			let data = e.data.data;
			data = data.arg || data;
			callback(data)
		})
	}
	
	return {
		sendMessage,
		H5ReceiveMessage
	}
} 