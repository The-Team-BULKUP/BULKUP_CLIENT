<template>
  <TopBar title="피티 모아"></TopBar>
  <BottomBar title="피티 모아"></BottomBar>
</template>

<script>
// import HelloWorld from './components/login/HelloWorld.vue'
import TopBar from "@/components/common/Top";
import BottomBar from "@/components/common/BottomBar";

export default {
  name: 'App',
  components: {
    BottomBar,
    TopBar,
  },
  data() {
    return {
      title: 'My app'
    };
  }
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
