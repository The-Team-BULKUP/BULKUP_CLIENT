<template>
  <div class="padding-content">
    <br/>
    <div class="container">
      <DatePicker :rows="1" is-expanded :attributes="attributes" style="min-width: 95% !important;" v-model="date"/>
      <br/>
      <br/>
        <v-ons-card>
          <div class="card-title">
        {{ date.toLocaleDateString('ko-KR') }}
          </div>
          <div class="card-body">
            <div v-if="selectedDaySchedule.length !== 0">
              <v-ons-list>
                <v-ons-list-item v-for="schedule in selectedDaySchedule" :key="schedule.id">
                  <div class="left">
                    <v-ons-icon icon="md-time"></v-ons-icon>
                  </div>
                  <div class="center">
                    {{ schedule.dates.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} <br/> {{ schedule.dates.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                  </div>
                  <div class="right">
                    <v-ons-icon icon="md-person"></v-ons-icon>
                    {{ schedule.detail.name }}
                  </div>
                </v-ons-list-item>
              </v-ons-list>
            </div>
            <div v-else>
              일정이 없습니다.
            </div>
          </div>
        </v-ons-card>
      <div style="float: right;">
        <b-button v-if="this.Auth.getters.isTrainer" data-bs-toggle="modal" data-bs-target="#staticBackdrop">일정추가</b-button>
      </div>
    </div>
  </div>

  <teleport to="body">
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="staticBackdropLabel">일정 생성</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group" style="">

              <div ><label for="">어떤 일정인가요?</label></div>
              <br/>
              <div style="padding-left:0.5rem"><input type="radio" name="signup_type" value="party" v-model="request.type"> 회원수업
              <input type="radio" name="signup_type" value="extra" v-model="request.type" style="margin-left: 1rem;"> 개인일정</div>
              <br/>
              <input type="text" class="form-control" v-model="request.name"  placeholder="일정명을 입력하세요.">
              <br/>
              <div v-if="request.type === 'party'">
                <div class="row">
                    <label for="">어떤 수업인가요?</label>
                  </div>
                    <v-ons-list>
                      <v-ons-list-item>
                          <v-ons-select v-if="myPartyListForTrainer !== undefined" v-model="request.partyId">
                            <option v-for="(party, index) in myPartyListForTrainer" :key="party" :value="party.id" :selected="index === 0">
                              {{ party.name }}
                            </option>
                          </v-ons-select>
                      </v-ons-list-item>
                    </v-ons-list>
              </div>

              <Date-picker v-model="modal.selectedDate" mode="dateTime" is24hr is-range class="container" show-caps>
              </Date-picker>


              <br/>

            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button v-if="this.Auth.getters.isTrainer" type="button" class="btn btn-primary" @click="createScheduleForTrainer">일정 생성하기</button>
<!--            <button type="button" class="btn btn-primary" @click="createScheduleForTrainer">일정 생성하기</button>-->
            <button v-else type="button" class="btn btn-primary" @click="createScheduleForTrainer">회원</button>
<!--            <button v-else-if="this.Auth.getters.isTrainer" type="button" class="btn btn-primary" @click="consultParty">일정 생성하기</button>-->
          </div>
        </div>
      </div>
    </div>
  </teleport>

</template>

<script>

import {Schedule} from "@/api/schedule";
import {DateFormatUtil} from "@/util/DateFormatUtil";
import $ons from "vue-onsenui";

export default {
  name: "MainView",
  components : {

  },
  data(){
    return{
      date: new Date(),
      schedule : [],
      selectedDaySchedule : [],
      attributes: [],
      request : {
        name : "",
        start : "",
        end : "",
        type : "extra",
        partyId : null,
      },
      modal: {
        masks: {
          input: 'YYYY-MM-DD h:mm',
        },
        selectedDate: {
          start: new Date(),
          end: new Date(),
        }
      },
      myPartyListForTrainer : [],
    }
  },
  computed:{
    getRequest : function(){
      return {
        name : this.request.name,
        start : DateFormatUtil.timestamp(this.modal.selectedDate.start),
        end : DateFormatUtil.timestamp(this.modal.selectedDate.end),
        type : this.request.type,
        partyId : this.request.partyId,
      }
    }
  },
  watch: {
    schedule : {
      handler() {
        this.attributes = [];
        this.schedule.forEach((item) => {
          console.info(item);
          this.attributes.push({
            key: item.id, //item.name,
            detail: {
              name : item.name,
            },
            dot: true,
            dates: { start: new Date(item.start), end: new Date(item.end) }
          })
        })
      },
      deep: true
    },
    date : function (){
      this.refreshSelectedDaySchedule();
    }
  },
  mounted() {
    if (this.Auth.getters.isUser){
      Schedule.fetchMySchedule().then(
        res => {
          if (res.status === 200){
            this.schedule = res.data;
          }
        }
      ).finally(() => {
        this.refreshSelectedDaySchedule();
      })
    } else if (this.Auth.getters.isTrainer){
      Schedule.fetchTrainerSchedule().then(
          res => {
            if (res.status === 200){
              this.schedule = res.data;
            }
          }
      ).finally(() => {
        this.refreshSelectedDaySchedule();
        this.schedule.forEach((item) => {
          if (item.details != null){
            if (this.myPartyListForTrainer.filter(party => party.name === item.details.name).length === 0){
              this.myPartyListForTrainer.push(item.details);
            }
          }
        })
      });
    }
  },
  methods: {
    refreshSelectedDaySchedule() {
      this.selectedDaySchedule = [];
      try {
        this.attributes.forEach((item) => {
          if ((item.dates.start.getFullYear() === this.date.getFullYear() &&
              item.dates.start.getMonth() === this.date.getMonth() &&
              item.dates.start.getDate() === this.date.getDate()) ||
              item.dates.end.getFullYear() === this.date.getFullYear() &&
              item.dates.end.getMonth() === this.date.getMonth() &&
              item.dates.end.getDate() === this.date.getDate()) {
            this.selectedDaySchedule.push(item);
          }
        });
      } catch (e) {
        console.error(e);
      }
    },
    createScheduleForTrainer(){
      if (this.getRequest.name === "") {
        $ons.notification.alert("일정명을 입력해주세요.");
        return;
      }
      if (this.getRequest.start === "") {
        $ons.notification.alert("시작 시간을 입력해주세요.");
        return;
      }
      if (this.getRequest.end === "") {
        $ons.notification.alert("종료 시간을 입력해주세요.");
        return;
      }

      if (this.getRequest.type === "extra") {
        Schedule.makeExtraSchedule(this.getRequest).then(
            res => {
              if (res.status === 201) {
                $ons.notification.alert("일정이 생성되었습니다.");
                this.$router.push({path: "/"});
              }
            }
        )
      } else if (this.getRequest.type === "party") {
        if (this.getRequest.partyId === null) {
          $ons.notification.alert("수업을 선택해주세요.");
          return;
        }
        Schedule.makePartySchedule(this.getRequest).then(
            res => {
              if (res.status === 204) {
                $ons.notification.alert("일정이 생성되었습니다.");
                this.$router.push({path: "/"});
              }
            }
        )
      }
    }
  },
  props: {
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;

& .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
& .vc-weeks {
    padding: 0;
  }
& .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
& .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
&.weekday-1,
&.weekday-7 {
   background-color: #eff8ff;
 }
&:not(.on-bottom) {
   border-bottom: var(--day-border);
&.weekday-1 {
   border-bottom: var(--day-border-highlight);
 }
}
&:not(.on-right) {
   border-right: var(--day-border);
 }
}
& .vc-day-dots {
    margin-bottom: 5px;
  }
}


.justify-start {
  justify-content: flex-start;
}

.flex-col {
  flex-direction: column;
}

.flex {
  display: flex;
}





</style>