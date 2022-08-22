<template>
  <div><div id="map"></div></div>
  <div class="dropdown">
    <select>
      <option value="1">별점순</option>
      <option value="2">거리순</option>
      <option value="3">낮은가격순</option>
    </select>
  </div>
  <div class="board_list_wrap">
    <table class="board_list">
      <caption>트레이너 목록</caption>
      <tbody>
      <tr>
        <td>
          <img class="profile_img" src="./image/image1.png">
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
          <img class="profile_img" src="./image/image2.png">
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
          <img class="profile_img" src="./image/image3.png">
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

</style>
