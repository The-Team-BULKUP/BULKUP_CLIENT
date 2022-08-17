<template>
    <SplashScreen v-if="isLoading"></SplashScreen>
    <router-view v-if="!isLoading"></router-view>
<!--  </v-ons-pages>-->
</template>

<script>

import SplashScreen from "@/components/common/SplashScreen";

export default {
  name: 'App',
  components: {
    SplashScreen
  },
  data () {
    return {
      isLoading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
