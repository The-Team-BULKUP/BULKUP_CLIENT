<template id="bottom-bar">
  <ons-bottom-toolbar class="bottom-bar backcolor-0" @click="toggleSideMenu">
      <router-link to="/calendar" class="bottom-bar-item">
        <img :class="[getCurrentPage === 'calendar' ? 'bottom-bar-icon-clicked' : 'bottom-bar-icon']" src="../../assets/img/icon-cal.png" alt="logo"/><br/>
        <div class="bottom-bar-label">캘린더</div>

      </router-link>

    <router-link to="/community" class="bottom-bar-item">
      <img :class="[getCurrentPage === 'community' ? 'bottom-bar-icon-clicked' : 'bottom-bar-icon']" src="../../assets/img/icon-commu.png" alt="logo"/><br/>
      <div class="bottom-bar-label">게시판</div>
    </router-link>

      <router-link to="/home" class="bottom-bar-item">
        <img :class="[getCurrentPage === 'home' ? 'bottom-bar-icon-clicked' : 'bottom-bar-icon']" src="../../assets/img/icon-home.png" alt="logo"/><br/>
        <div class="bottom-bar-label">홈</div>
      </router-link>

      <router-link to="/chat" class="bottom-bar-item">
        <img :class="[getCurrentPage === 'chat' ? 'bottom-bar-icon-clicked' : 'bottom-bar-icon']" src="../../assets/img/icon-chat.png" alt="logo"/><br/>
        <div class="bottom-bar-label">채팅</div>
      </router-link>

      <router-link to="/mypage" class="bottom-bar-item">
<!--        <img class="bottom-bar-icon" src="../../assets/img/icon-mypage.png" alt="logo"/><br/>-->
        <img :class="[getCurrentPage === 'mypage' ?'bottom-bar-icon-clicked' : 'bottom-bar-icon']" src="../../assets/img/icon-mypage.png" alt="logo"/><br/>
        <div class="bottom-bar-label">내정보</div>
      </router-link>

  </ons-bottom-toolbar>
</template>

<script>
export default {
  name: "BottomBar",
  props: {
    title: {
      type: String,
      default: "피티 모아"
    },
    currentPage: {
      type: String,
      default: "home"
    }
  },
  computed: {
    getCurrentPage: function () {
      const lowerCasePage = this.currentPage.toLowerCase();
      if (lowerCasePage === "")
        return "home";
      else if (lowerCasePage.indexOf("home") !== -1)
        return "home";
      else if (lowerCasePage.indexOf("community") !== -1)
        return "community"
      else if (lowerCasePage.indexOf("chat") !== -1)
        return "chat"
      else if (lowerCasePage.indexOf("mypage") !== -1)
        return "mypage"
      else if (lowerCasePage.indexOf("calendar") !== -1)
        return "calendar"
      else
        return "home";
    },
  },
  methods: {
    toggleSideMenu() {
      this.$emit('offSide');
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 4.3rem;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 0.8rem 0.5rem 0.5rem;
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
  height: 1.8rem;
  width: 1.8rem;
  text-decoration : none;
}

.bottom-bar-icon-clicked{
  height: 1.8rem;
  width: 1.8rem;
  text-decoration : none;
  filter: invert(48%) sepia(19%) saturate(6609%) hue-rotate(214deg) brightness(100%) contrast(97%);
}

.bottom-bar-label{
  color : black;
  font-size: 0.7rem;
  margin-top: 0.2rem;
  font-style: normal;
  font-weight: 400;
  text-decoration : none;
}

</style>