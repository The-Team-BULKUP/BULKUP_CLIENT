<template>
  <!-- Login Template -->
      <ons-card>
        <ons-card-content>
          <div class="card-content">
            <div class="card-content-inner">
              <form action="">
                <div class="form-group">
                  <label for="">회원 유형을 선택해주세요</label><br/>
                  <input type="radio" name="signup_type" value="user" checked="checked">일반 회원
                  <input type="radio" name="signup_type" value="trainer">트레이너
                </div>
                <div class="form-group">
                  <label for="username">아이디</label>
                  <input type="text" id="username" class="form-control" v-model="login.username" placeholder="아이디를 입력하세요.">
                </div>
                <div class="form-group">
                  <label for="password">비밀번호</label>
                  <input type="password" id="password" class="form-control" v-model="login.password" placeholder="비밀번호를 입력하세요.">
                </div>
                <div class="form-group">
                  <label for="password">비밀번호 확인</label>
                  <input type="password" id="password" class="form-control" v-model="login.password_check" placeholder="비밀번호를 다시 입력해주세요.">
                </div>
                <div class="form-group">
                  <button type="button" class="btn btn-primary" @click="signup">회원가입</button>
                    <a ref="pw_watch" style="float:right;padding-top: 0.4rem;color: black;text-underline: none"></a>
                </div>
              </form>
            </div>
          </div>
        </ons-card-content>
      </ons-card>
</template>

<script>
import $ons from "vue-onsenui";

export default {
  name: "SignupView",
  data() {
    return {
      login: {
        username: "",
        password: "",
        password_check: "",
      },
    };
  },
  watch: {
    'login.password_check': function() {
      if (this.login.password !== this.login.password_check) {
        this.$refs.pw_watch.innerHTML = "비밀번호를 다시 입력해주세요.";
      } else {
        this.$refs.pw_watch.innerHTML = "";
      }
    }
  },
  methods:{
    signup() {
      if (this.login.password !== this.login.password_check) {
        $ons.notification.alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      this.$http.post('/api/signup', this.login).then(response => {
        if (response.body.result === 'success') {
          this.$router.push('/login');
        } else {
          alert(response.body.message);
        }
      });
    }
  }
}
</script>

<style scoped>

</style>