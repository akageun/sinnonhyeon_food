<template>
  <div>
    <br>
    <h2>신논현역 맛집</h2>
    <br>
    <Store_list/>
  </div>
</template>

<script>
  import Store_list from "./Store_list";
  export default {
    name: 'Welcome',
    components: {Store_list},
    data() {
      return {
        msg: '신논현 맛집 리스트'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
