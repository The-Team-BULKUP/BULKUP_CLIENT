<template>
    <div :class="isLoaded ? 'map' : 'map padding-content' ">
      <div id="map">
        <div v-if="!isLoaded" style="horiz-align: center">
          <br/>
          인근 헬스장과<br/>
          트레이너를 찾고있습니다.<br/>
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
<!--          <v-ons-button @click="myLocation.distance = 50000"  modifier="quiet" :class="(this.myLocation.distance === 50000) ? 'distance-selected button button&#45;&#45;quiet' : 'distance button button&#45;&#45;quiet'   ">50km</v-ons-button>-->
        </v-ons-col>
      </div>
    </div>

  <div class="page__content" v-if="isLoaded" style="top: 18rem; !important; padding-top: 0; bottom: 5.3rem !important;">
    <div v-if="this.trainerList.length === 0" style="padding-top:1rem">
      주변에 트레이너가 없습니다.<br/>
      선호 거리를 늘려주세요.
    </div>
  <div v-else class="board_list_wrap">
    <table class="board_list">
      <tbody>
      <tr v-for="trainer in trainerList" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  @click="trainerDetail = trainer" :key="trainer">
        <td>
<!--          <img class="profile_img" src="">-->
          <img id="trainer_profile" class="list-item__thumbnail" style="width:4rem !important; height: 5rem" :src="`data:image/png;base64,${trainer.profileImg}`" alt="trainer profile">
        </td>
        <td class="title">
          <span class="name">{{trainer.realName}}</span><span class="info"> 트레이너 </span><br/>
<!--          <div class="account">바디프로필 전문 트레이너</div>-->
          <span class="count"> 1회 </span><span class="cost"> {{ trainer.pricePer }}원 </span>
          <div class="location">{{ trainer.gym.gymName }} - {{trainer.distance.toFixed() }}m</div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>

  <teleport to="body">
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="staticBackdropLabel">{{ (!!trainerDetail) ? (trainerDetail.realName) : '' }} 트레이너</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div v-if="!!trainerDetail" class="modal-body" style="text-align: -webkit-center;">
            <div class="row col-12">
              <img v-if="!!trainerDetail" :src="trainerDetail.gym.gymPhoto">
            </div>
            <table class="table">
              <tbody>
              <tr>
                <th scope="row">소속 헬스장</th>
                <td>{{ (trainerDetail.gym.gymName) }}</td>
              </tr>
              <tr>
                <th scope="row">소개말</th>
                <td style="white-space: pre-wrap;">{{trainerDetail.introduce}}</td>
              </tr>
              <tr>
                <th scope="row">가격</th>
                <td>{{ Number(trainerDetail.pricePer).toLocaleString() }}원 / 1회</td>
              </tr>
              </tbody>
            </table>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" class="btn btn-primary" @click="askForTrainer(trainerDetail.id)">문의 하기</button>
            <!--            <button v-show="this.Auth.isTrainer" type="button" class="btn btn-primary" @click="joinPartyCrew">협의하기</button>-->
          </div>
        </div>
      </div>
    </div>
  </teleport>

</template>

<script>
import {LocationUtils} from "@/util/locationUtil";
import {Trainer} from "@/api/trainer";

export default {
  name: "FindTrainerView",
  data(){
    return {
      myLocation: {
        lat: 0,
        lng: 0,
        distance: 3000,
      },
      trainerList : [],
      trainerDetail : null,
      isLoaded: false,
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
      this.getTrainerList();
      this.map.relayout();
    },
  },
  mounted: function (){
    LocationUtils.getLocation().then(res => {
      this.myLocation.lat = res.coords.latitude;
      this.myLocation.lng = res.coords.longitude;
      LocationUtils.initMap(this);
      this.getTrainerList();
    });
  },
  methods: {
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
    getTrainerList(){
      const params = `?lat=${this.myLocation.lat}&lng=${this.myLocation.lng}&distance=${this.myLocation.distance}`;
      Trainer.fetchTrainerByDistance(params).then(res => {
        if (res.status === 200) {
          this.trainerList = res.data.trainerList;
          console.log(this.trainerList);
        }
      });
    },
    askForTrainer(trainerId){
      console.info(trainerId);
      alert('채팅이랑 연결');
    }
  },
};
</script>

<style scoped>
#map {
  width: 23.4rem;
  height: 5rem;
}

.dropdown{

}

.board_list_wrap{
  overflow-y: scroll;
}

.board_list_wrap .board_list .dropdown{

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

.board_list_wrap {
  padding: 1rem;
}

.board_list {
  width: 100%;
  border-top: 0.01rem solid black;
  padding: 4rem;
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
