<template>
  <div class="page__content" style="top: 4.1rem !important; padding-top: 0; bottom: 5.3rem !important;">
    <ons-card>
      <ons-card-content>
        <div class="title" style="font-size: 1.3rem; width:fit-content; margin:auto"> &lt; 회원 정보 변경 &gt;</div>
        <div class="card-content">
          <div class="card-content-inner">
            <div class="form-group">
              <hr/>
              <label for="realName">실명</label>
              <input type="text" id="realName" class="form-control" value="김나영">
            </div>
            <div class="form-group">
              <label for="nickname">닉네임</label>
              <input type="text" id="nickname" class="form-control" value="헬린이">
            </div>
            <div class="form-group">
              <label for="username">아이디</label>
              <input type="text" id="username" class="form-control" value="hello123">
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input type="password" id="password" class="form-control" value="비밀번호를 입력하세요.">
            </div>
            <div class="form-group">
              <label for="password">비밀번호 확인</label>
              <input type="password" id="password" class="form-control" value="비밀번호를 다시 입력해주세요.">
            </div>
            <div class="form-group">
              <label for="phone">핸드폰번호</label>
              <input type="text" id="phone" class="form-control" value="010-1234-5678">
            </div>
            <div class="form-group" >
              <hr/>
              <div><label for="introduce">자기소개</label></div>
              <textarea  id="introduce" class="textarea" style="width:100%" rows="2" value="헬스 처음하는 헬린이입니다!!" required></textarea>
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

export default {
  name: "EditUserInfoView",

}
</script>

<style scoped>
.form-group{
  padding-top: 0.8rem;
}
</style>