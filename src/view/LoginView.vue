<template>
  <!-- Login Template -->
    <div class="padding-content">
      <ons-card>
        <ons-card-content>
          <div class="card-content">
            <div class="card-content-inner">
              <form action="">
                <div class="form-group">
                  <label for="username">아이디</label>
                  <input type="text" id="username" ref="usernameInput" class="form-control" v-model="login.username" placeholder="아이디를 입력하세요.">
                </div>
                <div class="form-group">
                  <label for="password">비밀번호</label>
                  <input type="password" id="password" ref="passwordInput" class="form-control" v-model="login.password" style="color: black" placeholder="비밀번호를 입력하세요.">
                </div>
                <div class="form-group">
                  <button type="button" class="btn btn-primary" @click="loginEvent">로그인</button>
                  <router-link to="/signup">
                    <a style="float:right;padding-top: 0.4rem;color: black;text-underline: none">아직 회원이 아니신가요?</a>
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </ons-card-content>
      </ons-card>
    </div>
</template>

<script>
import $ons from "vue-onsenui";

export default {
  name: "LoginView",
  data() {
    return {
      login: {
        username: "usertest1",
        password: "Usertest1!",
      },
    };
  },
  methods: {
    loginEvent() {
      if (this.login.username === "") {
        $ons.notification.alert("아이디를 입력해주세요.");
        this.$refs.usernameInput.focus();
        return
      }
      // this.$store.dispatch("login", this.login);
      if (this.login.password === "") {
        $ons.notification.alert("비밀번호를 입력해주세요.");
        this.$refs.passwordInput.focus();
        return;
      }
      const loginFrm = new FormData()
      loginFrm.append('username', this.login.username);
      loginFrm.append('password', this.login.password);
      this.Auth.dispatch("doLogin", loginFrm).then(() => {
        this.$router.go(-1);
      }).catch((err) => {
        this.errorMessage = err.response.data.detail;
        $ons.notification.alert(this.errorMessage);
      });
    },
  },
  mounted() {
    this.$refs.usernameInput.focus();
  }
}
</script>

<style scoped>

</style>