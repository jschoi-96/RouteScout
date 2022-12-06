<template>
  <div class="relative group">
    <OrderMarker :orderNumber="orderNumber" />
    <PhotoCounter :index="this.i" :max="urls.length" class="opacity-0 group-hover:opacity-70 duration-100" />
    <img 
      :src="urls.length === 0 ? require('../assets/windowsXpBackground.png') : urls[this.i]" 
      :alt="altString" 
      class="rounded-l-xl object-cover shadow-md w-full h-44"
    >
    <ArrowButton direction="left" @click.native="prevImage" v-if="urls.length !== 0" class="opacity-0 group-hover:opacity-70 duration-100" />
    <ArrowButton direction="right" @click.native="nextImage" v-if="urls.length !== 0" class="opacity-0 group-hover:opacity-70 duration-100" />
  </div>
</template>

<script>
import ArrowButton from "./ArrowButton.vue";
import OrderMarker from "./OrderMarker.vue";
import PhotoCounter from "./PhotoCounter.vue";

export default {
    props: {
        orderNumber: Number,
        urls: Array,
        alt: String
    },
    data: function () {
        return {
            i: 0
        };
    },
    methods: {
        nextImage: function () {
            if (this.i < this.urls.length - 1) {
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
                this.i = this.urls.length - 1;
            }
        }
    },
    computed: {
        altString: function () {
            return `A picture of ${this.alt}`;
        }
    },
    components: {
    ArrowButton,
    OrderMarker,
    PhotoCounter
}
}
</script>

<style>

</style>