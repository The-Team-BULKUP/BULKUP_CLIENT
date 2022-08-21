//📁router/router.js
import { createWebHistory, createRouter } from "vue-router";
import Auth from "@/api/store/auth";
import $ons from "vue-onsenui";
const routes = [
	//라우팅 패스, 컴포넌트 등 정의
	{
		path: "/",
		name: "MainLayout",
		component: () => import("./components/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "Home",
				component: () => import("./view/HomeView.vue"),
			},
			{
				path: "/calendar",
				meta: {authRequired: true},
				component: () => import("./view/CalendarView.vue")
			},
			{
				path: "/community",
				meta: {authRequired: true},
				component: () => import("./view/CommunityView.vue"),
			},
			{
				path: "/community/write",
				meta: {authRequired: true},
				component: () => import("./view/CommunityWriteView.vue"),
			},
			{
				path: "/chat",
				meta: {authRequired: true},
				component: () => import("./view/ChatView.vue")
			},
			{
				path: "/mypage",
				meta: {authRequired: true},
				component: () => import("./view/MyPageView.vue")
			},
			{
				path: "/login",
				name: "Login",
				meta: {authRequired: false},
				component: () => import("./view/LoginView.vue")
			},
			{
				path: "/findCrew",
				name: "FindCrew",
				meta: {authRequired: true},
				component: () => import("./view/FindCrewView.vue")
			},
			{
				path: "/signup",
				name: "Signup",
				meta: {authRequired: false},
				component: () => import("./view/SignupView.vue")
			},
		]
	},
]
const router = createRouter({
	history : createWebHistory(),
	routes
});

export default router;

//네비게이션 가드((뷰 라우터로 URL 접근에 대해서 처리할 수 있음)
router.beforeEach( async(to, from, next) => { //여기서 모든 라우팅이 대기 상태가 됨
	/**
	 * to: 이동할 url 정보가 담긴 라우터 객체
	 * from: 현재 url 정보가 담긴 라우터 객체
	 * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
	 * next() 가 호출되기 전까지 화면 전환되지 않음
	 */

	if (to.matched.some(function(routeInfo) {
		// noinspection JSUnresolvedVariable
		return routeInfo.meta.authRequired;
	})) {
		if (Auth.getters.isLogin === false) {
			//2개 토큰이 모두 없을 경우 로그인페이지로
			await $ons.notification.alert('로그인이 필요한 서비스입니다.');
			return next({name: 'Login'});
		}
	}

	if (to.name.match("Login") && Auth.getters.isLogin) {
		console.log("이미 로그인 되어 있습니다.");
		return next({path : '/'});
	}

	if (to.name.match("Signup") && Auth.getters.isLogin) {
		console.log("이미 로그인 되어 있습니다.");
		return next({path : '/'});
	}

	return next();
})
