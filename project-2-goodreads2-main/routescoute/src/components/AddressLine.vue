<template>
  <span class="truncate">
    <fa-icon icon="location-dot" /> {{ address }}
  </span>  
</template>

<script>
export default {
  props: {
    address: String
  }
}
</script>
