<template>
  <button 
    class="absolute bottom-1 bg-slate-900 h-6 w-6 sm:h-8 sm:w-8 text-indigo-50 flex justify-center items-center rounded-full text-sm md:text-xl shadow-lg"
    :class="direction === 'left' ? 'left-1' : 'right-1' "
  >
    <fa-icon :icon="getIconName" />
  </button>
</template>

<script>
export default {
  props: {
    direction: String
  },
  computed: {
    getIconName: function() {
      return `angle-${this.direction}`;
    }
  }
}
</script>

