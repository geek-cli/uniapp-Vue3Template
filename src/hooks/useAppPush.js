import usePush from '/src/hooks/usePush.js';
let {
	getClientCid,
	receivePushMsg,
	pushMsgClick
} = usePush();

import $Common from '../units/Common.js';

export default function useAppPush() {
	
	// 接收系统透传消息
	let receive = () => {
		receivePushMsg(
			msg => {
				
			},
			msg =>{
				return {
					title: msg.title
				}
			}
		)
	}

	// 点击系统消息
	let click = () => {
		pushMsgClick(msg => {
			
		})
	}

	return {
		receive,
		click,
		getClientCid
	}
}
