<template>
  <div>
    <div>
      <br>
      <br>
        <button @click='geolocate'>
        Go To Current Location
      </button>
      <GmapAutocomplete @place_changed='setPlace' />
      <button @click='addMarker'>
        Add
      </button>
    </div>

    <br>
    <br>

    <ul>
        <li v-for="place in places" :key="place.id">
          {{place.name}}<br>
          {{place.address}}
          <img :src="place.imageUrl" style="width:200px; height: 100px">
        </li>
        </ul>
    <br>
    <GmapMap
      :center='center'
      :zoom='12'
      map-type-id="terrain"
      style='width:100%;  height: 400px;'>
        <GmapMarker
            :key="marker.index"
            v-for="marker in markers"
            :position="{lat: marker.lat, lng: marker.lng}"
            @click="center=m.position"
        />
    </GmapMap>
  </div>
</template>

<script>

import { db } from '@/firebaseConfig'

export default {
  name: 'TripMap',
  data: function() {
    return {
        currentPlace: null,
        markers: [],
        places: [],
        center: { lat: 44.97466873221208, lng: -93.23231160929032 },
    }
  },
  firestore: function() {
    return {
      places: db.collection("places"),
      markers: db.collection("markers")
    }

  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
      console.log(this.currentPlace)
      this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        console.log(this.center)
    },
    addMarker() {
      if (this.currentPlace) {
          console.log(this.currentPlace)
        let newMarker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        let newPlace = {
          name: this.currentPlace.name,
          // TODO check there are images
          imageUrl: this.currentPlace.photos[0].getUrl(),
          address: this.currentPlace.formatted_address
        }
        db.collection("markers").add(newMarker);
        db.collection("places").add(newPlace)
        //this.places.push(this.currentPlace);
        this.center = newMarker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>

