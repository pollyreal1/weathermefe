<template>
  <div class="row">
    <div class="col-md-12">
      <router-link to="/" class="mx-4">Map</router-link>
      <router-link to="/searches" class="mx-4">Searches</router-link>
    </div>
  </div>
  
  <router-view />
</template>

<script>
// import LandingPage from "./components/Index.vue";

export default {
  name: "App",
  // components: {
  //   LandingPage,
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
