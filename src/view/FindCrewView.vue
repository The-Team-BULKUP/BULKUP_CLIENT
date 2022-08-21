<template>
  <div :class="isLoaded ? 'map' : 'map padding-content' ">
    <div id="map">
        <div v-if="!isLoaded" style="horiz-align: center">
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
          <v-ons-col style="text-align: -webkit-center;">
            <v-ons-button style="display: inline;" @click="showPartyDetail(party)" modifier="quiet" class="button button--quiet">자세히</v-ons-button>
<!--          <button class="btn-moa toolbar-btn backcolor-1" @click="findCrew(party)">자세히보기</button>-->
          <span class="list-item__subtitle">{{ party.distance.toFixed() }}m</span><br/>
          </v-ons-col>
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
      let center = this.map.getCenter();
      if (this.myLocation.distance === 500) {
        this.map.setLevel(4, {anchor: center, animate: true});
      } else if (this.myLocation.distance === 1000) {
        this.map.setLevel(5, {anchor: center, animate: true});
      } else if (this.myLocation.distance === 2000) {
        this.map.setLevel(6, {anchor: center, animate: true});
      } else if (this.myLocation.distance === 3000) {
        this.map.setLevel(8, {anchor: center, animate: true});
      }
      this.map.setCenter(new window.kakao.maps.LatLng(this.myLocation.lat, this.myLocation.lng));
      this.loadPartyCrew();
      this.map.relayout();
    },
  },
  mounted: function (){
    LocationUtils.getLocation().then(res => {
      this.myLocation.lat = res.coords.latitude;
      this.myLocation.lng = res.coords.longitude;
      LocationUtils.initMap(this);
      this.loadPartyCrew();
    });
  },
  methods: {
    loadPartyCrew() {
      Party.fetchPartycrew(this.myLocation.lat, this.myLocation.lng, this.myLocation.distance).then(res => {
        if (res.status !== 200){
          $ons.notification.alert(res.data['detail']);
        } else {
          this.partyCrew = res.data;
          LocationUtils.displayMarker(this, this.markers, this.partyCrew.map(party => { return {lat: party.point.lat, lng: party.point.lng, name: party.name}}));
        }
        this.isLoaded = true;
      })
    },

    initMapFinally() {
      console.info("callback initMapFinally");
      console.info(this.myLocation);
      let mapContainer = document.getElementById('map'), // 지도를 표시할 div
          position = new window.kakao.maps.LatLng(this.myLocation.lat, this.myLocation.lng),
          mapOption = {
            center: position, // 지도의 중심좌표
            draggable: true,
            scrollwheel: true,
            zoomable: true,
            level: 4 // 지도의 확대 레벨
          };

      this.map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      this.map.relayout();

      this.isLoaded = true;
      this.map.setDraggable(true);
      this.map.setZoomable(true);
    },
    showPartyDetail(party) {
      // this.$router.push({
      //   name: "PartyDetailView",
      //   params: {
      //     party: party,
      //   }
      // });
      alert(party);
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