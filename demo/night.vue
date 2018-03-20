<template>
  <div id="night" :style="iStyle.mainBg" v-show="isLoad">
    <div class="top-area">
        <img :src="'./static/imgs/bet/night/top_night.jpg'" alt="">
        <div class="bet-reward">
          <div class="content">
           <h3 class="flex-center">100, 000 <span>爱钻</span></h3>
            <p>
              <span class="big-bet-btn"><img :src="'./static/imgs/bet/my_bet_btn.png'"></span>
            </p>
          </div>
        </div>
    </div>
    <top></top> 
    <rank :list="list" :currentAnchor="currentAnchor"  ref="rank"
          :first_day ="first_day"
          :second_day = "second_day"
          :showCountDown="showCountDown"
          :remainTime="remainTime"
          :isHasCurrent="isHasCurrent"></rank> 
     <!-- 历史赢家 -->
    <div class="winner-box">
      <div class="income-winner">
        <div class="user-info">
          <a href="#">
            <img :src="'./static/imgs/head.png'">
          </a>
          <p class="user-name one-line">烈马的草原</p>
          <h3>当轮获得 <span>12345678</span> 爱钻收礼</h3>
        </div>
      </div>
      <div class="bet-winner">
        <div class="user-info">
          <a href="#">
            <img :src="'./static/imgs/head.png'">
          </a>
          <p class="user-name one-line">烈马的草原</p>
          <h3>总计获得 <span>12345678</span> 爱钻奖金</h3>
        </div>
      </div>
    </div>
    <div class="anchor-self" v-if="showCurrentAnchor">
      <div class="current-row" :href="'loveshow://' + (currentAnchor.online == 1 ? 'room?rid=' + currentAnchor.rid : 'userinfo?tuid=' + currentAnchor.uid)">
          <div class="ceil1"> 3 </div>
          <div class="ceil2">
            <a :href="'loveshow://' + (currentAnchor.online == 1 ? 'room?rid=' + currentAnchor.rid : 'userinfo?tuid=' + currentAnchor.uid)">
              <img v-lazy="currentAnchor.head || defaultHead" >
              <img v-lazy="'./static/imgs/online.png'"  v-show="currentAnchor.online == 1">
            </a>
          </div>
          <div class="ceil3">
            <p class="name">{{currentAnchor.nick}}</p>
            <p class="aidou one-line">爱豆数: <span>{{currentAnchor.aidou}}</span></p>
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
     <div class="refresh" @click="refresh">
      <img v-lazy="'./static/imgs/refresh.png'" >
    </div> 
    <div class="bottomBugDiv"></div> 
  </div>
</template>

<script>
/* eslint-disable */
import CGI from '../lib/cgi';
import config from '../lib/config';
import axios from 'axios';
import Rank from '@/components/rank_night';
import Top from '@/components/Top';
import mainBg from '@/assets/imgs/night/body_bg.png';

export default {
  name: 'app',
  components: {
    Rank,
    Top,
  },
  data() {
    return {
      defaultHead: 'http://static.live.nagezan.net/live/fb284641-a4a6-4a2f-b596-abfb49ba037c.png',
      isTest: true,
      loadingShow: false,
      showCountDown: false,
      isHasCurrent: false,
      noData: false,
      isLoad: false,
      list: [],
      first_day: {},
      second_day: {},
      iStyle: {
        mainBg: {
          backgroundImage: `url(${mainBg})`,
          backgroundSize: '100% auto',
        },
      },
      remainTime: {
        time: 0,
      },
      // 当前主播用户信息
      currentAnchor: {},
    };
  },
  computed: {
    showCurrentAnchor() {
      return true || this.isHasCurrent; //测试使用
    },
  },
  created() {
    this.getData();
    this.getHistory();
  },
  methods: {
    getData() {
      let params = '';
      let uid = CGI.getParams('uid');
      //参数要以字符串的形式
      if(uid) {
        params = `uid=${uid}`;
      }
      const host = config.isTest ? config.CGI_Test : config.CGI;
      /*eslint-disable func-names*/
      axios.post(`${host}/v1/hourrank/get_hour_rank.json`, params, {
        //POST 请求必须加上这个配置
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then((resp) => {
        if (resp.data.error_code ===1) {
          this.loadingShow = false;
          const list = resp.data.data;
          list.top_users && CGI.addLazy(list.top_users, 'avatar');
          this.noData = this.list && this.list.length === 0;
          // 是否为黄金小时榜
          this.is_gold = list.is_gold === 1;
          /* global hourListTime */
          // 二次校验
          if (!this.is_gold && hourListTime === 'night') {
            this.$router.push('/day');
          }
          if (this.is_gold && hourListTime === 'day') {
            this.$router.push('/night');
          }
          this.isHasCurrent = !(list.current_user === undefined);
          this.list = list.top_users || [];
          // this.currentAnchor = list.current_user ;
           // 测试使用
          this.currentAnchor = {
            aidou: 134343,
            avatar: '"http://static.live.nagezan.net/0c759c0b-7776-4db1-bb49-f2ad958266a7.jpg',
            nick: '新人喵小雨🐱',
            online: 1,
            rid: 133750,
            uid:17385155
          } ;

          this.is_count_down = list.is_count_down;

          this.isLoad = true;

          if (this.is_count_down ===1) {
            this.showCountDown = true;
            this.countDown(list.rest_seconds);
          }else {
            this.showCountDown = false;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    // 历史榜单
    getHistory() {
      const params = {
        campaign: 'campaign20170125',
        uid: 190614445,
      };
      /*eslint-disable func-names*/
      const host = config.isTest ? config.CGI_Test : config.CGI;
      axios.post(`${host}/v1/hourrank/get_recent_hour_rank.json`, params, {
        //POST 请求必须加上这个配置
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.error_code ===1) {
          let list = resp.data && resp.data.data;
          if (list.first_day && list.first_day.rank_detail && list.first_day.rank_detail.length > 0) {

            for (let i = 0;i < list.first_day.rank_detail.length; i+=1) {
                if (list.first_day.rank_detail[i].top_users.length > 0) {
                  CGI.addLazy(list.first_day.rank_detail[i].top_users, 'avatar');
                }
            }

          }
          if (list.second_day && list.second_day.rank_detail && list.second_day.rank_detail.length > 0) {

            for (let i = 0;i < list.second_day.rank_detail.length; i+=1) {
                if (list.second_day.rank_detail[i].top_users.length > 0) {
                  CGI.addLazy(list.second_day.rank_detail[i].top_users, 'avatar');
                }
            }

          }
          this.first_day = list.first_day;
          this.second_day = list.second_day || {};
          // this.second_day = this.first_day; // 测试使用
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    refresh() {
      this.loadingShow = true;
      this.getData();
      this.getHistory();
    },
    countDown(leftTime) {
      clearInterval(this.timer);
      this.remainTime.time = parseInt(leftTime, 10);
      this.timer = setInterval(() => {
        CGI.remainInterval(this.remainTime);
      }, 1000);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
}
body,html,p,h3{
  margin:0;
  padding:0;
}
body{
  background:#fff;
  max-width: 520px;
  margin:0 auto;
}
body,html{
  
}
img {
  width:100%;
  vertical-align: top;
  pointer-events: none;
}
a{
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  display: inline-block;
  color: #2d2a3b;
}
.one-line{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
[v-cloak]{
  display: none;
}
.refresh {
    position: fixed;
    width: 2.1rem;
    right: 0;
    top: 8rem;
    z-index: 5;
}
#loading {
    position: fixed;
    top: 14rem;
    left: 50%;
    margin-left: -35px;
    width: 70px;
    z-index: 9999;
}
#loading img:nth-child(2){
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    animation: loading 1s linear infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
<style lang="scss">
   @import '../lib/function';
  .bottomBugDiv{
    padding-top: rem(40,18.75);
  }
  // 竞猜:
  .flex-center {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
  }
  #night {
    padding-bottom: rem(60);
    .top-area {
      position: relative;
      .bet-reward {
        width: rem(550);
        height: rem(218);
        position: absolute;
        z-index: 1;
        left: 50%;
        margin-left: rem(-275);
        bottom:  rem(30);
        background: url($picUrl + 'bet/night/quiz_money_wrap.png?1') no-repeat 0 0;
        background-size: 100%;
        h3 {
          color: #ffc706;
          font-size: rem(70);
          height: rem(70);
          span {
           color: #262626;
           font-size: rem(40);
          }
        }
        p {
          margin-top: rem(10);
        }
      }
      .content {
        padding-top: rem(36, 18.75);
      }
      .big-bet-btn {
        width: rem(142);
        height: rem(42);
        > img {
         width: rem(142);
         height: rem(42);
        }
      }
    }
    .winner-box {
      width: rem(680);
      margin: 0 auto;
      position: relative;
      z-index: 2;

      .income-winner {
        height: rem(325);
        background: url($picUrl + 'bet/night/winner_income_bg.png') no-repeat 0 0;
        background-size: 100%;
      }
      .bet-winner {
        margin-top: rem(12);
        height: rem(325);
        background: url($picUrl + 'bet/night/winner_bet_bg.png') no-repeat 0 0;
        background-size: 100%;
      }
      .user-info {
        width: rem(500);
        margin: 0 auto;
        padding-top: rem(94);
        img {
          width: rem(120);
          height: rem(120);
          border-radius: 999rem;
        }
        p {
          width: rem(283);
          height: rem(57);
          padding: 0 rem(30);
          position: relative;
          z-index: 4;
          line-height: 1.92rem;
          margin: rem(-30) auto;
          background: url($picUrl + 'bet/night/winner_name_bg1.png') no-repeat 0 0;
          background-size: 100%;
          font-size: rem(30);
          color: #fff;
        }
        h3 {
          font-size: rem(30);
          color: #000;
          margin-top: rem(40);
          > span {
            color: #ffc706;
          }
        }
      }
    }
    .official-tip {
      padding: rem(10);
      color: #fff;
      font-size: rem(24);
    }
    .anchor-self {
      position:fixed;
      z-index: 5;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #fff;
    }
    .current-row {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      padding: 0 rem(11) 0 rem(29);
      font-size: rem(15, 18.75);
      height: rem(120);
      margin: 0 rem(3,18.75);
      color: #680f20;
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
    .current-row {
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