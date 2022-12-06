<template>
  <div class="bg-indigo-400 text-gray-50 flex flex-col space-y-3 px-4 pt-3 pb-4 w-full max-w-md rounded-xl shadow-lg">
    <h3 class="text-2xl font-nice font-bold">New&nbsp;Trip&nbsp;<fa-icon icon="map" /></h3>
    
    <!-- Trip Name -->
    <div class="flex flex-col items-start border-l-2 border-indigo-700 pl-2">
      <label for="name" class="text-sm text-indigo-200 mb-1"><fa-icon icon="van-shuttle" class="text-xs" /> Trip Name</label>
      <input
        required
        v-model="tripName" 
        type="text" 
        name="name" 
        placeholder="Road to the Rockies"
        class="h-10 w-full rounded p-2 shadow-lg text-indigo-500 font-nice truncate focus:outline-none focus:ring focus:ring-indigo-200 focus:text-indigo-600 bg-white focus:shadow-xl hover:shadow-xl transition-all duration-100"
      >
    </div>

    <!-- Origin Location -->
    <div class="flex flex-col items-start border-l-2 border-indigo-700 pl-2">
      <label for="origin" class="text-sm text-indigo-200 mb-1"><fa-icon icon="location-dot" class="text-xs" /> Starting Point</label>
      <span class="text-indigo-500 font-nice p-2 h-10 w-full flex bg-white rounded shadow-lg focus:outline-none focus:ring focus:ring-indigo-200">
        <span v-if="this.usingGeolocate && Object.keys(this.firstDestination).length !==0" class="flex flex-nowrap justify-between items-center w-full">
          <span class="w-40 truncate">{{ this.firstDestination.formatted_address }}</span> 
          <button 
            class="flex items-center justify-center hover:bg-indigo-400 w-6 h-6 rounded-full duration-100"
            @click="toggleUsingGeolocate"
            >
              <fa-icon icon="xmark" />
            </button>
        </span>
        <span v-else-if="this.usingGeolocate" class="flex items-center"><fa-icon icon="earth-americas" class="animate-spin" /></span>
        <GmapAutocomplete v-else @place_changed='setPlace' />
      </span>
      <div class="text-center font-nice w-full ">
        <p>or</p>
        <div>
          <CurrentLocationButton @click.native="geolocate" />
        </div>
      </div>
    </div>

    <!-- Start Date -->
    <div class="flex flex-col items-start border-l-2 border-indigo-700 pl-2">
      <label for="startDate" class="text-sm text-indigo-200 mb-1"><fa-icon icon="calendar-day" class="text-xs" /> Start Date</label>
      <input 
      v-model="startDate" 
      type="date" 
      name="startDate" 
      class="w-full h-10 rounded p-2 mr-1 shadow-lg text-indigo-400 font-nice focus:outline-none focus:ring focus:ring-indigo-200 focus:text-indigo-600 bg-white focus:shadow-xl hover:shadow-xl transition-all duration-100"
      >
    </div>

    
    <!-- <p v-if="this.emptyFieldWarning" class="font-nice bg-amber-300 text-amber-600 py-1 rounded">Please fill in all fields</p> -->
    <WarningBanner v-if="this.emptyFieldWarning" message="Please fill in all fields" @click.native="toggleWarning" />
    <hr v-else class="invisible">
    <button 
      class="w-full bg-teal-300 hover:bg-teal-500 text-teal-700 hover:text-teal-900 focus:outline-none h-10 rounded text-lg shadow-lg flex justify-center items-center hover:shadow-xl transition-all duration-100"
      @click="createTrip"  
    >
      Create <fa-icon icon="fa-solid fa-plus-circle" class="ml-1" />
    </button>
    
  </div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import { getGoogleMapsAPI } from "gmap-vue";
import CurrentLocationButton from "./CurrentLocationButton.vue";
import WarningBanner from "./WarningBanner.vue";

export default {
    data() {
        return {
            trips: [],
            tripName: "",
            startDate: "",
            firstDestination: {},
            userLocation: {},
            emptyFieldWarning: false,
            usingGeolocate: false
        };
    },
    computed: {
      google: getGoogleMapsAPI
    },
    methods: {
        toggleWarning: function() {
          this.emptyFieldWarning = !this.emptyFieldWarning;
        },
        toggleUsingGeolocate: function() {
          this.usingGeolocate = !this.usingGeolocate;
        },
        createTrip() {
          if (this.tripName === '' || this.startDate === '' || Object.keys(this.firstDestination).length === 0) {
            this.emptyFieldWarning = true;
            return;
          }
            let newTrip = {
                userId: auth.currentUser.uid,
                tripName: this.tripName,
                destinations: [
                    {
                        order: 1,
                        address: this.firstDestination.formatted_address,
                        name: this.firstDestination.name || this.firstDestination.formatted_address.split(',')[0],
                        imageUrls: this.firstDestination.photos ? getPhotoUrls(this.firstDestination.photos) : [],
                        dateArriving: this.startDate,
                        lat: this.firstDestination.geometry.location.lat(),
                        lng: this.firstDestination.geometry.location.lng(),
                    }
                ]
            };
            // console.dir(newTrip);
            db.collection("trips").add(newTrip);
            this.emptyFieldWarning = false;
            this.tripName = '';
            this.startDate = '';
            this.firstDestination = {};
        },
        setPlace(place) {
            this.firstDestination = place;
        },
        geolocate: function () {
            this.usingGeolocate = true;
            navigator.geolocation.getCurrentPosition(position => {
                let userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                new this.google.maps.Geocoder().geocode({ location: userLocation })
                  .then((result) => {
                    this.firstDestination = result.results[0];
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            });
            
        },
        
    },
    components: { CurrentLocationButton, WarningBanner }
}

// Weird but I guess this works... Vue did not like it when this was in methods
function getPhotoUrls(photos) {
  const maxNumOfPhotosKept = photos.length <= 10 ? photos.length : 10; 
  let urls = [];
  for (let i = 0; i < maxNumOfPhotosKept; i++) {
    urls.push(photos[i].getUrl());
  }
  return urls;
}
</script>

<style>

</style>
