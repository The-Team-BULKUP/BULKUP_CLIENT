import loginStore from "@/api/store/auth";

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
        function(error) {
            // if (error.response.status === 500)
            //     tokenReissue();
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        },
    );
    return instance;
}

