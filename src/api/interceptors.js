import loginStore from "@/api/store/auth";
import $ons from "vue-onsenui";
import {tokenReissue} from "@/api/index";

export function setInterceptors(instance) {
    // Add a request interceptor
    instance.interceptors.request.use( // login API 요청후
        function(config) {
            // Do something before request is sent
            config.headers.Authorization = `Bearer ${loginStore.state.accessToken}`; // 요청시 토큰 셋팅
            config.timeout = 10000;
            return config;
        },
        function(error) {
            // Do something with request error
            return Promise.reject(error);
        },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        function(response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        async function (error) {
            if (error.response.status === 500) {
                await tokenReissue();
                error.config.headers.Authorization = `Bearer ${loginStore.state.accessToken}`;
                return instance.request(error.config);
            }

            if (error.response.status === 400) {
                let message = "";
                for (let i = 0; i < error.response.data.detail.length; i++) {
                    message += error.response.data.detail[i].defaultMessage + "\n";
                }
                $ons.notification.alert(message);
            } else if (error.response.data.detail != null) {
                $ons.notification.alert(error.response.data.detail);
            } else if (error.response.data.detail[0] != null){
                $ons.notification.alert(error.response.data.detail[0]);
            } else $ons.notification.alert("오류가 발생했습니다.");

            return Promise.reject(error);
        },
    );
    return instance;
}

