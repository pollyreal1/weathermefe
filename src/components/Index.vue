<template>
  <div class="row">
    <div class="col-md-10 col-12">
      <div id="mapContainer" class="mapdesign"></div>
    </div>
    <div class="col-md-2 col-12 fixed-height">
      <h2>Place Details</h2>
      <h3 v-if="weather">{{ weather.city.name }}</h3>
      <div v-if="placeInfo">
        <small>
          {{ center[0] }}
          {{ center[1] }}
        </small>
        <p>
          {{ placeInfo[0].properties.address_line1 }}
          {{ placeInfo[0].properties.address_line2 }}
        </p>
        <div v-if="weather">
          <div
            v-for="wthr in weather.list.slice(0, 10)"
            :key="wthr.list"
            class="card card-body mb-2"
          >
            <h4>{{ (wthr.main.temp - 273.15).toFixed(2) }} °C</h4>
            <p>{{ wthr.weather[0].description }}</p>
            <p>{{ wthr.dt_txt }}</p>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";

export default {
  name: "BaseMap",
  data() {
    return {
      center: [139.811279, 35.652832],
      accessToken:
        "pk.eyJ1IjoicG9sbHlyZWFsIiwiYSI6ImNremF1cXp5ZjB4a3Myb2xidHM2N3BlenQifQ.z2k75Wij03h8BjwSAnB6nw",
      placeInfo: null,
      weather: null,
    };
  },

  mounted() {
    this.initializeMap();
  },

  methods: {
    initializeMap() {
      mapboxgl.accessToken = this.accessToken;

      try {
        let map = new mapboxgl.Map({
          container: "mapContainer",
          style: "mapbox://styles/mapbox/streets-v11",
          center: this.center,
          zoom: 12,
        });

        let geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        });

        map.addControl(geocoder);
        map.addControl(new mapboxgl.NavigationControl());

        geocoder.on("result", (e) => {
          this.logSearch(e.result.place_name);
          const marker = new mapboxgl.Marker({
            dragabble: true,
            color: "#D80739",
          })
            .setLngLat(e.result.center)
            .addTo(this.map);

          this.center = e.result.center;

          this.getPlace(e.result.center);
          this.getWeather(e.result.center);
        });
      } catch (err) {
        console.log("map error", err);
      }
    },

    async getPlace(longLat) {
      axios
        .get(
          "https://api.geoapify.com/v2/place-details?lat=" +
            longLat[1] +
            "&lon=" +
            longLat[0] +
            "&apiKey=ee8922dfb2bc47d7a059ed4d86475425"
        )
        .then((response) => {
          this.placeInfo = response.data.features;
        });
    },

    async getWeather(longLat) {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            longLat[1] +
            "&lon=" +
            longLat[0] +
            "&appid=b2c5edbace410a9e628215ca6e5d7149"
        )
        .then((response) => {
          this.weather = response.data;
        });
    },

    logSearch(place_name) {
      axios
        .post(process.env.VUE_APP_API + "/api/search", {
          search: place_name,
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>


<style lang="css">
body {
  overflow-y: scroll;
}
.mapdesign {
  width: 100%;
  height: 95vh;
}
.fixed-height {
  overflow-y: scroll;
  height: 95vh;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: #eb7d00 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #eb7d00;
  border-radius: 10px;
  border: 3px solid #ffffff;
}
</style>