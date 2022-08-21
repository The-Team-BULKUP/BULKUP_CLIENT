import axios from 'axios';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const HOST = process.env["API_HOST"] || "http://localhost:8080/api/v1";

export const loginStore = new Vuex.Store({
    state: {
        username: '',
        accessToken: '',
        refreshToken: '',
        tokenExpired: '',
        realName: '',
        role: '',
    },
    getters: {
        isLogin(state) {
            return (state.accessToken !== '' && state.refreshToken !== '');
        },
        isUser(state) {
            return (state.role === 'USER');
        },
        isTrainer(state) {
            return (state.role === 'TRAINER');
        },
        tokenExpired(state) {
            return state.tokenExpired;
        },
        realName(state) {
            return state.realName;
        }
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
        },
        setTokenExpired(state, tokenExpired){
            state.tokenExpired = tokenExpired;
        },
        setRealName(state, realName) {
            state.realName = realName;
        },
        setRole(state, role) {
            state.role = role;
        },
        // 초기화시킵니다.
        reset(state) {
            state.accessToken = '';
            state.refreshToken = '';
            state.tokenExpired = '';
            state.realName = '';
        }
    },
    actions: {
        // 로그인합니다.
        async doLogin({ commit }, memberInfo) {
            console.log(memberInfo);
            let result = false;
            let resultErr = null;
            try {
                let res = await axios.post(HOST + "/login", memberInfo);
                if (res.status === 200) {
                    console.log("로그인되었습니다.");
                    console.log(res.data);
                    commit('setUsername', memberInfo.username);
                    commit('setAccessToken', res.data.token);
                    commit('setRefreshToken', res.data.refresh);
                    commit('setTokenExpired', res.data.tokenExpired);
                    commit('setRealName', res.data.realName);
                    commit('setRole', res.data.role);
                    result = true;
                } else {
                    console.log("로그인되지 않았습니다.");
                    let err = new Error("Request failed");
                    err.response = {data:{"success":false, "errormessage": err.response.details}};
                    resultErr = err;
                }
            } catch(err) {
                console.log(err);
                if (!err.response) {
                    err.response = {data:{"success":false, "errormessage":err.response.details}};
                }
                resultErr = err;
            }
            return new Promise((resolve, reject) => {
                if (result) {
                    resolve();
                } else {
                    reject(resultErr);
                }
            });
        },

        // 재발행 합니다.
        async doReissue({ commit }) {
            let result = false;
            let resultErr = null;
            try {
                let headers = {
                        Authorization: this.state.accessToken,
                        REFRESH: this.state.refreshToken
                }
                let res = await axios.post(HOST + "/reissue", {}, {headers});
                if (res.status === 200) {
                    console.log("재발행 완료");
                    commit('setAccessToken', res.data.token);
                    commit('setRefreshToken', res.data.refresh);
                    commit('setTokenExpired', res.data.tokenExpired);
                    commit('setRealName', res.data.realName);
                    commit('setRole', res.data.role);
                    result = true;
                } else {
                    console.log("재발행 오류");
                    let err = new Error("Request failed");
                    err.response = {data:{"success":false, "errormessage": err.response.details}};
                    resultErr = err;
                }
            } catch(err) {
                console.log(err);
                if (!err.response) {
                    err.response = {data:{"success":false, "errormessage":err.response.details}};
                }
                resultErr = err;
            }
            return new Promise((resolve, reject) => {
                if (result) {
                    resolve();
                } else {
                    reject(resultErr);
                }
            });
        },

        // 로그아웃합니다.
        doLogout({commit}) {
            commit('reset');
            this.$router.go(-1);
        }
    },
    computed : {

    },
    methods: {

    },
    plugins : [
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
});

export default loginStore;