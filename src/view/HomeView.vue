<template>
  <div class="padding-content">
    <div v-if="this.Auth.getters.isLogin === false">
      로그인 후 피티모아의 모든 서비스를 이용해 보세요!<br/>
      <router-link to="/signup">
        <a style="padding-top: 0.4rem;color: black;text-underline: none">로그인 / 회원가입 하러 가기</a>
      </router-link>
    </div>
    홈홈홈
  </div>
</template>

<script>
export default {
  name: "HomeView.vue"
}
</script>

<style scoped>

</style>