<template>
  <div class="page__content" style="top: 4.1rem !important; padding-top: 0; bottom: 5.3rem !important;">
    <ons-card>
      <ons-card-content>
        <div class="title" style="font-size: 1.3rem; width:fit-content; margin:auto"> &lt; 회원 정보 변경 &gt;</div>
        <div class="card-content">
          <div class="card-content-inner">
            <hr/>
            <div class="form-group">
              <label for="nickname">닉네임</label>
              <input type="text" id="nickname" @change="this.edited.nickname = true" v-model="this.account.nickname" class="form-control">
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input type="password" id="password" @change="this.edited.password = true" class="form-control" value="비밀번호를 입력하세요.">
            </div>
            <div class="form-group">
              <label for="password">비밀번호 확인</label>
              <input type="password" id="password" class="form-control" value="비밀번호를 다시 입력해주세요.">
            </div>
            <div class="form-group">
              <label for="phone">핸드폰 번호</label>
              <input type="text" id="phone" class="form-control" v-model="this.account.phone">
            </div>
            <div class="form-group" >
              <hr/>
              <div><label for="introduce">자기소개</label></div>
              <textarea  id="introduce" class="textarea" @change="this.edited.introduce = true" style="width:100%" v-model="this.account.introduce" rows="2"  required></textarea>
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-primary" @click="editEvent" style="margin:auto; display:block">수정 하기</button>
            </div>
          </div>
        </div>
      </ons-card-content>
    </ons-card>
  </div>
</template>

<script>
import {Account} from "@/api/account";

export default {
  name: "EditMyInfoView",
  data(){
    return {
      account : {
        password : "",
        nickname : "",
        introduce: "",
      },
      edited : {
        nickname: false,
        password: false,
        introduce: false,
      },
    }
  },
  mounted() {
    Account.fetchMyInfo().then((res) => {
      if (res.status === 200)
        this.account = res.data;
    });
  },
  methods:{
    editEvent() {

    }
  }
}
</script>

<style scoped>
.form-group{
  padding-top: 0.8rem;
}
</style>