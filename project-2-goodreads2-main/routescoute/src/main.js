import Vue from 'vue';
import GMapVue from 'gmap-vue';
import App from './App.vue';
import { firestorePlugin } from 'vuefire';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './output.css';
import router from './router';
import { auth } from './firebaseConfig';
import './registerServiceWorker'

library.add(fas, fab);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.use(GMapVue, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places,directions', 
  }
});

// activate vuefire
Vue.use(firestorePlugin)

Vue.config.productionTip = false

let app;

auth.onAuthStateChanged(()=>{
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }  
});
