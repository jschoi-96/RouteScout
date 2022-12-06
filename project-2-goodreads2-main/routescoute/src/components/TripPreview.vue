<template>
  <div class="bg-slate-600 rounded-2xl shadow-md">
    <!-- content -->
    <div class="p-3 space-y-3">
      <div class="flex justify-between">
        <router-link :to="{name: 'trip', params: {id: trip.id}}" class="flex items-baseline text-xl sm:text-2xl md:text-3xl text-indigo-50 bg-slate-800 w-min whitespace-nowrap rounded-xl py-2 px-4 font-big shadow-sm hover:underline">
          <fa-icon icon="route" class="text-lg sm:text-xl md:text-2xl mr-2" /> {{trip.tripName}}
        </router-link>

        <div class="flex space-x-3">
          <div v-if="isDeleting" class="space-x-1 space-y-1">
            <DeleteButton @click.native="deleteTrip" />
            <CancelButton @click.native="toggleIsDeleting" />
          </div>
          <TrashButton v-if="!isDeleting" @click.native="toggleIsDeleting" />
        </div>
        
      </div>

      <!-- container for destinations along the way -->
      <div class="space-y-3">
        <TripPreviewDestination v-for="destination in trip.destinations" :key="destination.name + destination.order" :destination="destination" :tripId="trip.id" />
      </div>

      <AddDestinationForm v-if="isAddingDestination" :tripId="trip.id" :numDestinations="trip.destinations.length" />
      
      <div class="flex justify-start">
        <AddDestinationToggleButton :isAddingDestination="isAddingDestination" @click.native="toggleAdd" />
      </div>
    </div>

  </div>
</template>

<script>
import TripPreviewDestination from "./TripPreviewDestination.vue";
import { db } from "@/firebaseConfig";
import DeleteButton from "./DeleteButton.vue";
import CancelButton from "./CancelButton.vue";
import TrashButton from "./TrashButton.vue";
import AddDestinationToggleButton from "./AddDestinationToggleButton.vue";
import AddDestinationForm from "./AddDestinationForm.vue";


export default {
    props: {
        trip: Object
    },
    data() {
      return {
        isDeleting: false,
        isAddingDestination: false,
        newDestinationsArrivalDate: '',
        newDestination: {}
      }
    },
    components: {
      AddDestinationToggleButton,
      AddDestinationForm,
      TripPreviewDestination,
      DeleteButton,
      CancelButton,
      TrashButton
  },
    methods: {
      toggleAdd: function() {
        this.isAddingDestination = !this.isAddingDestination;
      },
      toggleIsDeleting: function() {
        this.isDeleting = !this.isDeleting;
      },
      deleteTrip: function() {
        db.collection('trips').doc(this.trip.id).delete();
      },
    }
}
</script>

<style>

</style>