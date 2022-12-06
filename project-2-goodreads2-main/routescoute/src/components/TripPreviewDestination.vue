<template>
  <div class="bg-indigo-400 w-full rounded-xl shadow-md text-left flex justify-between relative font-nice max-h-44 truncate">
    
    <div class="w-[34%]">
      <DestinationImage :urls="destination.imageUrls" :alt="destination.name" :orderNumber="destination.order" />
    </div>

    <!-- Content -->
    <div class="w-[66%] max-w-[66%] p-3 px-4"> 
      <DestinationTitleLink :name="destination.name" :tripId="tripId" :destination="destination"/>
      <div class="text-indigo-200 flex flex-col text-sm sm:text-md md:text-lg pl-2">
        <AddressLine :address="destination.address" /> 
        <DateLine :dateString="destination.dateArriving" />
      </div>
    </div>
    
    <MinusButton @click.native="deleteDestination" />
    
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "@/firebaseConfig";
import AddressLine from './AddressLine.vue';
import DateLine from './DateLine.vue';
import DestinationTitleLink from './DestinationTitleLink.vue';
import DestinationImage from "./DestinationImage.vue";
import MinusButton from "./MinusButton.vue";

export default {
    props: {
        destination: Object,
        tripId: String
    },
    
    data(){
      return{
        isDeleting: false,
      }
    },
    components: {
    DestinationTitleLink,
    DestinationImage,
    AddressLine,
    DateLine,
    MinusButton
},
    methods: {
      toggleIsDeleting: function() {
        this.isDeleting = !this.isDeleting;
      },
      deleteDestination: function() {
        const tripRef = db.collection('trips').doc(this.tripId);
        tripRef.update({ destinations: firebase.firestore.FieldValue.arrayRemove(this.destination) });
      },
    },
}
</script>

<style>

</style>