<template>
  <div :class="isLoaded ? 'map' : 'map padding-content' ">
    <div id="map" style="width: 100%;height: 15rem">
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

  <div class="page__content" style="top: 19rem; !important; padding-top: 0; bottom: 5.3rem !important;">
    <div class="dropdown">
      <select>
        <option value="1">별점순</option>
        <option value="2">거리순</option>
        <option value="3">낮은가격순</option>
      </select>
    </div>
    <div class="board_list_wrap" style="padding: 1rem">
      <table class="board_list" style="width:100%;border-top: 0.01rem solid black;padding: 4rem">
        <caption>트레이너 목록</caption>
        <tbody>
        <tr>
          <td>
            <img class="profile_img" src="@/assets/img/trainer1.png">
          </td>
          <td class="title">
            <span class="name"> 김민지 </span><span class="info"> 트레이너 </span>
            <div class="account">바디프로필 전문 트레이너</div>
            <span class="count"> 1회 </span><span class="cost"> 35,000원 / 10회 </span>
            <div class="location">세모 헬스장 | 수원역 도보 2분</div>
          </td>
        </tr>
        <tr>
          <td>
            <img class="profile_img" src="@/assets/img/trainer2.png">
          </td>
          <td class="title">
            <span class="name"> 김민지 </span><span class="info"> 트레이너 </span>
            <div class="account">바디프로필 전문 트레이너</div>
            <span class="count"> 1회 </span><span class="cost"> 35,000원 / 10회 </span>
            <div class="location">세모 헬스장 | 수원역 도보 2분</div>
          </td>
        </tr>
        <tr>
          <td>
            <img class="profile_img" src="@/assets/img/trainer3.png">
          </td>
          <td class="title">
            <span class="name"> 김민지 </span><span class="info"> 트레이너 </span>
            <div class="account">바디프로필 전문 트레이너</div>
            <span class="count"> 1회 </span><span class="cost"> 35,000원 / 10회 </span>
            <div class="location">세모 헬스장 | 수원역 도보 2분</div>
          </td>
        </tr>
        <tr>
          <td>
            <img class="profile_img" src="">
          </td>
          <td class="title">
            <span class="name"> 김민지 </span><span class="info"> 트레이너 </span>
            <div class="account">바디프로필 전문 트레이너</div>
            <span class="count"> 1회 </span><span class="cost"> 35,000원 / 10회 </span>
            <div class="location">세모 헬스장 | 수원역 도보 2분</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  mounted() {
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
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
      );
      if (positions.length > 0) {
        this.markers = positions.map(
            (position) =>
                new kakao.maps.Marker({
                  map: this.map,
                  position,
                })
        );
        const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
        );
        this.map.setBounds(bounds);
      }
    },
  },
};
</script>

<style scoped>
#map {
  width: 23.4rem;
  height: 5rem;
}


.board_list_wrap{
  overflow-y: scroll;
}

.board_list_wrap .board_list td {
  margin: 1rem;
  padding: 1rem;
}
caption{
  display: none;
}
.board_list_wrap .board_list .profile_img{
  width: 4.5rem;
  height: 6rem;
}
.board_list_wrap .board_list .title .info{
  font-size: 0.8rem;
  color: #999;
}
.board_list_wrap .board_list .title .name {
  font-size: 1.1rem;
}
.board_list_wrap .board_list .title .account{
  font-size: 0.65rem;
}
.board_list_wrap .board_list .title .count{
  font-size: 0.65rem;
}
.board_list_wrap .board_list .title .cost{
  font-size: 0.9rem;
}
.board_list_wrap .board_list .title .location{
  font-size: 0.65rem;
  color: #999;
}
.board_list_wrap .board_list .title{
  font-size: 1.3rem;
  text-align: left;
}

.board_list tr {
  border-bottom: 0.03rem solid #ccc;
  padding: 1rem;
}
#map {
  width: 100%;
  height: 15rem;
}
</style>
