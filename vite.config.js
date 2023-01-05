import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from "path";
import h5ProdEffectPlugin from 'uni-vite-plugin-h5-prod-effect';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni({
		  vueOptions: {
		    reactivityTransform: true, // 开启响应式语法糖
		  },
	}),
	// 对h5 production环境打包时的特殊处理，否则uni-crazy-router在这个环境会异常
	h5ProdEffectPlugin(),
  ],
  resolve: {
  	alias: {
  		"@": path.resolve(__dirname, 'src')
  	},
  },
  css: {
  	// css预处理器
  	preprocessorOptions: {
  		less: {
  			charset: false,
  			additionalData: '@import "./src/components/css/Layout.less";',
  		},
  	},
  }
})
