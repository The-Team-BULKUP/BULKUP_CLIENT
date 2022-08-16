//📁router/router.js
import { createWebHistory, createRouter } from "vue-router";
const routes = [
	//라우팅 패스, 컴포넌트 등 정의
	{
		path: "/",
		name: "Home",
		component: () => import("./components/MainLayout.vue"),
		children: [
			{
				path: "/home",
				component: () => import("./view/HomeView.vue"),
			},
			{
				path: "/calendar",
				component: () => import("./view/CalendarView.vue")
			},
			{
				path: "/community",
				component: () => import("./view/CommunityView.vue"),
			},
			{
				path: "/community/write",
				component: () => import("./view/CommunityWriteView.vue"),
			},
			{
				path: "/chat",
				component: () => import("./view/ChatView.vue")
			},
			{
				path: "/mypage",
				component: () => import("./view/MyPageView.vue")
			}
		]
	}
]
const router = createRouter({
	history : createWebHistory(),
	routes
});

export default router;