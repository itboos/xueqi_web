<template>
  <div class="rank">
     <div class="tab">
       <div class="left" @click="changeTab(0)">
          <img  :src="'./static/imgs/night/left_btn1.png'" v-show="tabIndex === 0">
          <img  :src="'./static/imgs/night/left_btn2.png'"  v-show="tabIndex === 1">
       </div>
       <div class="right" @click="changeTab(1)">
          <img  :src="'./static/imgs/night/right_btn1.png'"  v-show="tabIndex === 0">
          <img  :src="'./static/imgs/night/right_btn2.png'"  v-show="tabIndex === 1">
       </div>
     </div>
     <img  :src="'./static/imgs/night/rank_title.png'" v-if ="tabIndex === 0" class="rank-title-img">
     <img  :src="'./static/imgs/night/rank_title2.png'"  v-if ="tabIndex === 1" class="rank-title-img">
     <!-- 当前榜单 -->
     <div class="rank-now" v-if="tabIndex === 0">
       <div class="rank-body" :style="iStyle.rankBg" :class="!isSpecialState ? 'min-height': ''">
         <div   v-for="(row,index) in templist" class="one-row" :key="index">
            <div class="row" :href="'loveshow://' + (row.online == 1 ? 'room?rid=' + row.rid : 'userinfo?tuid=' + row.uid)">
              <div class="ceil1">{{index+1}} </div>
              <div class="ceil2">
                <a :href="'loveshow://' + (row.online == 1 ? 'room?rid=' + row.rid : 'userinfo?tuid=' + row.uid)">
                  <img v-lazy="row.head || defaultHead" >
                  <img v-lazy="'./static/imgs/online.png'"  v-show="row.online == 1">
                </a>
              </div>
              <div class="ceil3">
                <p class="name">{{row.nick}}</p>
                <p class="aidou one-line">爱豆数: <span>{{row.aidou}}</span></p>
              </div>
              <div class="ceil4 one-line">
                <p>
                  <span class="sbtn">
                    <img v-lazy="'./static/imgs/bet/btn_now.png'">
                  </span>
                </p>
                <p class="flex-center">
                  已投注额:<span class="one-line">123456</span>
                </p>
              </div>
            </div>
         </div>

          <div class="bet-others" v-if ="!isSpecialState">
            <span class="bet-btn">
                <img v-lazy="'./static/imgs/bet/bet_other.png'">
              </span>
          </div>
       </div>
        <!-- 特殊状态提示 -->
      <div class="rank-body tip-center min-height" :style="iStyle.rankBg" v-if="isSpecialState">
         <div class="no-data" v-if="isMounted && noDataTab1">
            <img v-lazy="'./static/imgs/no-data.png?1'" >
          </div>
          <div class="no-data" v-if="isMounted && noDataTab2">
            <img v-lazy="'./static/imgs/no-data.png?1'" >
          </div>
          <div class="count-down" v-if="showCountDown && tabIndex === 0">
              <img v-lazy="'./static/imgs/time-down1.png?1'" >
              <span class="time">{{remainTime.time}}</span>
           </div>
       </div>

       <div  class="rank-bottom">
          <!-- <img v-lazy="'./static/imgs/rank_bottom_bg.png'" v-if="bottomBgShow">  -->
          <img :src="'./static/imgs/night/rank_bottom.png'" v-if="bottomLineShow">
        </div> 
     </div>
     <!-- 当前榜单结束 -->
     <!-- 历史榜单 -->
     <div class="rank-history" v-if="tabIndex === 1">
       <div class="rank-body"  :style="iStyle.rankBg">
         <!-- 今天 -->
        <div class="one-hour" v-for="(hour, index) in second_day.rank_detail" :key="index">
           <div class="time" :style='iStyle.timeBg'>
            <span class="date">{{second_day.date}}</span>
            <span class="time-hour">{{hour.campaign_time}}</span>
           </div>
           <div class="anchors space-between" :class="(hour.top_users && hour.top_users.length < 5) ? 'flex-left': '' ">

             <div  class="one" v-for="(anchor,index) in hour.top_users" :key="index">
               <a  :href="'loveshow://' + (anchor.online == 1 ? 'room?rid=' + anchor.rid : 'userinfo?tuid=' + anchor.uid)">
                 <img v-lazy="anchor.head || defaultHead"  class="head">
                 <img v-lazy="'./static/imgs/night/online.png'"  v-show="anchor.online == 1" class="online">
                 <span class="a_rank">{{index+1}}</span>
               </a>
               <p class="name one-line">{{anchor.nick}}</p>
                <p class="income one-line" v-if="index === 0"><span>1234567</span> 爱豆</p>
               <p class="income one-line hidden" v-else><span>0</span> 爱豆</p>
             </div>

          </div>
         </div>
        <!-- 昨天 -->
         <div class="one-hour" v-for="(hour, index) in first_day.rank_detail" :key="index">
           <div class="time" :style='iStyle.timeBg'>
            <span class="date">{{first_day.date}}</span>
            <span class="time-hour">{{hour.campaign_time}}</span>
           </div>
           <div class="anchors space-between" :class="(hour.top_users && hour.top_users.length < 5) ? 'flex-left': '' ">

             <div  class="one" v-for="(anchor,index) in hour.top_users" :key="index">
               <a  :href="'loveshow://' + (anchor.online == 1 ? 'room?rid=' + anchor.rid : 'userinfo?tuid=' + anchor.uid)">
                 <img v-lazy="anchor.head || defaultHead"  class="head">
                 <img v-lazy="'./static/imgs/night/online.png'"  v-show="anchor.online == 1" class="online">
                 <span class="a_rank">{{index+1}}</span>
               </a>
               <p class="name one-line">{{anchor.nick}}</p>
               <p class="income one-line" v-if="index === 0"><span>1234567</span> 爱豆</p>
               <p class="income one-line hidden" v-else><span>0</span> 爱豆</p>
             </div>

           </div>
         </div>

       </div>
       <img :src="'./static/imgs/rank_bottom.png'">
     </div>
     <div class="official-tip">榜单所有信息以及排名经用户同意展示</div>
  </div>
</template>

<script>
import config from '../lib/config';
import mainBg from '../assets/imgs/night/body_bg.png';
import rankBg from '../assets/imgs/night/rank_body.png';
import timeBg from '../assets/imgs/time_bg.png';

export default {
  name: 'rank',
  props: {
    list: Array,
    first_day: Object,
    second_day: Object,
    currentAnchor: Object,
    remainTime: Object,
    isHasCurrent: Boolean,
    showCountDown: Boolean,
  },
  components: {
  },
  computed: {
    /* eslint-disable no-unused-expressions */
    bottomLineShow() {
      return this.tabIndex === 1 || !this.isHasCurrent;
    },
    bottomBgShow() {
      return this.isHasCurrent && this.tabIndex === 0;
    },
    showCurrentAnchor() {
      return this.isHasCurrent && this.tabIndex === 0;
    },
    noDataTab1() {
      return this.tabIndex === 0 && this.list.length === 0 && !this.showCountDown;
    },
    noDataTab2() {
      return this.tabIndex === 1 && this.prevList.length === 0 && !this.showCountDown;
    },
    isSpecialState() {
      if (this.tabIndex === 0) {
        return this.noDataTab1 || this.showCountDown;
      }
      return this.noDataTab2;
    },
  },
  data() {
    return {
      tabIndex: 0,
      isMounted: false,
      templist: [],
      noData: true,
      isRefresh: false,
      iStyle: {
        rankBg: {
          backgroundImage: `url(${rankBg})`,
          backgroundSize: '100% auto',
          backgroundColor: '#fff',
        },
        mainBg: {
          backgroundImage: `url(${mainBg})`,
          backgroundSize: '100% auto',
        },
        timeBg: {
          background: `url(${timeBg}) no-repeat 0 0`,
          backgroundSize: '100% auto',
        },
      },
      defaultHead: 'http://static.live.nagezan.net/live/fb284641-a4a6-4a2f-b596-abfb49ba037c.png',
    };
  },
  created() {
    setTimeout(() => {
      this.isMounted = true;
    }, 1500);
    //默认显示tab1 的数据  当前榜单有房间主播信息栏，上一小时没有
  },
  watch: {
    list(val, oldval) {
      const temp = val;
      if (temp.length > 0 && temp.length < 10) {
        const count = 10 - temp.length;
        for (let i = 0; i < count; i += 1) {
          temp.push({
            avatar: '',
            aidou: '0',
            nick: '虚位以待',
          });
        }
      }
      if (this.tabIndex === 0) {
        this.templist = temp;
      }
    },
    prevList(val, oldval) {
      const temp = val;
      if (this.tabIndex === 1) {
        this.templist = temp;
      }
    },
  },
  montued() {},
  methods: {
    getData() {},
    changeTab(index) {
      if (this.tabIndex === index) {
        return;
      }
      if (index === 1) {
        this.templist = this.prevList;
      } else if (index === 0) {
        this.templist = this.list;
      }
      this.tabIndex = index;
    },
  },
};
</script>

<style  lang="scss"  scoped>
  @import '../lib/function';
  .space-between {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    // flex-wrap: wrap;
    // -webkit-flex-wrap: wrap;
  }
  .flex-left {
    display: flex;
    display: -webkit-flex;
    justify-content: left;
    -webkit-justify-content: left;
    align-items: center;
    -webkit-align-items: center;
  }
  .rank {
    padding: 0 rem(35,37.5);
    padding-bottom: rem(24);
    position: relative;
    z-index: 2;
    .rank-title-img {
      display: block;
    }
  }
  .tip-center{
    height: rem(300,18.75);
    position: relative;
    .no-data {
      width: rem(471);
      height: rem(156);
      position: absolute;
      left: 50%;
      top:50%;
      margin-top: rem(-78);
      margin-left: rem(-235);
    }
    .count-down {
      position: relative;
      width: rem(569);
      height: rem(57);
      margin: 6rem auto 0;
      .time {
        position: absolute;
        right: rem(40,18.75);
        top: rem(-2, 18.75);
        font-size: rem(26,18.75);
        font-weight: 500;
      }
      img {

      }
    }
  }
  .tab {
    display: flex;
    display: -webkit-flex;
    .left {
      width: rem(354);
    }
    .right {
      width: rem(326);
    }
    img {
      height: rem(72,37.5);
    }
  }
  .rank-bottom {
    position: relative;
    z-index: 4;
    background: transparent;
  }
  .rank-body {
    overflow: auto;
    position: relative;
    margin-top: rem(-3,18.75);
    .one-row:nth-child(2n) .row {
      background:#f5f5f5;
    }
    
  }
  .min-height {
    min-height: 21.33rem;
  }
  .row {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      padding: 0 rem(11) 0 rem(29);
      font-size: rem(15, 18.75);
      height: rem(120);
      margin: 0 rem(3,18.75);
      color:#262626;
      .ceil1 {
        font-family: '微软雅黑';
        font-weight: 500;
        width: rem(40);
        text-align: left;
      }
      .ceil2 {
        position: relative;
        height: rem(106);
        margin-left: rem(15);
        img:nth-child(1) {
          width: rem(82);
          height: rem(82);
          // border: solid 1px #f82f78;
          border-radius: 999rem;
          margin-top: rem(6, 18.75);
        }
        img:nth-child(2) {
          position: absolute;
          left:rem(1);
          bottom: rem(4,18.75);
          width: rem(80);
          height: rem(26);
        }
      }
      .ceil3 {
        margin-left: rem(28);
        width: rem(260);
        text-align: left;
      }
      .ceil4 {
        flex-grow: 1;
        > span {
          color: #fd836a;
        }
        text-align: right;
      }
    }
  .rank-history {
    margin-top: rem(-20, 18.75);
    overflow: auto;
    .rank-body {
      position: relative;
      // height: 400px;
      margin-top: 0;
      .one-row:nth-child(2n) .row {
        background:#f5f5f5;
      }
    }
    .one-hour {
      padding: rem(20) 0 rem(18);
      margin: 0 rem(4);
    }
    .one-hour:nth-child(2n){
      background:#f5f5f5;
    }
    .one {
      width: rem(100);
    }
    .time {
      width: rem(273);
      height: rem(43);
      line-height: rem(44);
      font-size: rem(26);
      font-weight: 500;
      color: #fff;
      margin-left: rem(36);
      text-align: left;
      text-indent: rem(18);
    }
    .time-hour {
      margin-left: rem(6);
      line-height: rem(44);
    }
    .head {
      width: rem(82);
      height: rem(82);
      border-radius: 9999rem;
    }
    .name {
      font-size: rem(18);
      height: rem(34);
      line-height: rem(34);
      margin-top: rem(4);
      color: #262626;
    }
    .income {
      font-size: rem(20);
      color: #680f20;
      span {
       color: #fd836a;
      }
      width: rem(200);
      text-align: left;
    }
    .hidden {
      visibility: hidden;
    }

    a {
      position: relative;
    }
    .a_rank {
      position: absolute;
      top: 0 ;
      right: rem(-10);
      display: inline-block;
      width: rem(30);
      height: rem(30);
      line-height: rem(30);
      border: solid 1px #680f20;
      border-radius: 9999rem;
      background: #ffe3c5;
      font-size: rem(26);
      color: #680f20;
    }
    .online {
      width: rem(80);
      position: absolute;
      bottom: 0 ;
      left: 0;
    }
    .anchors {
      padding: 0 rem(15) 0 rem(15);
      margin-top: rem(24);
    }
  }
  .flex-left .one {
    margin-right: rem(24);
  }
  .official-tip {
    color: #fff;
    font-size: rem(24);
  }
  // 竞猜
  #night {
    .rank-now {
      .bet-others{
        padding: rem(16) 0 rem(0);
        text-align: center;
        img {
          width: rem(225);
          height: rem(56);
        }
      }
    }
    .row {
      color: #680f20;
      span {
        display: inline-block;
      }
      .name {
        font-size: rem(30);
      }
      .aidou {
        font-size: rem(20);
        span {
          color: #fd836a;
          font-size: rem(30);
        }
      }
      .ceil4 {
        text-align: center;
        .sbtn {
          width: rem(90);
          height: rem(42);
          > img {
            width: 100%;
          }
        }
        .flex-center {
          font-size: rem(20);
          margin-top: rem(4);
          align-items: center;
          -webkit-align-items: flex-end;
        }
      }
    }
  }
</style>