<template>
    
    <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="col-span-1 min-h-max lg:min-h-screen bg-slate-800 py-3 px-2 sm:p-6 space-y-3 flex flex-col shadow-2xl">
            <div class="flex space-x-3 items-center">
                <BackButton @click.native="goBack" />
                <span class=" truncate text-2xl sm:text-3xl md:text-4xl text-indigo-50 bg-slate-900 w-min whitespace-nowrap rounded-xl py-2 px-6 font-big shadow-sm flex items-baseline">
                    <fa-icon icon="map-pin" class="text-xl sm:text-2xl md:text-3xl mr-2" /> {{ destination.name }}
                </span>
            </div>
            <div class="text-left font-nice flex flex-col p-3 bg-indigo-400 rounded-xl shadow-md space-y-3">
                <h4 class="text-xl sm:text-2xl md:text-3xl font-bold">Details <fa-icon icon="asterisk" /></h4>
                <div class="flex flex-col">
                    <AddressLine :address="destination.address" />
                    <DateLine :dateString="destination.dateArriving" />
                    <p><fa-icon icon="hashtag" /> {{ destination.order }}</p>
                </div>
            </div>

            <!-- Current Weather -->
            <div class="text-left font-nice flex flex-col p-3 bg-indigo-400 rounded-xl shadow-md space-y-3">
                <h4 class="text-xl sm:text-2xl md:text-3xl font-bold">Current Weather <fa-icon icon="sun" /></h4>
                <div v-if="this.weather">
                    <p class="font-bold capitalize text-lg sm:text-xl">{{this.weather.weather[0].description}}</p>
                    <p>Temperature: {{parseInt(this.weather.main.feels_like)}} °F</p>
                    <p>Feels like: {{parseInt(this.weather.main.feels_like)}} °F</p>
                    <p>Humidity: {{this.weather.main.humidity}}</p>
                    <p>Wind Speed: {{this.weather.wind.speed}} mph</p>
                </div>
            </div>

            <BigPhotoCarousel v-if="destination.imageUrls && destination.imageUrls.length > 0" :photos="destination.imageUrls" />
        </div>

        <div class="col-span-1 min-h-screen">
        <GmapMap
          :center='{lat: destination.lat, lng: destination.lng}'
          :zoom='12'
          map-type-id="terrain"
          class="w-full h-full"
        >
            <GmapMarker
                :position="{lat: destination.lat, lng: destination.lng}"
            />
        </GmapMap>
        
      </div>
    </div>
    
</template>

<script>
// import { db } from "@/firebaseConfig";
// import firebase from "firebase/app";
import axios from 'axios';
import AddressLine from "@/components/AddressLine.vue"
import DateLine from "@/components/DateLine.vue";  
import BigPhotoCarousel from "@/components/BigPhotoCarousel.vue";
import router from '@/router';
import BackButton from '../components/BackButton.vue';
export default {
    props: {
        destinationId: String,
        id: String,
        destination: Object
    },
    data: function() {
        return {
            // notes: '',
            // isEditingNotes: false,
            key: process.env.VUE_APP_WEATHER_KEY,
            weather: null
        };
    },
    methods: {
        goBack: function() {
            router.go(-1);
        },
        // toggleIsEditing: function() {
        //     if (this.notes !== '') return;
        //     this.isEditingNotes = !this.isEditingNotes;
        // },
        // saveNotes: function() {
        //     const updatedDestination = {...this.destination};
        //     updatedDestination.notes = this.notes;
            

        //     // COMMENTED OUT THE BROKEN PARTS
        //     // const destRef = db.collection("trips").doc(this.id);
        //     // destRef.update({ destinations: firebase.firestore.FieldValue.arrayUnion(updatedDestination) })

        //     // console.dir(destRef)
        // }
    },
    mounted: function() {
        const { lat, lng } = this.destination;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.key}&units=imperial`)
            .then((response) => {
                if (response.status == 200) {
                    console.dir(response.data);
                    this.weather = response.data;
                } else {
                    console.error(`Error: ${response.statusText}`);
                }
            })
            .catch((err) => console.log(err));
    },
    components: { AddressLine, DateLine, BigPhotoCarousel, BackButton }
}
</script>