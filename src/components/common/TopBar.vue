<template id="top-bar">
  <v-ons-toolbar>

<!--        <div class="toolbar">-->
      <router-link to="/" class="toolbar-title"> 피티모아 </router-link>
      <img class="toolbar-icon" src="../../assets/img/simple-logo.png" alt="logo">
<!--        <div class="right">-->
      <button class="btn-moa toolbar-btn">크루<br/>찾기</button>
      <button class="btn-moa toolbar-btn">트레이너<br/>찾기</button>
<!--        </div>-->
    <div class="right">
<!--          <v-ons-toolbar-button icon="ion-ios-menu, material: md-menu"></v-ons-toolbar-button>-->
<!--          <v-ons-toolbar-button>www</v-ons-toolbar-button>-->
    </div>
  </v-ons-toolbar>

  <p style="text-align: center">
    asd
  </p>
</template>

<script>
export default {
  name: "TopBar",
}
</script>

<style scoped>

.toolbar {
  height: 5.3rem;
  padding-left: 0.8rem;
}

.toolbar-title{
  color: black;
  text-decoration: none;
  font-family: 'Jeju Gothic',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 35px;
  padding-left: 15px;
  align-self: center;
  padding-right: 15px;
  font-family: Jeju Gothic,sans-serif;
}

.toolbar-icon{
  align-self: center;
  height: 2.4rem;
  width: 2.4rem;
  transform: scaleX(-1);
  margin-bottom: 1rem;
}

.toolbar-btn{
  /*height: min-content;*/
  align-self: center;
  padding: 0.5rem 0.5rem;
  margin-left: 1rem;
  font-style: normal;
  font-weight: 400;
  font-family: 'Jeju Gothic',sans-serif;
}

</style>