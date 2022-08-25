<template>
  <div :class="isLoaded ? 'map' : 'map padding-content' ">
    <div id="map">
      <div v-if="!isLoaded" style="horiz-align: center">
        <br/>
        로딩중입니다<br/>
        잠시만 기다려주세요!<br/><br/>
        <v-ons-progress-circular indeterminate></v-ons-progress-circular>
      </div>
    </div>
    <div class="distance-div" v-if="isLoaded" style="background: white">
      <v-ons-col>
        <!--      <a class="distance">선호 거리</a>-->
        선호 거리
        <!--      <v-ons-range v-model="this.myLocation.distance" style="width: 40%;"></v-ons-range>-->
        <v-ons-button @click="myLocation.distance = 3000" modifier="quiet" :class="(this.myLocation.distance === 3000) ? 'distance-selected button button--quiet' : 'distance button button--quiet'  ">3km</v-ons-button>
        <v-ons-button @click="myLocation.distance = 5000" modifier="quiet" :class="(this.myLocation.distance === 5000) ? 'distance-selected button button--quiet' : 'distance button button--quiet'  ">5km</v-ons-button>
        <v-ons-button @click="myLocation.distance = 10000" modifier="quiet" :class="(this.myLocation.distance === 10000) ? 'distance-selected button button--quiet' : 'distance button button--quiet'  ">10km</v-ons-button>
        <v-ons-button @click="myLocation.distance = 30000"  modifier="quiet" :class="(this.myLocation.distance === 30000) ? 'distance-selected button button--quiet' : 'distance button button--quiet'   ">30km</v-ons-button>
      </v-ons-col>
    </div>

    <div class="page__content" style="top: 18rem; !important; padding-top: 0; bottom: 5.3rem !important;" v-if="isLoaded">
      <v-ons-list>
        <v-ons-list-header>
          동네 설정
        </v-ons-list-header>
          <v-ons-list-item>
            <label class="left" style="font-weight: lighter;font-size: smaller;">
              <div v-if="this.myLocation.address === ''">
                지도를 눌러 인근 위치를 선택해주세요.
              </div>
              <div v-else>
                {{ this.myLocation.address }}
              </div>
            </label>
          </v-ons-list-item>

        <v-ons-list-header>
          파티 타입
        </v-ons-list-header>
        <v-ons-list-item>
          <label class="center" for="switch1">
            {{ isCrew ? '여러명이서 같이 할래요' : '1인 피티 희망합니다' }}
          </label>
          <div class="right">
            <v-ons-switch input-id="switch1"
                          v-model="isCrew"
            >
            </v-ons-switch>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>
          선호 요일
        </v-ons-list-header>
        <v-ons-list-item expandable :expanded="isExpanded">
          {{(checkedDay.length > 0) ? "(" + checkedDay.toString().replaceAll('"', "").replaceAll("[", "").replaceAll("]", "") : "선호하는 요일이 없습니다."}})
          <div class="expandable-content" >
            <div class="row">
            <div v-for="(day, index) in dayOfTheWeeks" :key="day" class="col-6" style="padding-bottom: 0.5rem;    text-align-last: center;">
              <v-ons-checkbox
                  :input-id="'checkbox-' + index"
                  :value="day"
                  v-model="checkedDay"
              >
              </v-ons-checkbox>

              <label class="pl-3" :for="'checkbox-' + index" style="padding-left: 0.5rem;">
                {{ day + "요일" }}
              </label>
            </div>
            </div>
          </div>

        </v-ons-list-item>

        <v-ons-list-header>
          선호 시간대 {{ (toTime !== "" && fromTime !== "") ? "(" + fromTime + " ~ " + toTime + ")" : '' }}
        </v-ons-list-header>
        <v-ons-list-item class="container-fluid">
          <div class="form-control" style="border: none;text-align-last: center;">
            <div class="row">
              <input type="time" class="col-5" id="from_hour" v-model="fromTime">
              <span class="col-1" style="font-size: 0.5rem; align-self: center;"> ~ </span>
              <input type="time" class="col-5" id="to_hour" v-model="toTime">
            </div>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>
          가격 및 횟수
        </v-ons-list-header>
        <v-ons-list-item style="text-align-last: center;">
            <div class="row col-6" style="text-align-last: right">
              <label>1회당 가격</label>
              <v-ons-input placeholder="" type="number"
                           v-model="price" class="col-10"
                           style="text-align-last: right;"
              >
              </v-ons-input>
              <span class="col-2" style="text-align-last: left;align-self: center;padding-left: 0;">원</span>
            </div>

          <div class="vr" style="margin: 0 1rem 0 1rem;"></div>

            <div class="row col-6" style="text-align-last: right">
              <label>총 횟수</label>
              <v-ons-input placeholder="" type="number"
                           v-model="howMany" class="col-10"
                           style="text-align-last: right;"
              >
              </v-ons-input>
              <span class="col-2" style="text-align-last: left;align-self: center;padding-left: 0;">회</span>
            </div>

        </v-ons-list-item>

        <v-ons-list-header>
        파티 정보
        </v-ons-list-header>
        <v-ons-list-item>
            <div class="row col-12" style="margin-bottom: 1rem">
              <label for="crew_name">크루 이름</label>
              <v-ons-input  id="crew_name" placeholder="크루 이름" float
                           v-model="name">
              </v-ons-input>
            </div>
            <div class="row col-12">
              <label for="crew_description">모집 소개글</label>
              <textarea id="crew_description" class="textarea textarea--transparent" rows="3" placeholder="나의 운동능력이나 하고 싶은 운동을 간단하게 적어주시면 나에게 맞는 멤버와 트레이너를 찾을 수 있어요!" v-model="description"></textarea>
            </div>
        </v-ons-list-item>




        <v-ons-list-item>
          <div class="right">
            <b-button @click="submit">크루 모집하기</b-button>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </div>

</template>

<script>
import {LocationUtils} from "@/util/locationUtil";
import {StringBitConverter} from "@/util/StringBitConverter";
import {Party as Party} from "@/api/party";

export default {
  name: "CreatePartyView",
  data(){
    return {
      myLocation: {
        lat: 0,
        lng: 0,
        distance: 3000,
        address : "",
      },
      dayOfTheWeeks : ["월", "화", "수", "목", "금", "토", "일"],
      checkedDay : ["월", "화", "수", "목", "금", "토", "일"],
      fromTime : "",
      toTime: "",
      isCrew: true,
      price: "",
      description : "",
      name: "",
      howMany: "",
      isLoaded : false,
      isExpanded : false,
    }
  },
  async mounted() {
    let loc = await LocationUtils.getLocation();
    this.myLocation.lat = loc.coords.latitude;
    this.myLocation.lng = loc.coords.longitude;
    console.log(this.myLocation);
    LocationUtils.initMap(this);
  },
  computed: {
    requestBody(){
      return {
        "name": this.name,
        "type": this.isCrew,
        "baseLatitude": (this.myLocation.address !== "") ? this.myLocation.lat : "",
        "baseLongitude":  (this.myLocation.address !== "") ? this.myLocation.lng : "",
        "preferredDistance": this.myLocation.distance,
        "address": this.myLocation.address,
        "preferredDay": StringBitConverter.dayToBit(this.checkedDay),
        "preferredTime": StringBitConverter.hourToBit(this.fromTime, this.toTime),
        "isCrew": (this.isCrew) ? "crew" : "alone",
        "preferredPrice": this.price,
        "preferredHowMany": this.howMany,
        "description": this.description,
      }
    }
  },
  watch: {
    'myLocation.distance' : function(){
      console.info("changed and reload");
      let center = this.map.getCenter();
      if (this.myLocation.distance === 3000) {
        this.map.setLevel(4, {anchor: center, animate: true});
      } else if (this.myLocation.distance === 5000) {
        this.map.setLevel(5, {anchor: center, animate: true});
      } else if (this.myLocation.distance === 10000) {
        this.map.setLevel(6, {anchor: center, animate: true});
      } else if (this.myLocation.distance === 30000) {
        this.map.setLevel(8, {anchor: center, animate: true});
      }
      this.map.setCenter(new window.kakao.maps.LatLng(this.myLocation.lat, this.myLocation.lng));
      this.map.relayout();
    },
  },

  methods: {
    initMapFinally() {
      console.info("callback initMapFinally");
      let postition = new window.kakao.maps.LatLng(this.myLocation.lat, this.myLocation.lng);

      let mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: postition,
            draggable: true,
            scrollwheel: true,
            tileAnimation: false,
            level: 4 // 지도의 확대 레벨
          };

      /*      this.map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
            // 마커가 표시될 위치입니다
            // var markerPosition = new window.kakao.maps.LatLng(this.myLocation.lat, this.myLocation.lng);

      // 마커를 생성합니다
            let marker = new window.kakao.maps.Marker({
              postition : postition
            });

      // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.map);

      // 마커가 드래그 가능하도록 설정합니다
            marker.setDraggable(true);*/

      this.map = new window.kakao.maps.Map(mapContainer, mapOption);

      let marker = new window.kakao.maps.Marker({
        // position : new window.kakao.maps.LatLng(this.myLocation.lat, this.myLocation.lng)
        position: this.map.getCenter()
      });

      marker.setMap(this.map);

      this.geocoder = new window.kakao.maps.services.Geocoder();

      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
      window.kakao.maps.event.addListener(this.map, 'click', (mouseEvent) => {

        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);
        this.myLocation.lng = latlng.getLng();
        this.myLocation.lat = latlng.getLat();

        this.searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            console.info(result);
              this.myLocation.address = result[0].address.address_name;
          }
        });
      });

    this.isLoaded = true;
    },
    searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    },
    submit(){
      Party.createParty(this.requestBody).then(res => {
        if (res.status === 201) {
          this.$router.push('/');
        }
      });
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