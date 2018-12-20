<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

  body {
    font-family: 'Nanum Gothic', sans-serif;
    background-color: #f7f8f9;
  }

  a.black-color {
    color: black !important;
  }

  a:hover {
    text-decoration: none;
  }

  .card {
    border: 1px solid rgba(0, 34, 51, 0.1);
    box-shadow: 2px 4px 10px 0 rgba(0, 34, 51, 0.05), 2px 4px 10px 0 rgba(0, 34, 51, 0.05);
    border-radius: 0.15rem;
  }
</style>
