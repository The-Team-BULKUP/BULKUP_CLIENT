<template>
  <!-- Login Template -->
  <div class="page__content" style="top: 3.9rem !important; padding-top: 0; bottom: 4.3rem !important;">
      <ons-card>
        <ons-card-content>
          <div class="card-content">
            <div class="card-content-inner">
                <div class="form-group" style="align-items: center;    text-align-last: center;">
                  <label for="">어떤 회원으로 가입하실 건가요?</label><br/>
                  <input type="radio" name="signup_type" value="user" v-model="signup.type"> 일반회원<br/>
                  <input type="radio" name="signup_type" value="trainer" v-model="signup.type"> 트레이너
                </div>
              <div v-if="signup.type !== '' ">
                <div class="form-group">
                  <hr/>
                  <label for="realName">실명</label>
                  <input type="text" id="realName" class="form-control" v-model="signup.realName" placeholder="이름을 입력해주세요.">
                </div>
                <div class="form-group" v-show="isUserType" >
                  <label for="nickname">닉네임</label>
                  <input type="text" id="nickname" class="form-control" v-model="signup.nickname" placeholder="닉네임을 입력하세요.">
                </div>
                <div class="form-group">
                  <label for="username">아이디</label>
                  <input type="text" id="username" class="form-control" v-model="signup.username" placeholder="아이디를 입력하세요.">
                </div>
                <div class="form-group">
                  <label for="password">비밀번호</label>
                  <input type="password" id="password" class="form-control" v-model="signup.password" placeholder="비밀번호를 입력하세요.">
                </div>
                <div class="form-group">
                  <label for="password">비밀번호 확인</label>
                  <input type="password" id="password" class="form-control" v-model="signup.password_check" placeholder="비밀번호를 다시 입력해주세요.">
                </div>
                <div class="form-group">
                  <label for="phone">핸드폰번호</label>
                  <input type="text" id="phone" class="form-control" v-model="signup.phone" placeholder="핸드폰 번호를 입력하세요.">
                </div>
                <hr/>
                <div class="form-group" v-if="!isUserType">
                  <label for="price_per">회당 비용</label>
                  <input type="text" id="price_per" class="form-control" v-model="signup.price_per" placeholder="회당 비용을 입력해주세요.">
                </div>
                <div class="form-group" v-if="!isUserType">
                  <label for="gym">소속 헬스장</label>
                  <div class="row" style="    place-content: center;">
                  <input type="text" id="gym" class="form-control col-9" v-model="search.name" placeholder="상호명을 입력해주세요.">
<!--                  <input type="text" id="gym_code" class="form-control col-9" v-model="signup.gym_code" style="display:none" placeholder="상호명을 입력해주세요.">-->
<!--                  <br/><v-ons-search-input placeholder="Search something" v-model="query"></v-ons-search-input>-->
                  <v-ons-button icon="md-zoom-in" modifier="outline" class="col-2" style="height:2.3rem;text-align-last: center;font-size:1.8rem" @click="serachEvent" ></v-ons-button>
                  </div>
                  <v-ons-list>
                    <v-ons-list-item>
                      <div class="center">

                          <v-ons-select v-if="search.gymList !== undefined" v-model="signup.gym_code">
                          <option v-for="(gym, index) in search.gymList" :key="gym" :value="gym._id" :selected="index === 0">
                            {{ gym.gymName + " (" + gym.address + ")" }}
                            <!--                            {{ item.text }}-->
                          </option>
                        </v-ons-select>

                      </div>
                    </v-ons-list-item>
                  </v-ons-list>
                </div>
                <hr/>
                <div class="form-group">
                  <button type="button" class="btn btn-primary" @click="signupEvent">회원가입</button>
                    <a ref="pw_watch" style="float:right;padding-top: 0.4rem;color: black;text-underline: none"></a>
                </div>
              </div>
            </div>
            </div>
        </ons-card-content>
      </ons-card>
  </div>
</template>

<script>
import $ons from "vue-onsenui";
import {Dagym} from "@/api/dagym";
import {Account} from "@/api/account";

export default {
  name: "SignupView",
  data() {
    return {
      signup: {
        username: "",
        nickname: "",
        password: "",
        password_check: "",
        realName: "",
        phone: "",
        type: "",
        price_per: "",
        gym_code: ""
      },

      search: {
        name: "",
        gymList: []
      }
    };
  },
  watch: {
    'signup.password_check': function() {
      if (this.signup.password !== this.signup.password_check) {
        this.$refs.pw_watch.innerHTML = "비밀번호를 다시 입력해주세요.";
      } else {
        this.$refs.pw_watch.innerHTML = "";
      }
    }
  },
  methods:{
    signupEvent() {
      if (this.signup.realName == null){
        $ons.notification.alert("이름을 입력해주세요.");
        return false;
      }

      if (this.signup.username == null){
        $ons.notification.alert("아이디를 입력해주세요.");
        return false;
      }

      if (this.signup.password !== this.signup.password_check) {
        $ons.notification.alert("비밀번호가 일치하지 않습니다.");
        return false;
      }

      if (!this.isUserType && this.signup.gym_code == null){
        $ons.notification.alert("소속 헬스장을 선택해주세요.");
        return false;
      }

      if (this.isUserType && this.signup.nickname == null){
        $ons.notification.alert("닉네임을 입력해주세요.");
        return false;
      }

      if (this.signup.phone == null){
        $ons.notification.alert("핸드폰 번호를 입력해주세요.");
        return false;
      }

      if (this.isUserType){
        // 사용자 가입
        Account.makeUserAccount(this.signup).then(res => {
          console.log(res);
          if (res.status === 201) {
            $ons.notification.alert("가입이 완료되었습니다.");
            this.$router.push("/login");
          } else {
            if (res.data['detail'] == null)
              $ons.notification.alert("가입에 실패하였습니다.");
            else
              $ons.notification.alert(res.data['detail']);
          }
        });
      } else {
        // 트레이너 가입
        Account.makeTrainerAccount(this.signup).then(res => {
          if (res.status === 201) {
            $ons.notification.alert("가입이 완료되었습니다.");
            this.$router.push("/login");
          } else {
            if (res.data['detail'] == null)
              $ons.notification.alert("가입에 실패하였습니다.");
            else
              $ons.notification.alert(res.data['detail']);
          }
        });
      }
    },
    serachEvent() {
      Dagym.fetchGymListByName(this.search.name).then(res => {
        if (res.data == null || res.data['code'] !== 0 || res.data['result'] == null){
          $ons.notification.alert("해당 상호명을 가진 헬스장이 없습니다.");
          return ;
        }
        this.search.gymList = res.data['result'];
      });
    }
  },
  computed: {
    isUserType() {
      return (this.signup.type === "user");
    }
  }
}
</script>

<style scoped>

</style>