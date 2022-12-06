<template>
  <div class="bg-slate-900 h-6 w-6 sm:h-8 sm:w-8 opacity-70 text-indigo-50 flex justify-center items-center rounded-full text-sm sm:text-xl shadow-lg absolute top-1 left-1 font-nice select-none">
    {{ orderNumber }}
  </div>
</template>

<script>
export default {
  props: {
    orderNumber: Number
  }
}
</script>

<style>

</style>