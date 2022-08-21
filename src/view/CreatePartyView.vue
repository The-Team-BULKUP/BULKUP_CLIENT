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
    <div id="clickLatlng">

    </div>
  </div>
</template>

<script>
import {LocationUtils} from "@/util/locationUtil";

export default {
  name: "CreatePartyView",
  data(){
    return {
      myLocation: {
        lat: 0,
        lng: 0,
        distance: 1000,
      },
      marker: null,
      isLoaded : false,
    }
  },
  async mounted() {
    let loc = await LocationUtils.getLocation();
    this.myLocation.lat = loc.coords.latitude;
    this.myLocation.lng = loc.coords.longitude;
    console.log(this.myLocation);
    LocationUtils.initMap(this);
  },

  methods: {
    initMapFinally() {
      console.info("callback initMapFinally");
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
          position = new window.kakao.maps.LatLng(this.myLocation.lat, this.myLocation.lng),
          mapOption = {
            center: position, // 지도의 중심좌표
            draggable: true,
            scrollwheel: true,
            tileAnimation: false,
            level: 3 // 지도의 확대 레벨
          };

      this.map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      this.map.relayout();
      this.marker = new window.kakao.maps.Marker({
        position : position
      });
      this.marker.setMap(this.map);

      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
      window.kakao.maps.event.addListener(this.map, 'click', function(mouseEvent) {

        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        this.marker.setPosition(latlng);
        this.map.relayout();

        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';

        var resultDiv = document.getElementById('clickLatlng');
        resultDiv.innerHTML = message;
      });

      this.isLoaded = true;
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