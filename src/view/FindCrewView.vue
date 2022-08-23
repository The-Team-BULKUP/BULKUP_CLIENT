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
    <div class="distance-div" v-if="isLoaded" style="background: #e8e7e7">
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
  </div>

  <div class="partyList">
    <v-ons-list>
<!--      <v-ons-list-header>인근 크루 모집</v-ons-list-header>-->
      <v-ons-list-item v-for="party in this.partyCrew" :key="party">
        <div class="center">
          <span class="list-item__title">
            {{ party.name }}
            <span class="list-item__subtitle">
            ({{ (toDay(party.preferredDay) === "요일 상관 없음") ? "요일 무관" : toDay(party.preferredDay) }})
            </span>
          </span>
          <span class="list-item__subtitle">{{ '1회당 ' + party.preferredPrice + '원 - 총 ' + party.preferredHowMany + ' 회'}}</span>
        </div>
        <div class="right">
          <v-ons-col style="text-align: -webkit-right;">
            <div style="inline-size: max-content;">
            <button @click="this.partyDetail = party" style="color: var(--button-quiet-color);border: none;background: none; padding-right:0;"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop">자세히</button>
            </div>
<!--                          class="button button&#45;&#45;quiet"-->
<!--          <button class="btn-moa toolbar-btn backcolor-1" @click="findCrew(party)">자세히보기</button>-->
          <div><span class="list-item__subtitle">{{ party.distance.toFixed() }}m</span></div>
          </v-ons-col>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </div>
  <div class="message" v-if="isLoaded && this.partyCrew.length !== 0">
    <div>
    원하는 크루가 없나요?
    </div>
    <router-link to="/createParty">
      <a style="padding-top: 0.4rem;color: black;text-underline: none;font-weight: lighter">직접 크루를 모집해보세요</a>
    </router-link>
  </div>

  <div class="message" v-if="isLoaded && this.partyCrew.length === 0">
    <div>
      주변에서 크루를 찾을 수 없습니다.
    </div>
    <router-link to="/createParty">
      <a style="padding-top: 0.4rem;color: black;text-underline: none;font-weight: lighter">직접 크루를 모집해보세요.</a>
    </router-link>
  </div>

  <!-- Modal -->
<!--  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">-->
  <teleport to="body">
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="staticBackdropLabel">{{ partyDetail.name }}</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
              <tr>
                <th scope="row">선호 시간</th>
                <td>{{ toHour(partyDetail.preferredTime) }}</td>
              </tr>
              <tr>
                <th scope="row">선호 요일</th>
                <td>{{ toDay(partyDetail.preferredDay) }}</td>
              </tr>
              <tr>
                <th scope="row">선호 가격</th>
                <td>{{ partyDetail.preferredPrice }}원 / 1회</td>
              </tr>
              <tr>
                <th scope="row">선호 횟수</th>
                <td>{{ partyDetail.preferredHowMany }}회</td>
              </tr>
              <tr>
                <th scope="row">현재 참가자</th>
                <td>{{ partyDetail.memberCount }}명</td>
              </tr>
              <tr>
                <th scope="row">리더 닉네임</th>
                <td>{{ (partyDetail.leader != null) ? partyDetail.leader.nickname : "" }}</td>
              </tr>

              <tr>
                <th scope="row">크루 모집 글</th>
                <td>{{ partyDetail.description }}</td>
              </tr>
              </tbody>
            </table>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" class="btn btn-primary" @click="joinPartyCrew">참여하기</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>


</template>

<script>
import {LocationUtils} from "@/util/locationUtil";
import {Party as Party} from "@/api/party";
import $ons from "vue-onsenui";
import {StringBitConverter} from "@/util/StringBitConverter";

export default {
  name: "FindCrewView",
  data() {
    return {
      myLocation: {
        lat: 0,
        lng: 0,
        distance: 3000,
      },
      isLoaded : false,
      partyCrew : [],
      markers: [],
      partyDetail: {},
    };
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
      Party.fetchPartyCrew(this.myLocation.lat, this.myLocation.lng, this.myLocation.distance).then(res => {
        if (res.status !== 200){
          $ons.notification.alert(res.data['detail']);
        } else {
          this.partyCrew = res.data;
          LocationUtils.displayMarker(this, this.markers, this.partyCrew.map(party => { return {lat: party.point.lat, lng: party.point.lng, name: party.name}}));
          console.info(this.partyCrew);
        }
        this.isLoaded = true;
      })
    },

    joinPartyCrew() {
      $ons.notification.confirm('참여하시겠습니까?')
          .then((response) => {
            if (response == 1) {
              Party.joinPartyCrew(this.partyDetail.id).then(res => {
                if (res.status === 204){
                  $ons.notification.alert('참여에 성공하였습니다.');
                  this.$router.push({path: "/"});
                }
              })
            }
          });
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
      if (week !== "" && week != null) {
        return StringBitConverter.bitToDay(week)
      } else return "";
    },
    toHour(time){
      if (time !== "" && time != null) {
        return StringBitConverter.bitToHour(time)
      } else return "상관 없음";
    },
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 15rem;
}

.message{
  margin-top : 1.5rem;
}

.modal-body .table td{
  white-space: normal;
}
</style>