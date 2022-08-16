<template id="bottom-bar">
  <ons-bottom-toolbar class="bottom-bar">
      <router-link to="/calendar" class="bottom-bar-item">
        <img class="bottom-bar-icon" src="../../assets/img/icon-cal.png" alt="logo"/>
        <div class="bottom-bar-label">캘린더</div>

      </router-link>

      <router-link to="/community" class="bottom-bar-item">
        <img class="bottom-bar-icon" src="../../assets/img/icon-commu.png" alt="logo"/><br/>
        <div class="bottom-bar-label">커뮤니티</div>
      </router-link>

      <router-link to="/home" class="bottom-bar-item">
        <img class="bottom-bar-icon" src="../../assets/img/icon-home.png" alt="logo"/><br/>
        <div class="bottom-bar-label">홈</div>
      </router-link>

      <router-link to="/chat" class="bottom-bar-item">
        <img class="bottom-bar-icon" src="../../assets/img/icon-chat.png" alt="logo"/><br/>
        <div class="bottom-bar-label">채팅</div>
      </router-link>

      <router-link to="/mypage" class="bottom-bar-item">
        <img class="bottom-bar-icon" src="../../assets/img/icon-mypage.png" alt="logo"/><br/>
        <div class="bottom-bar-label">마이페이지</div>
      </router-link>

  </ons-bottom-toolbar>
</template>

<script>
export default {
  name: "BottomBar",
  props:{
    title: {
      type: String,
      default: "피티 모아"
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  background-color: #93D8F5;
  height: 6rem;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding-top: 1rem;
  padding-bottom: 0.7rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.bottom-bar-item{
  /*flex-grow: 1;*/
  /*align-self: auto;*/
  display: inline-block;
  /* or */
  float: left;
  text-decoration : none;
}

.bottom-bar-icon{
  height: 2.4rem;
  width: 2.4rem;
  text-decoration : none;
}

.bottom-bar-label{
  color : black;
  font-size: 0.9rem;
  margin-top: 0.2rem;
  font-style: normal;
  font-weight: 400;
  text-decoration : none;
}
</style>