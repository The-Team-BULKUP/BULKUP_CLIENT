<template>
  <div class="padding-content">
    <div class="container">
      <Calendar :rows="2" is-expanded/>
<!--      <DatePicker v-model="date" :mode="mode" is-inline />-->
    </div>
  </div>
</template>

<script>

export default {
  name: "MainView",
  components : {

  },
  data(){
    return{
      // date: new Date(),
      date: null,
      mode: "datetime",
    }
  },
  props: {
  }
}
</script>

<style scoped>

</style>