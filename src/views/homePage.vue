<template>
  <div class="homePage">
    <div class="homePageBottom">
      <div class="wave_1"></div>
      <div class="wave_2"></div>
    </div>
    <div class="homePageCenter" :style="backgroundImg">
      <div class="homePageCenter-info">
        <h1 class="info_1">欢迎来到无心的博客</h1>
        <div class="info_2">
          <p class="info2P">莫向外求已无忧，再虑君子慎独愁</p>
          <div class="info2_ico">
            <li v-for="(infoIcon,index) in infoIcons">
              <a :href="infoIcon.href" :target="infoIcon.target" :class="infoIcon.class" :title="infoIcon.title">
                <img :src="infoIcon.imgUrl">
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "homePage",
    data(){
      return{
        activeIndex:'1',
        showNavMenu:'false',
        backgroundImg: {
          backgroundImage:'url(' + require('../assets/backImg.jpg') + ')',
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        },
        infoIcons:[
          {
            id:0,
            href:'https://github.com/919916772',
            target:'_blank',
            class:'social-github',
            title:'github',
            imgUrl:'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/github.png'
          },
          {
            id:1,
            href:'https://music.163.com/#/playlist?id=590386877',
            target:'_blank',
            class:'social-wangyiyun',
            title:'CloudMusic',
            imgUrl:'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/wangyiyun.png'
          },
          {
            id:2,
            href:'tencent://message/?uin=919916772',
            target:'_blank',
            class:'social-tencent',
            title:'tencent',
            imgUrl:'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/qq.png'
          },
          {
            id:3,
            href:'https://me.csdn.net/qq_41791303',
            target:'_blank',
            class:'social-CSDN',
            title:'CSDN',
            imgUrl:'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/csdn.png'
          },
        ]
      }
    },
    created() {
      window.addEventListener('scoll',this.handScroll)
    },
    methods:{

      //创建画布

    }
  }
</script>

<style scoped>
  .homePage{
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur), auto;
    background-position: center;
    overflow:hidden;
  }
  .homePageCenter{
    height: 937px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .homePageCenter-info{
    max-width: 800px;
    text-align: center;
    z-index: 99;
    transition: .4s ease all;
  }
  .info_1{
    background: 50% 100%/50% 50% no-repeat radial-gradient(ellipse at bottom, #fff, transparent, transparent);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 4vw;
    font-family: "Source Sans Pro", sans-serif;
    animation: reveal 3000ms ease-in-out forwards 200ms, glow 2500ms linear infinite 2000ms;
  }
  .info_2{
    width: 63%;
    margin: auto;
    font-size: 16px;
    color: #EAEADF;
    background: rgba(0, 0, 0, .5);
    padding: 15px;
    letter-spacing: 0;
    line-height: 30px;
    border-radius: 10px;
    box-sizing: initial;
    white-space: nowrap;
  }
  @-webkit-keyframes reveal {
    80% {
      letter-spacing: 8px;
    }
    100% {
      background-size: 300% 300%;
    }
  }
  @keyframes reveal {
    80% {
      letter-spacing: 8px;
    }
    100% {
      background-size: 300% 300%;
    }
  }
  @-webkit-keyframes glow {
    40% {
      text-shadow: 0 0 8px #fff;
    }
  }
  @keyframes glow {
    40% {
      text-shadow: 0 0 8px #fff;
    }
  }
  .info2P{
    font-family: Ubuntu, sans-serif;
    font-weight: 700;
  }
  .info2_ico{
    height: 32px;
    list-style: none;
    display: inline-block;
  }
  .info2_ico li{
    float: left;
    margin-right: 25px;
  }
  .info2_ico a{
    color: #e67474;
    transition: color .2s ease-out, border .2s ease-out, opacity .2s ease-out;
    background-color: transparent;
    text-decoration: none;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
  img{
    height: 30px;
    width: 30px;
  }
  .homePageBottom{
    position: absolute;
    height: 110px;
    width: 100%;
    overflow: hidden;
    bottom: 0px;
    z-index: 4;
    transition: .4s ease all;
  }
  .wave_1{
    top: 30px;
    left: -100%;
    opacity: 1;
    animation: water-right 20s infinite linear;
    background: url(https://zouwang.vip/wp-content/uploads/2019/09/wave1.png) repeat-x;
    position: absolute;
    width: 200%;
    height: 100%;
    background-size: 50% 100%;
  }
  .wave_2{
    top: 30px;
    left: 0;
    opacity: 1;
    animation: water-left 30s infinite linear;
    background: url(https://zouwang.vip/wp-content/uploads/2019/09/wave2.png) repeat-x;
    position: absolute;
    width: 200%;
    height: 100%;
    background-size: 50% 100%;
  }
  @keyframes water-right{
    0% {
      transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
      transform: translateX(25%) translateZ(0) scaleY(0.85)
    }
    100% {
      transform: translateX(50%) translateZ(0) scaleY(1)
    }
  }
  @keyframes water-left{
    from{
      transform: translate(0%,0px);
    }
    to{
      transform: translate(-50%,0px);
    }
  }

</style>
