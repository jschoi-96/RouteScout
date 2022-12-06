<template>
  <div class="absolute top-0 right-0 bg-slate-900 text-sm sm:text-base text-indigo-50 px-2 rounded-bl-xl" :class="isBigCarousel ? 'rounded-tr-xl' : ''">
    {{ `${index + 1}/${max === 0 ? 1 : max}` }}
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    max: Number,
    isBigCarousel: Boolean
  }
}
</script>

<style>

</style>