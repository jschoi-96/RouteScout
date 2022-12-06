%<template>
  <div class="flex flex-col md:flex-row md:justify-between md:items-center font-nice text-left text-md sm:text-xl bg-slate-900 p-3 rounded-2xl max-w-min md:max-w-none md:w-full whitespace-nowrap text-indigo-50">
    <h3 class="font-bold">Trip Stats</h3>
    <p class="whitespace-nowrap">
      <fa-icon icon="car" /> <span class="text-teal-400 font-bold">{{miles}}</span> total miles
    </p>
    <p class="whitespace-nowrap">
      <fa-icon icon="clock" /> <span class="text-teal-400 font-bold">{{hours}}</span> total hours
    </p>
  </div>
</template>

<script>
export default {
  props: {
    miles: Number,
    hours: String
  }
}
</script>

<style>

</style>