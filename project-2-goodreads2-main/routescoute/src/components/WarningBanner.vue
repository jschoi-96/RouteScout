<template>
  <div class="font-nice bg-amber-300 text-amber-600 py-1 px-2 rounded flex justify-between items-center shadow-lg cursor-pointer">
    <span>{{ message }}</span><fa-icon icon="xmark" class="w-4 h-4 p-1 rounded-full hover:bg-amber-400 duration-75" />
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    show: Boolean
  },
  methods: {
    toggleShow: function() {

    }
  }
}
</script>

