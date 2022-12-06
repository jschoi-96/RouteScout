<template>
  <div class="bg-slate-900/50 rounded-3xl p-2 py-3 shadow-md">
    <div class="flex items-center">
      <div class="w-8 h-8 flex items-center justify-center shadow-md bg-slate-900 text-indigo-300 rounded-full">{{ order }}</div>
      <h3 class="text-2xl text-slate-900 ml-2">{{ name }}</h3>
    </div>
    <p class="ml-4 text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati at expedita eligendi quos rerum voluptatem nesciunt optio vero nisi mollitia.</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    order: Number
  }
}
</script>

