import { ref, reactive, watch } from 'vue';
import { defineStore } from 'pinia';
import api from "@/units/server/api.js";

export const useUserStore = defineStore('user', ()=>{
	// 用户信息
	let userInfo = $ref(uni.getStorageSync("user"));
	// 更新用户信息
	const updataUserInfo = ()=>{
		api.fetchUserInfo().then(res=>{
			uni.setStorageSync("user", res.user);
			userInfo = res.user;
		});
	};
	return $$({
		userInfo,
		updataUserInfo
	});
})