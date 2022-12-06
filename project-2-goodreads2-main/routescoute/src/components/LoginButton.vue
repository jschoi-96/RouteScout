<template>
  <div class="auth text-lg">

    <template v-if="!user">
      <button 
        @click="signInWithGoogle" 
        class="px-2 border-2 rounded-md border-indigo-300 hover:bg-indigo-300 hover:text-slate-800 duration-100"
      >
        <fa-icon :icon="['fab', 'google']" /> Sign in
      </button>
    </template>
    <template v-if="user">
      
      <div class="flex space-x-4 items-center">
        <!-- google is real paranoid about hotlinking images I guess the referrerpolicy seems to fix it
          https://stackoverflow.com/questions/40570117/http403-forbidden-error-when-trying-to-load-img-src-with-google-profile-pic -->
        <button @click="signOut" class="px-2 border-2 rounded-md border-indigo-300 hover:bg-indigo-300 hover:text-slate-800 duration-100">Sign Out</button>
        <img class="h-7 w-7 rounded-full ring-2 ring-indigo-300 bg-indigo-300 hidden sm:block" :src="user.photoURL" alt="avatar" referrerpolicy="no-referrer">
      </div>
    </template>

    <!-- <pre>{{ user }}</pre> -->
  </div>
</template>

<script>

import { auth, provider } from "@/firebaseConfig";

export default {
    components: {},
    name: "LoginButton",
    data() {
        return {
            user: null
        };
    },
    beforeCreate: function() {
        auth.onAuthStateChanged(user => {
            if (user) {        
                this.user = user;
            } else {
                this.user = null;
            }
        });
    },
    methods: {
    signInWithGoogle: function() {
      auth.signInWithRedirect(provider)
        .then(result => {
            this.user = result.user;
        })
        .catch(err => console.log(err));
    },
    signOut: function() {
      auth.signOut()
        .then(() => {
          this.user = null;
          this.$router.push('/')
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

