<template>
  <div class="rounded-xl shadow-md relative group font-nice">
    <PhotoCounter :index="this.i" :max="photos.length" :isBigCarousel="true" class="opacity-0 group-hover:opacity-70 duration-100" />
    <img 
      :src="photos.length === 0 ? require('../assets/windowsXpBackground.png') : photos[this.i]" 
      alt="Destination Photo" 
      class=" rounded-xl object-cover shadow-md w-full h-96"
    >
    <ArrowButton direction="left" @click.native="prevImage" v-if="this.photos.length !== 0" class="opacity-0 group-hover:opacity-70 duration-100" />
    <ArrowButton direction="right" @click.native="nextImage" v-if="this.photos.length !== 0" class="opacity-0 group-hover:opacity-70 duration-100" />
  </div>
</template>

<script>
import ArrowButton from "./ArrowButton.vue";
import PhotoCounter from "./PhotoCounter.vue";

export default {
  props: {
    photos: []
  },
  components: {
    ArrowButton,
    PhotoCounter
  },
  data: function() {
    return {
      i: 0
    }
  },
  methods: {
    nextImage: function () {
      console.log(this.photos)
      if (this.i < this.photos.length - 1) {
        this.i++;
      }
      else {
        this.i = 0;
      }
    },
    prevImage: function () {
      if (this.i > 0) {
        this.i--;
      }
      else {
        this.i = this.photos.length - 1;
      }
    }
  },
}
</script>
