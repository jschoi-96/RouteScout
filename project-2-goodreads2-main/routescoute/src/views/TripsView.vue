<template>
    <div class="text-slate-50 min-h-screen bg-gradient-to-b from-slate-900 to-slate-600 py-3 px-2 sm:px-4 flex flex-col lg:flex-row justify-center lg:space-x-3">
    
        <!-- Container for existing trips -->
        <div class="lg:w-[60%]">
            <PageHeading heading="Trips" />

            <!-- Container for tripPreviews -->
            <div class="space-y-4">
                <TripPreview v-for="trip in trips" :key="trip.id" :trip="trip" />
            </div>

            <NoTrips v-if="trips.length === 0" />
        </div>

        <!-- Container for creating new trip -->
        <div class="my-4 lg:mt-0 lg:block">
            <CreateNewTrip />
        </div>

    </div>
</template>

<script>
import { db, auth } from '@/firebaseConfig';
import CreateNewTrip from '../components/CreateNewTrip.vue'
import TripPreview from '@/components/TripPreview.vue';
import NoTrips from '../components/NoTrips.vue';
import PageHeading from '@/components/PageHeading.vue';    
export default{
    name: "TripsView",
    data() {
        return {
            trips: [],
            newTripName: ""
        };
    },
    firestore: function () {
        return {
            trips: db.collection("trips").where('userId', '==', auth.currentUser.uid)
        };
    },
    methods: {
        editTrip(id) {
            db.collection("trips").doc(id).update();
        },
        deleteTrip(id) {
            db.collection("trips").doc(id).delete();
        }
    },
    components: { CreateNewTrip, TripPreview, NoTrips, PageHeading }
}
</script>

<style>
    
</style>

