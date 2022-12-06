<template>
  <div class="space-y-3 max-w-min bg-slate-500 px-2 sm:px-12 py-3 rounded-xl shadow-inner">
    <div class="flex flex-col items-start border-l-2 border-indigo-700 pl-2">
      <label for="origin" class="text-sm text-indigo-200 mb-1"><fa-icon icon="location-dot" class="text-xs" /> Destination Location</label>
      <span class="text-indigo-500 font-nice p-2 h-10 bg-white rounded shadow-lg focus:outline-none focus:ring focus:ring-indigo-200">
        <GmapAutocomplete @place_changed='setPlace' />
      </span>
    </div>
    <div class="flex flex-col items-start border-l-2 border-indigo-700 pl-2">
      <label for="startDate" class="text-sm text-indigo-200 mb-1"><fa-icon icon="calendar-day" class="text-xs" /> Arrival Date</label>
      <input 
        v-model="newDestinationsArrivalDate" 
        type="date" 
        name="startDate" 
        class="w-full h-10 rounded p-2 mr-1 shadow-lg text-indigo-400 font-nice focus:outline-none focus:ring focus:ring-indigo-200 focus:text-indigo-600 bg-white focus:shadow-xl hover:shadow-xl transition-all duration-100"
      >
    </div>

    <WarningBanner v-if="this.emptyFieldWarning" message="Please fill in all fields" @click.native="toggleWarning" />
    <hr v-else class="invisible">
    
    <AddButton @click.native="addDestination" />

  </div>
</template>

<script>
import { db } from "@/firebaseConfig";
import firebase from "firebase/app";
import AddButton from "./AddButton.vue";
import WarningBanner from "./WarningBanner.vue";

export default {
    props: {
        tripId: String,
        numDestinations: Number
    },
    data() {
        return {
            newDestinationsArrivalDate: "",
            newDestination: {},
            emptyFieldWarning: false
        };
    },
    methods: {
        toggleWarning: function() {
          this.emptyFieldWarning = !this.emptyFieldWarning;
        },
        setPlace(place) {
            this.newDestination = place;
        },
        addDestination: function () {
            if (this.newDestinationsArrivalDate === '' || Object.keys(this.newDestination).length === 0) {
              this.emptyFieldWarning = true;
              return;
            }

            const tripRef = db.collection("trips").doc(this.tripId);
            let newDestination = {
                order: this.numDestinations + 1,
                address: this.newDestination.formatted_address,
                name: this.newDestination.name,
                imageUrls: this.newDestination.photos ? getPhotoUrls(this.newDestination.photos) : [],
                dateArriving: this.newDestinationsArrivalDate,
                lat: this.newDestination.geometry.location.lat(),
                lng: this.newDestination.geometry.location.lng(),
            };
            tripRef.update({ destinations: firebase.firestore.FieldValue.arrayUnion(newDestination) });
            this.emptyFieldWarning = false;
            this.newDestinationsArrivalDate = '',
            this.newDestination = null;
        },
    },
    components: { AddButton, WarningBanner }
}

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