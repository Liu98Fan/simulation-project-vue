<template style="background-color:#ccc">
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>  
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  width: 90%;
  margin: 0 auto;

}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
body{background:#f1f1f1; margin: 0; padding: 0; }

</style>
