<template>
  <h1 class="text-3xl sm:text-4xl md:text-5xl py-3 bg-slate-600 rounded-xl mb-4 font-nice font-bold">{{ heading }}</h1>
</template>

<script>
export default {
  props: {
    heading: String
  }
}
</script>
