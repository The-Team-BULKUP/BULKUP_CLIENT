<template>

  <div class="board">
      <div><input id="title" class="text-input text-input--material" placeholder="제목" type="text" required></div>
      <div> <textarea class="textarea textarea--transparent" rows="3" placeholder="내용을 작성하세요." required></textarea></div>
  </div>

  <section style="margin-left: 3rem; margin-right: 3rem">
    <v-ons-button
        @click="$ons.notification.alert('게시물이 작성되었습니다.')"
        modifier="large" style="background-color: #EEEEEE;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);color:black">완료</v-ons-button>
<!--        @click="$ons.notification.toast('Hi there!', { timeout: 1500, animation: 'fall' })"-->
  </section>


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
  border: black solid 1px;
  margin: 3rem 3rem;
  height: 20rem;
}

.board div {
  padding-top: 0.5rem;
  /*padding-bottom: 0.5rem;*/
}

.board input {
  width:90%;
  padding: 1.5rem;
}

.board textarea {
  width:90%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
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
  margin-bottom: 5.8rem;
  background-color: #EEEEEE;
  color: black;
}


</style>