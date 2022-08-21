<template>
  <div class="map">
    <div id="map">
      <div style="horiz-align: center">
        로딩중입니다<br/>
        잠시만 기다려주세요!<br/><br/>
        <v-ons-progress-circular indeterminate></v-ons-progress-circular>
      </div>
    </div>
    <div class="distance-div" v-if="isLoaded" style="background: #e8e7e7">
      <v-ons-col>
  <!--      <a class="distance">선호 거리</a>-->
        선호 거리
  <!--      <v-ons-range v-model="this.myLocation.distance" style="width: 40%;"></v-ons-range>-->
        <v-ons-button @click="myLocation.distance = 500"  modifier="quiet" :class="(this.myLocation.distance === 500) ? 'distance-selected button button--quiet' : 'distance button button--quiet'   ">0.5km</v-ons-button>
        <v-ons-button @click="myLocation.distance = 1000" modifier="quiet" :class="(this.myLocation.distance === 1000) ? 'distance-selected button button--quiet' : 'distance button button--quiet'  ">1km</v-ons-button>
        <v-ons-button @click="myLocation.distance = 2000" modifier="quiet" :class="(this.myLocation.distance === 2000) ? 'distance-selected button button--quiet' : 'distance button button--quiet'  ">2km</v-ons-button>
        <v-ons-button @click="myLocation.distance = 3000" modifier="quiet" :class="(this.myLocation.distance === 3000) ? 'distance-selected button button--quiet' : 'distance button button--quiet'  ">3km</v-ons-button>
      </v-ons-col>
    </div>
  </div>

  <div class="partyList">
    <v-ons-list>
<!--      <v-ons-list-header>인근 크루 모집</v-ons-list-header>-->
      <v-ons-list-item v-for="party in this.partyCrew" :key="party">
        <div class="center">
          <span class="list-item__title">
            {{ party.name }}
            <span class="list-item__subtitle">
            {{ '(' + toDay(party.preferredDay) + ')' }}
            </span>
          </span>
          <span class="list-item__subtitle">{{ '1회당 ' + party.preferredPrice + '원 - 총 ' + party.preferredHowMany + ' 회'}}</span>
        </div>
        <div class="right">
          <span class="list-item__subtitle">{{ party.distance.toFixed() }}m</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </div>
  <div class="message" v-if="isLoaded && this.partyCrew.length !== 0">
    <div>
    원하는 크루가 없나요?
    </div>
    <router-link to="/signup">
      <a style="padding-top: 0.4rem;color: black;text-underline: none;font-weight: lighter">직접 크루를 모집해보세요</a>
    </router-link>
  </div>

  <div class="message" v-if="isLoaded && this.partyCrew.length === 0">
    <div>
      주변에서 크루를 찾을 수 없습니다.
    </div>
    <router-link to="/signup">
      <a style="padding-top: 0.4rem;color: black;text-underline: none;font-weight: lighter">직접 크루를 모집해보세요.</a>
    </router-link>
  </div>
</template>

<script>
import {LocationUtils} from "@/util/locationUtil";
import {party as Party} from "@/api/party";
import $ons from "vue-onsenui";
import {StringBitConverter} from "@/util/StringBitConverter";

export default {
  name: "FindCrewView",
  data() {
    return {
      myLocation: {
        lat: 0,
        lng: 0,
        distance: 1000,
      },
      isLoaded : false,
      partyCrew : [],
      markers: [],
    };
  },
  watch: {
    'myLocation.distance' : function(){
      console.info("changed and reload");
      this.loadPartyCrew();
    },
  },
  mounted: function () {
    LocationUtils.getLocation().then(res => {
      this.myLocation.lat = res.coords.latitude;
      this.myLocation.lng = res.coords.longitude;
      console.info(this.myLocation);

      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=45488c69203b6e44b4dbd0576c8b6d56";
        document.head.appendChild(script);
      }
      this.loadPartyCrew();
    });
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.myLocation.lat, this.myLocation.lng),
        level: 6
      };
      this.map = new kakao.maps.Map(container, options);
    },
    loadPartyCrew() {
      Party.fetchPartycrew(this.myLocation.lat, this.myLocation.lng, this.myLocation.distance).then(res => {
        if (res.status !== 200){
          $ons.notification.alert(res.data['detail']);
        } else {
          this.partyCrew = res.data;
          this.displayMarker(this.partyCrew.map(party => { return {lat: party.point.lat, lng: party.point.lng, name: party.name}}));
        }
        this.isLoaded = true;
      })
    },

    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        // this.markers.forEach((marker) => marker.setMap(null));
        this.markers.forEach((marker) => marker.close());
      }

      if (markerPositions.length > 0) {
        this.markers = markerPositions.map(
            (position) => {
              const iwContent = `<div class="marker">${position.name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                    iwPosition = new kakao.maps.LatLng(position.lat, position.lng), //인포윈도우 표시 위치입니다
                    iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

              new kakao.maps.InfoWindow({
                map: this.map,
                position : iwPosition,
                content : iwContent,
                removable : iwRemoveable
              })
            })
      // if (markerPositions.length > 0) {
      //   this.markers = markerPositions.map(
      //       (position) =>
      //           new kakao.maps.Marker({
      //             map: this.map,
      //             title: position.title,
      //             position: new kakao.maps.LatLng(position.lat, position.lng),
      //           }))
      //

      }
        //
        // const bounds = positions.reduce(
        //     (bounds, latlng) => bounds.extend(latlng),
        //     new kakao.maps.LatLngBounds()
        // );
        //
        // this.map.setBounds(bounds);
    },

    toDay(week){
      return StringBitConverter.toDay(week);
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 15rem;
}

.distance{
  margin: 6px 0 !important;
  color:black;

}

.distance-selected {
  margin: 6px 0 !important;
  color: rgba(var(--highlight-color-rgb));
}
.message{
  margin-top : 1.5rem;
}

</style>