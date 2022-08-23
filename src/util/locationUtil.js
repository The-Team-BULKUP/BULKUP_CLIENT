export const LocationUtils = {
    getLocation: async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    },

    isAvailable: async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    },

    initMap(self){
        if (window.kakao && window.kakao.maps) {
            self.initMapFinally();
        } else {
            const script = document.createElement("script");
            /* global kakao */
            script.onload = () => kakao.maps.load(() => self.initMapFinally());
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=45488c69203b6e44b4dbd0576c8b6d56&libraries=services";
            document.head.appendChild(script);
        }
    },

    displayMarker(self, markers, markerPositions) {
        if (markers.length > 0) {
            // this.markers.forEach((marker) => marker.setMap(null));
            markers.forEach((marker) => marker.close());
        }

        if (markerPositions.length > 0) {
            markers = markerPositions.map(
                (position) => {
                    const iwContent = `<div class="marker">${position.name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                        iwPosition = new kakao.maps.LatLng(position.lat, position.lng), //인포윈도우 표시 위치입니다
                        iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

                    new kakao.maps.InfoWindow({
                        map: this.map,
                        position: iwPosition,
                        content: iwContent,
                        removable: iwRemoveable
                    })
                })
        }
    },
}