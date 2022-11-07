import { ref, reactive, watch } from 'vue';
import { defineStore } from 'pinia';
import api from "@/units/server/api.js";

export const useUserStore = defineStore('user', ()=>{
	let userInfo = ref({a: 1});
	// 更新用户信息
	const uploadUserInfo = ()=>{
		api.userInfo("", {
			success: (data) => {
				userInfo.value = data;
			},
		});
	};
	return { userInfo, uploadUserInfo };
})