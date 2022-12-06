<template>
  <div class="max-w-min text-indigo-50 hover:text-indigo-100 px-4 bg-indigo-500 rounded-tl-md rounded-bl-3xl rounded-tr-3xl rounded-br-md shadow-sm hover:rounded-xl duration-200 hover:shadow-md cursor-pointer">
    <router-link :to="{ name: 'destination', params: { id: tripId, destinationId: name, destination: destination } }">
      <span class="text-xl sm:text-2xl md:text-3xl block mb-3 whitespace-nowrap overflow-hidden">
        {{ name }} 
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    tripId: String,
    destination: Object
  },
  
}
</script>
