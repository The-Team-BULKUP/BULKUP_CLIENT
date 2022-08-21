<template>
  <div class="padding-content">
    <div class="mypage">
      <img class="account-icon" src="@/assets/img/icon-member.png" alt="mypage"/>
      <div style="padding: 0 1rem 3rem; display: inline-table;">
        <div class="hello-text">{{this.Auth.getters.realName}} 님</div> 안녕하세요.
      </div>
      <div class="menu">
      <div class="title">&lt; 나의 활동 ></div>
      <div class="sub">회원 정보 수정</div>
      <div class="sub">크루 수정</div>
        <div class="title">&lt; 기타 ></div>
      <div class="sub">트레이너 등록</div>
      </div>
    </div>
  </div>
</template>

<script>
// import TopBar from "@/components/common/TopBar";
// import BottomBar from "@/components/common/BottomBar";

export default {
  name: "MainView",
  components : {
    // TopBar,
    // BottomBar,
  },
  props: {
    nickname: {
      type: String,
      default: "운동조아",
    },
  }
}
</SCRIPT>

<style scoped>
.mypage{
  padding-top: 2rem;
}

.account-icon{
  width: 6rem;
  height: 6rem;
}

.mypage .menu .title{
  text-align: left;
  padding-left: 5rem;
  padding-bottom: 1rem;
}

.mypage .menu .sub{
  text-align: left;
  padding-left: 7rem;
  padding-bottom: 0.8rem;
}


.hello-text{
  align-self: end;
  font-size: 1.3rem;
  color: #000000;
  vertical-align: bottom;
}


</style>