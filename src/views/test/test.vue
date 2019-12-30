<template>
<div>
  <canvas ref="myCanvas" />
       <!--层叠放大-->
    <img src="/images/cloud10.png" class="img">
    <img ref="tulip" src="/images/cloud10.png" class="img1">
   <!--  文字淡入-->
   <span  class="imgFont">
     <!--  向上跳跃-->
     <p >无心岁月，旧忆时光</p>
    <img src="/images/cloud10.png" class="img2">
     <!--淡入和倒影-->
  </span>
  <div class="imgBorder">
    <img src="/images/cloud10.png" class="img3">
  </div>

</div>
</template>
<script>
    export default {
        name: "Login",
      data(){
          return{
            context: {}, // canvas对象
          }
      },
      mounted() {
      /*  this.initVideo();*/
        this.initCanvas()
        window.onresize = () => {
          this.initCanvas()
        }
      },
      methods:{
        initCanvas(){
          this.$refs.myCanvas.width =  document.body.clientWidth
          this.$refs.myCanvas.height = document.body.clientHeight
          this.blackToRedToWhite()
          },
        // 定义一个从黑到红再到白的渐变，作为矩形的填充样式：
        blackToRedToWhite(){
          let ctx=this.$refs.myCanvas.getContext("2d");// 获得画布
          let img=this.$refs.tulip

          // 阴影设置
          ctx.shadowBlur= 10;
          ctx.shadowOffsetX=20;
          ctx.shadowOffsetY= 20;
          ctx.shadowColor="black";
          // 样式填充
          let gradient=ctx.createLinearGradient(0,0,170,0);
          gradient.addColorStop("0.1","red");
          gradient.addColorStop("0.25","orange");
          gradient.addColorStop("0.4","yellow");
          gradient.addColorStop("0.6","green");
          gradient.addColorStop("0.8","Indigo");
          gradient.addColorStop("0.9","blue");
          gradient.addColorStop("1.0","purple");
          // 用渐变进行填充
          ctx.strokeStyle=gradient;
          ctx.lineWidth=5;
          ctx.strokeRect(20,20,150,100);
          ctx.scale(0.7,0.7);
          ctx.drawImage(img,400,-50);
        },
       /* initVideo() {
          //初始化视频方法
          let myPlayer = this.$video(myVideo, {
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            autoplay: "muted",
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "800px",
            //设置视频播放器的显示高度（以像素为单位）
            height: "400px"
          });
        }*/
      },
    }
</script>

<style lang="less"  scoped>
  //层叠与放大
  .img{
    float: left;
    height: 100px;
    width: 300px;
    margin: 15px 0;
    -webkit-transition: all 1s ease;
  }
  .img:hover{
    height: 133px;
    width: 400px;
    margin-left: -50px;
  }
  //向上跳跃
    .img1{
      float: left;
      margin: 15px;
      -webkit-transition: margin 0.5s ease-out;
    }
    .img1:hover{
      margin-top: 2px;
  }
  // 文字淡入
  .imgFont{
    float: left;
    width: 730px;
    height: 133px;
    line-height: 0px;
    color: transparent;
    font-size: 50px;
     font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
     text-transform: uppercase;
    transition: all 0.5s ease;
    .img2{
      float: left;
      margin: 0 15px;
    }
  }
  .imgFont:hover{
    line-height: 133px;
    color: #575858;
  }
  // 淡入和倒影
  .imgBorder{
    background-color: black;
    float: right;
    width: 700px;
    height: 700px;
    margin: 0 auto;
     min-height: 300px;
    .img3{
      margin: 25px;
      opacity: 0.8;
      border: 10px solid #eee;
      /*Transition*/
     transition: all 0.5s ease;
      /*Reflection*/
       box-reflect: below 0px gradient(linear, left top, left bottom, from(transparent), color-stop(.7, transparent), to(rgba(0, 0, 0, 0.1)));
  }
   .img3:hover {
     opacity: 1;
     /*Reflection*/
     -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(.7, transparent), to(rgba(0, 0, 0, 0.4)));
     /*Glow*/
     box-shadow: 0px 0px 40px rgba(255, 255, 255, 0.8);
      }
  }

</style>
