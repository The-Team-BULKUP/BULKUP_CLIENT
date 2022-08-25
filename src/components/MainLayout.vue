<template>
<!--  <v-ons-pages>-->
  <TopBar @toggle="toggleSideMenu"></TopBar>

      <v-ons-splitter>
        <v-ons-splitter-side
            class="side"
            swipeable width="100%" collapse="" side="left"
            v-model:open="getOpenSide">

          <v-ons-list v-if="this.Auth.getters.isLogin === true">
            <div v-if="this.Auth.getters.isUser">
              <router-link to="/findCrew">
                <v-ons-list-item
                    tappable modifier="chevron"
                    @click="openSide = false">
                  <div class="center">크루 찾기</div>
                </v-ons-list-item>
              </router-link>

              <router-link to="/createParty">
                <v-ons-list-item
                    tappable modifier="chevron"
                    @click="openSide = false">
                  <div class="center">크루 모집</div>
                </v-ons-list-item>
              </router-link>

              <router-link to="/findTrainer">
                <v-ons-list-item
                    tappable modifier="chevron"
                    @click="openSide = false">
                  <div class="center">트레이너 찾기</div>
                </v-ons-list-item>
              </router-link>

              <v-ons-list-item
                  tappable modifier="chevron"
                  @click="logout">
                <div class="center">로그아웃</div>
              </v-ons-list-item>
            </div>



            <div v-else-if="this.Auth.getters.isTrainer">
              <router-link to="/findCrew">
                <v-ons-list-item
                    tappable modifier="chevron"
                    @click="openSide = false">
                  <div class="center">크루 찾기</div>
                </v-ons-list-item>
              </router-link>

              <v-ons-list-item
                  tappable modifier="chevron"
                  @click="logout">
                <div class="center">로그아웃</div>
              </v-ons-list-item>
            </div>
          </v-ons-list>

          <v-ons-list v-else>
            <router-link to="/login">
              <v-ons-list-item
                  tappable modifier="chevron"
                  @click="openSide = false">
                <div class="center">로그인</div>
              </v-ons-list-item>
            </router-link>

            <router-link to="/signup">
              <v-ons-list-item
                  tappable modifier="chevron"
                  @click="openSide = false">
                <div class="center">회원가입</div>
              </v-ons-list-item>
            </router-link>
          </v-ons-list>

        </v-ons-splitter-side>

        <v-ons-splitter-content>
          <div :class="[openSide ? 'content-hide' : 'content']">
          <router-view></router-view>
          </div>


          <BottomBar @offSide="offSideMenu" :current-page="currentPage"></BottomBar>
        </v-ons-splitter-content>

      </v-ons-splitter>
<!--  </v-ons-pages>-->
</template>

<script>
import TopBar from "@/components/common/TopBar";
import BottomBar from "@/components/common/BottomBar";

export default {
  name: "MainView",
  components : {
    TopBar,
    BottomBar,
  },
  data() {
    return {
      currentPage: 'home',
      openSide: false
    }
  },
  methods: {
    toggleSideMenu() {
      this.openSide = !this.openSide;
    },
    offSideMenu() {
      this.openSide = false;
    },
    logout() {
      this.openSide = false;
      this.Auth.dispatch("doLogout").then(() => {
        this.openSide = true;
      });
    },
  },
  computed: {
    getOpenSide: function () {
      return this.openSide;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        /* router path가 변경될 때마다 서버로 접근로그를 저장한다. */
        console.log(to.path.replace("/", ""));
        this.currentPage = to.path;
      }
    }
  }
}
</script>

<style scoped>
.side {
  margin-top:4rem;
}

.content-hide{
  display: none;
}

.side a {
  color: black;
  text-decoration: none;
  text-underline: none;
}

</style>