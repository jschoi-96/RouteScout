<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 bg-slate-800">
      <EarthSpinner v-if="trip === null"  />
      <!-- Color of oceans in Google Maps: #8AB4F8 -->
      <div v-else class="col-span-1 min-h-max lg:min-h-screen  py-3 px-2 sm:p-6 space-y-3 flex flex-col">
        <div class="flex space-x-3 items-center">
          <BackButton @click.native="goBack" />
          <span class="truncate text-2xl sm:text-3xl md:text-4xl text-indigo-50 bg-slate-900 w-min whitespace-nowrap rounded-xl py-2 px-6 font-big shadow-sm flex items-baseline">
            <fa-icon icon="route" class="text-xl sm:text-2xl md:text-3xl mr-2" /> {{ trip.tripName }}
          </span>
        </div>

        <div class="bg-slate-900 h-14 rounded-2xl font-nice text-indigo-50 text-md sm:text-xl flex items-center justify-start space-x-6 max-w-min whitespace-nowrap shadow-inner">
          <span class="pl-3 font-bold">Plan Route</span>
          <div class="h-12 pr-1 text-slate-900 font-big">
            <button 
              class="px-3 mr-1 h-12 rounded-l-xl bg-slate-600 duration-75 hover:bg-teal-400" 
              :class="routeType === 'round' ? 'bg-teal-400' : '' "
              @click="calculateRoute('round')"
            >
              Round Trip
            </button>
            <button 
              class="px-3 h-12 rounded-r-xl bg-slate-600 duration-75 hover:bg-teal-400"
              :class="routeType === 'one' ? 'bg-teal-400' : '' "
              @click="calculateRoute('one')"
            >
              One Way
            </button>
          </div>
        </div>

        <WaitingOnGoogle v-if="isCalculatingRoute" />
        <TripStats v-if="routeType && miles && hours" :miles="miles" :hours="hours" /> 

        <!-- <draggable class="draggable-list space-y-3" :list="trip.destinations" group="my-group" @change=onChange> -->
          <div class="flex items-center" v-for="destination in trip.destinations" :key="destination.name">
            <TripPreviewDestination :destination="destination" :tripId="id" />
            <router-link to="/test"></router-link>
            <LocateButton @click.native="recenter(destination.lat, destination.lng)" />
          </div>
        <!-- </draggable> -->

        <!-- Not populating  TripPreviewDestination with new trip on the fly... -->
        <AddDestinationForm v-if="isAddingDestination" :tripId="this.id" :numDestinations="trip.destinations.length" />
        
        <div class="flex justify-start">
          <AddDestinationToggleButton :isAddingDestination="isAddingDestination" @click.native="toggleAdd" />
        </div>

        <ResetMapButton v-if="zoom !== 4" @click.native="resetMap" />
      
      </div>
      
      <EarthSpinner v-if="trip === null" />
      <div v-else class="col-span-1 min-h-screen max-h-screen lg:px-2 py-6">
        <GmapMap
          id="map"
          :center='center'
          :zoom='zoom'
          map-type-id="terrain"
          class="w-full h-full lg:rounded-2xl overflow-hidden"
        >
            <GmapMarker
                :key="destination.name"
                v-for="destination in trip.destinations"
                :position="{lat: destination.lat, lng: destination.lng}"
                @click="recenter(destination.lat, destination.lng)"
            />
        </GmapMap>
      </div>
    </div>
     
  </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { getGoogleMapsAPI } from 'gmap-vue';
import router from '@/router';
import EarthSpinner from '@/components/EarthSpinner.vue';
import TripPreviewDestination from '@/components/TripPreviewDestination.vue';
import LocateButton from '../components/LocateButton.vue';
import AddDestinationForm from '@/components/AddDestinationForm.vue';
import AddDestinationToggleButton from '@/components/AddDestinationToggleButton.vue';
import ResetMapButton from '../components/ResetMapButton.vue';
import TripStats from '../components/TripStats.vue';

// import draggable from "vuedraggable";
import BackButton from '@/components/BackButton.vue';
import WaitingOnGoogle from '../components/WaitingOnGoogle.vue';

export default {
  components: {
    EarthSpinner,
    TripPreviewDestination,
    LocateButton,
    AddDestinationForm,
    AddDestinationToggleButton,
    ResetMapButton,
    // draggable,
    BackButton,
    TripStats,
    WaitingOnGoogle
},
  props: {
    id: String,
  },
  data: function () {
    return {
      center: { lat: 44.97466873221208, lng: -93.23231160929032 },
      zoom: 4,
      isDeleting: false,
      isAddingDestination: false,
      isCalculatingRoute: false,
      newDestinationsArrivalDate: '',
      newDestination: {},
      trip: {},
      routeType: null,
      miles: null,
      hours: null
    };
  },
  computed: {
    google: getGoogleMapsAPI
  },
  firestore: function () {
    return {
      trip: db.collection("trips").doc(this.id)
    };
  },
  methods: {
    calculateRoute: function(type) {
      this.isCalculatingRoute = true;
      this.routeType = type;
      const g = this.google;
      const directionsService = new g.maps.DirectionsService();
      const directionsRenderer = new g.maps.DirectionsRenderer();
      const map = new g.maps.Map(document.getElementById('map'));
      directionsRenderer.setMap(map);

      let stops = [];
      for (let i = 0; i < this.trip.destinations.length; i++) {
        stops.push({
            location: { lat: this.trip.destinations[i].lat, lng: this.trip.destinations[i].lng }
          });
      }

      const request = {
        origin: stops[0].location,
        destination: type === 'round' ? stops[0].location : stops[stops.length-1].location,
        waypoints: type === 'round' ? stops.slice(1, stops.length-1) : stops.slice(1),
        travelMode: 'DRIVING'
      }

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          
          const stats = getRouteStats(result.routes[0]);
          this.isCalculatingRoute = false;
          this.miles = stats.miles;
          this.hours = stats.hours;
        } else {
          console.log('error calculating route')
        }
      });
    },
    toggleAdd: function() {
      this.isAddingDestination = !this.isAddingDestination;
    },
    goBack: function() {
        router.go(-1);
    },
    recenter: function(lat, lng) {
      this.center = {
        lat: lat,
        lng: lng
      };
      this.zoom = 10;
    },
    resetMap: function() {
      this.zoom = 4;
    },
    onChange: function(argument) {
      console.log(argument.moved);
      //let oldIndex = argument.moved.oldIndex;
      //let newIndex = argument.moved.newIndex;
      let minIndex = Math.min(argument.moved.oldIndex, argument.moved.newIndex);
      let maxIndex = Math.max(argument.moved.newIndex, argument.moved.oldIndex);
      console.log(minIndex)
      for (let i = minIndex; i <= maxIndex; i++) {
        const destination = this.trip.destinations[i];
        console.log(destination);
        
        // TODO update order of each item
        //const tripRef = db.collection('trips').doc(this.id);
        //tripRef.update({destinations[i].order: i });
      }
      console.log("o")
      console.log(this.trip.destinations[0])
    },
    getTripCenterCoords: function() {
      let lat = 0;
      let lng = 0;
      let dests = this.trip.destinations;
      for (let i = 0; i < dests.length; i++) {
        lat += dests[i].lat;
        lng += dests[i].lng;
      }
      lat = lat / dests.length;
      lng = lng / dests.length;
      this.center = {lat: lat, lng: lng};
    }
  },
  beforeUpdate: function() {
    if (this.zoom !== 10) {
      this.getTripCenterCoords();
    }
  }
}

function getRouteStats(route) {
  let totalDistance = 0;    // given in meters, convert to miles
  let totalDriveTime = 0;   // given in seconds

  for (let i = 0; i < route.legs.length; i++) {
    totalDistance += route.legs[i].distance.value;
    totalDriveTime += route.legs[i].duration.value;
  }

  const stats = {};

  // convert from meters to miles
  stats.miles = parseInt(totalDistance * 0.00062137);

  // convert from seconds to hours
  stats.hours = (totalDriveTime / 60 / 60).toFixed(2);

  return stats;
}
</script>
