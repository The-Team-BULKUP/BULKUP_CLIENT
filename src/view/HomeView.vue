<template>
  <div class="padding-content">
      <v-ons-card>
<!--        <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">-->
        <div class="title">
          내가 가입한 크루
        </div>
        <div class="content">
          <v-ons-list>
<!--            <v-ons-list-header>Bindings</v-ons-list-header>-->
            <v-ons-list-item v-for="partyIn in myPartyIn" :key="partyIn">

              <div class="left" style="display: block;text-align-last: center;">
                <div v-if="partyIn.trainer != null">
                    <img id="trainer_profile" class="list-item__thumbnail" style="width:4rem !important; height: 5rem" :src="`data:image/png;base64,${partyIn.trainer.profileImg}`" alt="trainer profile">
                    <div style="padding-top: 0.5rem;">{{partyIn.trainer.realName}}<br/> 트레이너</div>
                </div>
                <div v-else>
                  <svg  class="list-item__thumbnail" style="width:4rem !important; height: 5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M32 48C32 21.49 53.49 0 80 0C106.5 0 128 21.49 128 48C128 74.51 106.5 96 80 96C53.49 96 32 74.51 32 48V48zM118.3 128C130.1 128 143.5 130.5 155.2 135.4L289.3 191.2C302.6 171.1 320.1 156.6 342.7 146.9L353.7 142C374.5 132.8 396.1 128 419.7 128C464.3 128 504.5 154.8 521.6 195.9L536.1 232.7L558.3 243.4C574.1 251.3 580.5 270.5 572.6 286.3C564.7 302.1 545.5 308.5 529.7 300.6L503 287.3C492.7 282.1 484.6 273.4 480.2 262.8L470.6 239.8L451.3 305.3L500.8 359.4C506.2 365.3 510.1 372.4 512 380.2L535 472.2C539.3 489.4 528.9 506.8 511.8 511C494.6 515.3 477.2 504.9 472.1 487.8L450.9 399.6L380.3 322.5C365.5 306.4 359.1 283.9 365.6 262.8L382.5 199.3C381.6 199.7 380.6 200.1 379.7 200.5L368.7 205.4C353.4 212.2 341.4 224.6 335.2 240.1L333.7 243.9C328.6 256.7 316.1 264.4 303 263.1C299.2 263.9 295.4 263.1 291.7 261.5L173.3 212.2L231.2 473.1C235.1 490.3 224.2 507.4 206.9 511.2C189.7 515.1 172.6 504.2 168.8 486.9L138.8 352H123.1L143.6 474.7C146.5 492.2 134.7 508.7 117.3 511.6C99.83 514.5 83.34 502.7 80.44 485.3L56.35 340.8C50.48 347.6 41.75 352 32 352C14.33 352 0 337.7 0 319.1V191.1C0 156.7 28.65 127.1 64 127.1L118.3 128zM416 48C416 21.49 437.5 0 464 0C490.5 0 512 21.49 512 48C512 74.51 490.5 96 464 96C437.5 96 416 74.51 416 48V48zM356.7 344.2L397.4 388.6L382.9 424.8C380.5 430.9 376.9 436.4 372.3 440.9L310.6 502.6C298.1 515.1 277.9 515.1 265.4 502.6C252.9 490.1 252.9 469.9 265.4 457.4L324.7 398L349.7 335.6C351.8 338.6 354.2 341.4 356.7 344.2H356.7z"/></svg>
                    <div style="padding-top: 0.5rem;">트레이너<br/>배정안됨</div>
                </div>
              </div>

              <div class="center">
                <div v-if="partyIn.partyType === 'crew'">
                  <div class="list-item__title">&lt;그룹피티></div>
                  <div class="list-item__title">{{partyIn.name}} 팀</div>
                </div>
                <div v-else>
                  <div class="list-item__title">&lt;개인피티></div>
                </div>

                <span class="list-item__title"></span>

                <div v-if="partyIn['trainer'] != null">
                  <span class="list-item__subtitle">{{partyIn.trainer.gym.gymName}} 체육관</span>
                </div>
              </div>

              <div class="right">
                <div style="margin-bottom: auto;">
                <div v-if="partyIn.trainer != null">
                  <div class="dropdown show">
                    <a class="btn btn-secondary" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <v-ons-icon icon="md-more"></v-ons-icon>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="dropdown show">
                    <a class="btn btn-secondary" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <v-ons-icon icon="md-more"></v-ons-icon>
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </v-ons-list-item>
          </v-ons-list>

          <div v-if="myPartyIn == null ">
              <span>
                가입한 크루가 없습니다.<br/>
                크루를 찾아보세요!
              </span>
          </div>

        </div>
      </v-ons-card>

    <div v-if="this.Auth.getters.isLogin === false">
      <br/>
      로그인 후 피티모아의 모든 서비스를 이용해 보세요!<br/>
      <router-link to="/signup">
        <a style="padding-top: 0.4rem;color: black;text-underline: none;text-decoration: underline;">👉🏼로그인 / 회원가입 하러 가기👈🏻</a>
      </router-link>
    </div>

    </div>

</template>

<script>
import {Party} from "@/api/party";

export default {
  name: "HomeView.vue",
  data(){
    return {
      myPartyIn : null,
    }
  },
  created() {
    Party.fetchMyPartyIn().then(res => {
      console.log(res);
      if (res.status === 200) {
        if (res.data.myParty != null)
          this.myPartyIn = res.data.myParty;
      }
    });
  }
}
</script>

<style scoped>

</style>