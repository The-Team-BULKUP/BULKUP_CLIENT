<template id="main-page">

  <v-ons-page>
<!--    <v-ons-toolbar></v-ons-toolbar>-->
<!--    <v-ons-tabbar id="tabbar" position="bottom">-->
<!--      <v-ons-tab label="Home" icon="md-home" page="home-page"></v-ons-tab>-->
<!--      <v-ons-tab label="Profile" icon="md-person" page="profile-page"></v-ons-tab>-->
<!--      <v-ons-tab label="Messages" icon="md-chatboxes" page="messages-page"></v-ons-tab>-->
<!--  </v-ons-tabbar>-->
    <div class="main-margin">
      <span class="main-title">
      피티 모아
      </span><br/>
      <img class="main-logo justify-content-xl-center" src="../../assets/img/main-logo.png" alt="logo">
      <br/>
      <div class="justify-content-md-center">
      이미 회원이신가요?s
      </div>
    </div>

    <p style="text-align: center">
      <v-ons-button @click="$ons.notification.alert('Hello World!')">
        Click me!
      </v-ons-button>
    </p>


  </v-ons-page>
</template>

<style>

.main-margin {
  margin-top: 6%;
}

.main-title {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: JejuGothic;
  font-weight: Regular;
  font-size: 60px;
  opacity: 1;
  text-align: center;
}

.main-logo {
  width: 20%;
  max-width: 250px;
  min-width: 150px;
  height: 20%;
  max-height: 250px;
  min-height: 150px;
}

.main-message {
  text-align: left;
  font-size: 20px;
  font-family: JejuGothic;
  font-weight: Regular;
  opacity: 1;
}
</style>

<script>
// Javascript goes here
</script>