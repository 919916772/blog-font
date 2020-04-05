<template>
    <div class="sky">
      <div class="clouds_one" :style="{backgroundImage:'url(' +backImg1 + ')'}"></div>
      <div class="clouds_two" :style="{backgroundImage:'url(' +backImg2 + ')'}"></div>
      <div class="clouds_three" :style="{backgroundImage:'url(' +backImg3 + ')'}"></div>
    </div>
</template>

<script>
    export default {
        name: "cloudBoard",
      data(){
          return{
            backImg1:'' + require('../assets/cloud_one.png') + '',
            backImg2:'' + require('../assets/cloud_two.png') + '',
            backImg3:'' + require('../assets/cloud_three.png') + ''
          }
      }

    }
</script>

<style scoped>
  .sky {
    height: 400px;
    background: #007fd5;
    position: relative;
    overflow: hidden;
    -webkit-animation: sky_background 50s ease-out infinite;
    -moz-animation: sky_background 50s ease-out infinite;
    -o-animation: sky_background 50s ease-out infinite;
    animation: sky_background 50s ease-out infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .clouds_one {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_one 50s linear infinite;
    -moz-animation: cloud_one 50s linear infinite;
    -o-animation: cloud_one 50s linear infinite;
    animation: cloud_one 50s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .clouds_two {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_two 75s linear infinite;
    -moz-animation: cloud_two 75s linear infinite;
    -o-animation: cloud_two 75s linear infinite;
    animation: cloud_two 75s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .clouds_three {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_three 100s linear infinite;
    -moz-animation: cloud_three 100s linear infinite;
    -o-animation: cloud_three 100s linear infinite;
    animation: cloud_three 100s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  @-webkit-keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }
    50% {
      background: #000;
      color: #a3d9ff
    }
    100% {
      background: #007fd5;
      color: #007fd5
    }
  }
  @-moz-keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }
    50% {
      background: #000;
      color: #a3d9ff
    }
    100% {
      background: #007fd5;
      color: #007fd5
    }
  }
  @keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }
    50% {
      background: #000;
      color: #a3d9ff
    }
    100% {
      background: #007fd5;
      color: #007fd5
    }
  }

  @-webkit-keyframes cloud_one {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  @-moz-keyframes cloud_one {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  @keyframes cloud_one {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }

  @-webkit-keyframes cloud_two {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  @-moz-keyframes cloud_two {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  @keyframes cloud_two {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }

  @-webkit-keyframes cloud_three {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  @-moz-keyframes cloud_three {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  @keyframes cloud_three {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
</style>
