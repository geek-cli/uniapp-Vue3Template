import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from "path";
 
function resolve(dir) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, 'src') },
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