<template>
  <button 
    class="text-teal-700 bg-teal-300 px-2 py-1 rounded-md shadow whitespace-nowrap hover:bg-teal-500 duration-75 flex items-center"
    :class="isAddingDestination ? 'opacity-50' : '' "
  >
    {{ isAddingDestination ? 'Close ' : 'Add Destination ' }}
    <fa-icon v-if="!isAddingDestination" icon="fa-solid fa-plus-circle" class="ml-1" />
    <fa-icon v-else icon="xmark" class="ml-1" />
  </button>
</template>

<script>
export default {
  props: {
    isAddingDestination: Boolean
  }
}
</script>

<style>

</style>