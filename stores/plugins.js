import {
	createPinia
} from 'pinia';
import {
	createPersistedState
} from "pinia-persistedstate-plugin";

export const pinia = createPinia();

export const piniaInstall = (app) => {
	pinia.use(
		createPersistedState({
			storage: {
				getItem(key) {
					return uni.getStorageSync(key)
				},
				setItem(key, value) {
					uni.setStorageSync(key, value)
				},
				removeItem(key) {
					uni.removeStorageSync('key')
				}
			},
		}),
	)
	// 因为状态管理使用的是setup的方式构建所以需要将$reset挂载到所有store中
	pinia.use(({ store }) => {
	    const initialState = JSON.parse(JSON.stringify(store.$state));
	    store.$reset = () => {
	        store.$patch(initialState);
	    }
	})
	app.use(pinia);
}
