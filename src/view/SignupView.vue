<template>
  <!-- Login Template -->
  <div class="page__content" style="top: 4.1rem !important; padding-top: 0; bottom: 5.3rem !important;">
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
                <div class="form-group" v-if="!isUserType">
                  <hr/>
                  <label for="formFile" class="form-label">신분증 확인</label>
                  <input class="form-control" type="file" id="formFile" @change="idFileChange">
                  <div class="small" style="padding: 0.3rem 1rem">
                    1. 신분증을 꺼내 개인 정보를 가립니다.<br/>
                    2. 신분증을 근접 촬영합니다.<br/>
                    3. 이름, 생년월일, 사진 식별 가능여부를 확인합니다.<br/>
                    4. 업로드를 합니다.
                  </div>
                </div>
                <div class="form-group" v-if="!isUserType">
                  <label for="formFile" class="form-label">경력증명서 확인</label>
                    <input class="form-control" type="file" id="formFile" @change="careerFileChange">
                </div>
                <div class="form-group" v-if="!isUserType">
                  <label for="formFile" class="form-label">프로필 사진</label>
                  <input class="form-control" type="file" id="formFile" @change="profileFileChange">
                </div>
<!--                  <input type="text" id="price_per" class="form-control" v-model="signup.price_per" placeholder="회당 비용을 입력해주세요.">-->
                <div class="form-group" v-if="!isUserType">
                  <hr/>
                  <label for="price_per">회당 비용</label>
                  <input type="text" id="price_per" class="form-control" v-model="signup.pricePer" placeholder="회당 비용을 입력해주세요.">
                </div>
                <div class="form-group" v-if="!isUserType" style=" margin-top:1rem">
                  <label for="gym">소속 헬스장</label>
                  <div style="display:flex;">
                  <input type="text" id="gym" class="form-control col-9" style="width:83% !important;" v-model="search.name" placeholder="상호명을 입력해주세요.">
<!--                  <input type="text" id="gym_code" class="form-control col-9" v-model="signup.gym_code" style="display:none" placeholder="상호명을 입력해주세요.">-->
<!--                  <br/><v-ons-search-input placeholder="Search something" v-model="query"></v-ons-search-input>-->
                  <v-ons-button icon="md-zoom-in" modifier="outline" class="col-2" style="height:2.3rem;text-align-last: center;font-size:1.8rem;" @click="serachEvent" ></v-ons-button>
                  </div>
                  <div class="form-group">
                    <v-ons-list>
                      <v-ons-list-item>
                        <div class="center">

                          <v-ons-select v-if="search.gymList !== undefined" v-model="signup.gymCode">
                            <option v-for="(gym, index) in search.gymList" :key="gym" :value="gym._id" :selected="index == 0">
                              {{ gym.gymName + " (" + gym.address + ")" }}
                              <!--                            {{ item.text }}-->
                            </option>
                          </v-ons-select>

                        </div>
                      </v-ons-list-item>
                    </v-ons-list>
                  </div>
                </div>
                <div class="form-group" >
                  <hr/>
                  <div><label for="introduce">자기소개</label></div>
                <textarea  id="introduce" class="textarea" style="width:100%" rows="2" placeholder="간단히 본인을 소개해주세요!" v-model="signup.introduce" required></textarea>
                  </div>
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
        password: "Test1234!!",
        password_check: "Test1234!!",
        realName: "",
        phone: "",
        type: "",
        pricePer: "",
        gymCode: "",
        profileImg: undefined,
        idCardImg: undefined,
        careerProofImg: undefined,
        gymLat : Number,
        gymLng : Number,
        introduce : "열심히하겠읍니다",
        gymName : "",
        gymPhotoSmall : "",
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
    },
    'signup.gymCode': function() {
      if (this.signup.gymCode !== "") {
        this.search.gymList.map(gym => {
          if (gym._id === this.signup.gymCode) {
            this.signup.gymLat = gym.latitude;
            this.signup.gymLng = gym.longitude;
            this.signup.gymName = gym.gymName;
            this.signup.gymPhotoSmall = gym.gymPhotoSmall;
          }
        });
      }
    }
  },
  methods:{
    profileFileChange(e) {
      let file = e.target.files[0];
      let name = file.name;
      this.file_name = file.name;
      this.file = file;
      if(name.endsWith('.jpg') || name.endsWith('.jpeg') ||
          name.endsWith('.png')){
        this.img_src = URL.createObjectURL(file);
        this.signup.profileImg = file;
      }
      else {
        $ons.notification.alert("이미지 파일만 업로드 가능합니다.");
        this.img_src = "";
        this.file = "";
      }
    },
    idFileChange(e) {
      let file = e.target.files[0];
      let name = file.name;
      this.file_name = file.name;
      this.file = file;
      if(name.endsWith('.jpg') || name.endsWith('.jpeg') ||
          name.endsWith('.png')){
        this.img_src = URL.createObjectURL(file);
        this.signup.idCardImg = file;
      }
      else {
        $ons.notification.alert("이미지 파일만 업로드 가능합니다.");
        this.img_src = "";
        this.file = "";
      }
    },
    careerFileChange(e){
      let file = e.target.files[0];
      let name = file.name;
      this.file_name = file.name;
      this.file = file;
      if(name.endsWith('.jpg') || name.endsWith('.jpeg') ||
          name.endsWith('.png')){
        this.img_src = URL.createObjectURL(file);
        this.signup.careerProofImg = file;
      }
      else {
        $ons.notification.alert("이미지 파일만 업로드 가능합니다.");
        this.img_src = "";
        this.file = "";
      }
    },
    signupEvent() {


      if (this.isUserType){
        // 사용자 가입
        Account.makeUserAccount(this.signup).then(res => {
          console.log(res);
          if (res.status === 201) {
            $ons.notification.alert("가입이 완료되었습니다.");
            this.$router.push("/login");
          }
        });
      } else {
        // 트레이너 가입
        Account.makeTrainerAccount(this.signup).then(res => {
          if (res.status === 201) {
            $ons.notification.alert("가입이 완료되었습니다. 승인까지 영업일 기준 약 1~2일 소요됩니다.");
            this.$router.push("/login");
          }
        });
        //     .catch(err => {
        //   if (err.response.data.fieldErrors == null)
        //     $ons.notification.alert(err.response.data.message);
        //   else
        //     $ons.notification.alert(err.response.data.fieldErrors[0].defaultMessage);
        // });
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
    },
    uploadedFile(){
      return !(this.signup.careerProofImg === undefined || this.signup.profileImg === undefined || this.signup.idCardImg === undefined);
    }
  }
}
</script>

<style scoped>

.form-group{
  padding-top: 0.8rem;
}

</style>