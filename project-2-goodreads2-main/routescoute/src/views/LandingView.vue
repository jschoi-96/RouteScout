<template>
  <div class="font-nice text-indigo-300 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-28 py-6 px-2 sm:px-36 space-y-10">
    <h1 class="text-4xl sm:text-5xl md:text-7xl leading-snug max-w-xl mx-auto">
      Plan your next great adventure with <span class="font-big">RouteScout</span>
    </h1>
    <h3 class="text-2xl sm:text-3xl md:text-5xl leading-snug max-w-xl mx-auto">
      Simply the best roadtrip app out there
    </h3>
    <EarthSpinner />
  </div>
</template>

<script>
import EarthSpinner from '../components/EarthSpinner.vue'
export default {
  components: {
    EarthSpinner
  }
}
</script>

<style>

</style>