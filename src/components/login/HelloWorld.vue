<template id="top">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{ title }}</div>
      <div class="right">
        <v-ons-toolbar-button icon="ion-ios-menu, material: md-menu"></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <p style="text-align: center">
      Some content.
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