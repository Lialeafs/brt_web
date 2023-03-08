<template>
    <div class="test">
      <div>
        <p>hello</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import axios from "../http";

    // axios.get('/login')
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });


    axios.post('/login', {
        massage : "submit!!!"
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  