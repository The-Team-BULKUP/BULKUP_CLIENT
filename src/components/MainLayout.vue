<template>
  <v-ons-pages>
    <TopBar></TopBar>
    <div class="content">
<!--      todo: 로그인 안했을때 로그인/회원가입 권장 컨텐츠 띄우게 -hun-->
      <router-view></router-view>
    </div>
    <BottomBar></BottomBar>
  </v-ons-pages>
</template>

<script>
import TopBar from "@/components/common/TopBar";
import BottomBar from "@/components/common/BottomBar";

export default {
  name: "MainView",
  components : {
    TopBar,
    BottomBar,
  },
  props: {
  }
}
</script>

<style scoped>

</style>