<template>
  <nav class="flex justify-between items-center bg-slate-900 text-indigo-300 sm:px-8 px-2 py-3 shadow-lg">
    <!-- RouteScout Logo Link -->
    <router-link to="/">
      <span class="text-xl sm:text-3xl flex items-baseline text-indigo-300 whitespace-nowrap">
        <fa-icon icon="route" class="mr-1" /> RouteScout
      </span>
    </router-link>

    <div class="flex space-x-4 items-center font-nice">
      <!-- Link to trips (only shown if user is logged in) -->
      <router-link v-if="user !==null" to="/trips" class="hover:bg-slate-700 px-2 duration-100 rounded-lg">
        <span class="text-lg text-indigo-300 whitespace-nowrap">
          <fa-icon icon="fa-car" /> Trips
        </span>
      </router-link>

      <!-- Login/Logout button -->
      <LoginButton />
    </div>
  </nav>
</template>

<script>
import { auth } from '@/firebaseConfig';
import LoginButton from './LoginButton.vue';

export default {
  components: { 
    LoginButton 
  },
  data: function() {
    return {
      user: auth.currentUser
    };
  }
}
</script>
