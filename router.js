import uniCrazyRouter from "uni-crazy-router";
import push from "@/units/router/push.js";
export default {
	setupRouter: app=>{
	    // 接收vue3的实例，并注册uni-crazy-router
	    app.use(uniCrazyRouter)
	},
	// 路由跳转
	push
}

// 跳转前
uniCrazyRouter.beforeEach(async (to, from ,next)=>{
    next();
})

// 跳转后
uniCrazyRouter.afterEach((to, from)=>{
    
})

// 错误页面
uniCrazyRouter.onError((to, from)=>{
    
})