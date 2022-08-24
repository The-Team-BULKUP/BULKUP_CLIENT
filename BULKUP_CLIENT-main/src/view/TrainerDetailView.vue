<template>
  <div class="company" style="  font-size: 0.8rem;padding: 0 0 0.3rem 0.2rem;float: left">세모 헬스장</div>
  <div id="map" style="  width: 23.4rem;height: 5rem"></div>
  <div class="board_list_wrap" style="padding: 1rem">
    <table class="board_list">
      <caption>트레이너 정보</caption>
      <tbody>
      <tr>
        <td>
          <img style="width: 6rem;height: 8rem;" src="./image/image1.png">
        </td>
        <td class="title" style="font-size: 1.3rem;text-align: left">
          <span class="name" style="font-size: 1.3rem"> 김민지 </span><span class="info" style="font-size: 0.8rem;color: #999"> 트레이너 </span>
          <div class="account" style="font-size: 0.8rem;color: #999; padding-top: 0.3rem">전문분야</div>
          <div class="account_detail" style="font-size: 0.8rem; padding-bottom: 0.3rem">바디프로필 전문 트레이너</div>
          <span class="button">일 정</span><span class="button">문 의</span>
          <v-ons-button modifier="outline" style="width: 8.5rem; height: 1.3rem">회 원 권</v-ons-button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="review_list_wrap">
    <table class="review_list" style="border-collapse:separate;border-spacing: 0 0.3rem">
      <caption>후기 목록</caption>
      <tbody>
      <tr>
        <td class="title" style="font-size: 1.3rem;text-align: left; width: 18rem; border: 0.1rem solid; padding: 0.7rem; border-radius: 0.3rem">
          <img style="float:right;width: 3.5rem; height: 0.7rem" src="./image/star.png">
          <span><img style="width: 2rem;height: 2rem;" src="./image/user_profile.png"></span><span class="name" style="font-size: 1.3rem"> 운동러버 님</span>
          <div class="user_review" style="font-size: 0.8rem">30회 진행할 동안 식단도 꼼꼼히 체크해주시고 운동도 체계적으로 잘 가르쳐 주셨어요 추천합니다.</div>
        </td>
      </tr>
      <tr>
        <td class="title" style="font-size: 1.3rem;text-align: left; width: 18rem; border: 0.1rem solid; padding: 0.7rem; border-radius: 0.3rem">
          <img style="float:right;width: 3.5rem; height: 0.7rem" src="./image/star.png">
          <span><img style="width: 2rem;height: 2rem;" src="./image/user_profile.png"></span><span class="name" style="font-size: 1.3rem"> 운동러버 님</span>
          <div class="user_review" style="font-size: 0.8rem">30회 진행할 동안 식단도 꼼꼼히 체크해주시고 운동도 체계적으로 잘 가르쳐 주셨어요 추천합니다.</div>
        </td>
      </tr>
      </tbody>
    </table>
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

caption{
  display: none;
}

.board_list_wrap .board_list .title .button{
  width: 4rem;
  height: 1.3rem;
  color: #fff;
  background: #004fff;
  font-size: 0.7rem;
  text-align: center;
  border: none;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 0.8rem;
  margin-right: 0.5rem;
}

.board_list {
  width: 100%;
  border-top: 0.01rem solid black;
  padding: 4rem;
}

.board_list tr {
  border-bottom: 0.03rem solid #ccc;
}

.board_list td {
  border-bottom: 0.03rem solid #ccc;
  padding: 1rem 0.5rem 0.5rem 2rem;
  line-height: 1.5;
  vertical-align: center;
}

.review_list_wrap .review_list{
  margin-left: auto;
  margin-right: auto;
}

</style>