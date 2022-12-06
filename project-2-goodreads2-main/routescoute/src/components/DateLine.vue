<template>
  <span class="truncate">
    <fa-icon icon="calendar-day" /> {{ new Date(dateString).toDateString() }}
  </span>
</template>

<script>
export default {
  props: {
    dateString: String
  }
}
</script>
