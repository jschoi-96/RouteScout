<template>
  <div id="app" class="font-big">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import { auth } from "./firebaseConfig";
import NavBar from "./components/NavBar.vue";

export default {
    components: { NavBar },
    beforeCreate: function() {
      auth.getRedirectResult()
        .then(result => {
          if (result.user) {
            this.$router.push('trips');
          }
        })
        .catch((err) => {
          console.log('redirect results did not resolve');
          console.log(`err: ${err}`);
        })
    }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
