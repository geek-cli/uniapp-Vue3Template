export default function usePush() {
	// 获取客户端标识
	/** @function
	 * @returns {String} 客户端标识
	 */
	let getClientCid = () => {
		// #ifdef APP-PLUS
		var pinf = plus.push.getClientInfo();
		return pinf.clientid; //客户端标识
		// #endif
	}
	// 监听推送消息
	/** @function 
	 * @param {function(msg)} callback - 回调函数，会传入接收到的消息
	 * @param {function(msg)} msgOptions - 创建消息时携带的额外参数, 需要返回一个对象
	 */
	let receivePushMsg = (callback, msgOptions = {}) => {
		// #ifdef APP-PLUS
		//监听接收透传消息事件
		plus.push.addEventListener('receive', (msg) => {
			plus.push.createMessage(msg.content, msg.payload, msgOptions(msg));
			callback(msg);
		});
		// #endif
	}
	// 监听系统消息点击事件
	/** @function 
	 * @param {function(msg)} callback - 回调函数，会传入接收到的消息
	 */
	let pushMsgClick = (callback) => {
		// #ifdef APP-PLUS
		plus.push.addEventListener('click', (msg) => {
			callback(msg);
		});
		// #endif
	} 

	return {
		getClientCid,
		receivePushMsg,
		pushMsgClick
	}
}
