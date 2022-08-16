<template>
  <v-ons-pages>
    <TopBar></TopBar>
    <div class="content">
      상단바와 하단바가 필요한 뷰 템플릿 예시
    </div>
    <BottomBar></BottomBar>
  </v-ons-pages>
</template>

<script>
import TopBar from "@/components/common/TopBar";
import BottomBar from "@/components/common/BottomBar";

export default {
  name: "MainView",
  components: {
    TopBar,
    BottomBar,
  },
  props: {}
}
</script>

<style scoped>

</style>