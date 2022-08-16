//📁router/router.js
import { createWebHistory, createRouter } from "vue-router";
const routes = [
	//라우팅 패스, 컴포넌트 등 정의
	{
		path: "/",
		component: () => import("./components/MainView.vue")
	}
]
const router = createRouter({
	history : createWebHistory(),
	routes
});

export default router;