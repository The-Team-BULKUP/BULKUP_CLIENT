<template id="top-bar">
  <v-ons-toolbar class="toolbar backcolor-0">

<!--        <div class="toolbar">-->
      <router-link to="/" class="toolbar-title">
      <img class="toolbar-icon" src="../../assets/img/logo.png" alt="logo">
      </router-link>
<!--        <div class="right">-->

    <div class="right">
      <v-ons-toolbar-button @click="toggleSideMenu">
        <v-ons-icon class="toolbar-menu" icon="ion-ios-menu, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button>
    </div>
<!--      <button class="btn-moa toolbar-btn backcolor-1">크루<br/>찾기</button>-->
<!--      <button class="btn-moa toolbar-btn backcolor-1">트레이너<br/>찾기</button>-->
<!--        </div>-->

<!--          <v-ons-toolbar-button icon="ion-ios-menu, material: md-menu"></v-ons-toolbar-button>-->
<!--          <v-ons-toolbar-button>www</v-ons-toolbar-button>-->

  </v-ons-toolbar>
</template>

<script>
export default {
  name: "TopBar",
  props:{
    openSide: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    toggleSideMenu() {
      console.log("toggleSideMenu");
      this.$emit('toggle');
    }
  }
}
</script>

<style scoped>

.toolbar{
  height: 4rem;
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
}

.toolbar-icon{
  align-self: center;
  height: 2rem;
  width: 10.6rem;
  margin-right: 1.89rem;
  /* todo: place right */

  /*transform: scaleX(-1);*/

}

.toolbar-btn{
  /*height: min-content;*/
  align-self: center;
  padding: 0.5rem 0.5rem;
  margin-right: 1rem;
  font-style: normal;
  font-size: 0.8rem;
  font-family: 'Jeju Gothic',sans-serif;
}

.toolbar-menu{
  padding-top: 0.45rem;
  color:black;
  background-color: transparent;
  font-size: 3rem !important;
  /*margin-right: 1rem;*/
  box-sizing: border-box;
  border: none;
  text-align: right;
}


</style>