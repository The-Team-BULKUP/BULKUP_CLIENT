<template>


  <v-ons-list style="padding-top: 0.8rem">
    <v-ons-list-item>
      <div class="board">
        <div class="title">
          신발 질문~
          <a class="info">3분전, 헬스맨님</a>
        </div>
        <div class="preview">
        헬스할 때 신기 좋은 신발 추천 부탁이요
      </div>
      </div>
    </v-ons-list-item>
  </v-ons-list>


  <v-ons-fab
      class="btn-float"
      position="bottom right">
<!--      :visible="fabVisible">-->
<!--    todo: edit fabVisible to account is not null-->

    <router-link to="/community/write">
    <v-ons-icon style="color:black;" icon="fa-pencil"></v-ons-icon>
    </router-link>
  </v-ons-fab>
</template>

<script>

export default {
  name: "MainView",
  components : {

  },
  props: {
  }
}
</script>

<style scoped>

.board {
  padding-left: 0.8rem;
}

.board .title{
  font-size: 1.3rem;
}

.board .title .info{
  font-size: 0.866rem;
  color: #999;
  vertical-align: text-bottom;
}

.board .preview{
  margin-top: 0.5rem;
  margin-left: 1.35rem;
}

.btn-float {
  margin-bottom: 4.5rem;
  background-color: rgb(250,250,250);
  color: black;
}


</style>