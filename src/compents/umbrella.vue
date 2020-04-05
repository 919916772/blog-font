<template>
    <div>
      <div class="umbrellaWrapper">
        <div class="pole"></div>
        <div class="umbrella">
          <div class="triangle triangle-1"></div>
          <div class="triangle triangle-2"></div>
          <div class="triangle triangle-3"></div>
          <div class="triangle triangle-4"></div>
          <div class="triangle triangle-5"></div>
          <div class="triangle triangle-6"></div>
          <div class="triangle triangle-7"></div>
          <div class="triangle triangle-8"></div>
          <div class="triangle triangle-9"></div>
          <div class="triangle triangle-10"></div>
          <div class="triangle triangle-11"></div>
          <div class="triangle triangle-12"></div>
        </div>
        <div class="shadowPole"></div>
        <div class="shadowUmbrella">
          <div class="triangle triangle-1"></div>
          <div class="triangle triangle-2"></div>
          <div class="triangle triangle-3"></div>
          <div class="triangle triangle-4"></div>
          <div class="triangle triangle-5"></div>
          <div class="triangle triangle-6"></div>
          <div class="triangle triangle-7"></div>
          <div class="triangle triangle-8"></div>
          <div class="triangle triangle-9"></div>
          <div class="triangle triangle-10"></div>
          <div class="triangle triangle-11"></div>
          <div class="triangle triangle-12"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "umbrella"
    }
</script>

<style scoped>
  .umbrellaWrapper {
    margin-top: -100px;
    margin-right: -50px;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(70deg) rotateY(-15deg);
  }
  .umbrellaWrapper .shadowPole {
    position: absolute;
    width: 5px;
    height: 50px;
    top: 105px;
    left: 100px;
    background: #ab9038;
    transform-origin: 50% 0%;
    transform: translateZ(-150px) rotateZ(-90deg) rotateZ(-15deg);
    box-shadow: 0 0 2px 1px #ab9038;
    border-radius: 2px;
  }
  .umbrellaWrapper .shadowUmbrella {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 0;
    left: 0;
    border-radius: 50%;
    transform: translateZ(-150px) translateX(120px) translateY(-40px) scale(0.9);
    animation: shadowUmbrella 5s linear infinite;
  }
  .umbrellaWrapper .shadowUmbrella .triangle {
    position: absolute;
    top: 100px;
    left: 77px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 25px 98px 25px;
    border-color: transparent transparent #ab9038 transparent;
    transform-origin: 50% 0;
    box-shadow: 0 0 4px 2px #ab9038;
  }
  .umbrellaWrapper .shadowUmbrella .triangle-1 {
    transform: rotateZ(0deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-2 {
    transform: rotateZ(30deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-3 {
    transform: rotateZ(60deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-4 {
    transform: rotateZ(90deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-5 {
    transform: rotateZ(120deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-6 {
    transform: rotateZ(150deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-7 {
    transform: rotateZ(180deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-8 {
    transform: rotateZ(210deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-9 {
    transform: rotateZ(240deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-10 {
    transform: rotateZ(270deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-11 {
    transform: rotateZ(300deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .shadowUmbrella .triangle-12 {
    transform: rotateZ(330deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .pole {
    position: absolute;
    width: 5px;
    height: 150px;
    top: 100px;
    left: 100px;
    background: #888;
    transform-origin: 50% 0;
    transform: translateZ(-3px) rotateX(-90deg);
    border-radius: 2px;
    z-index: 1;
  }
  .umbrellaWrapper .umbrella {
    position: relative;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    animation: umbrella 5s linear infinite;
    z-index: 2;
  }
  .umbrellaWrapper .umbrella .triangle {
    position: absolute;
    top: 100px;
    left: 75px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 24px 100px 25px;
    border-color: transparent transparent #fff transparent;
    transform-origin: 50% 0;
    z-index: 2;
  }
  .umbrellaWrapper .umbrella .triangle-1 {
    transform: rotateZ(0deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-2 {
    transform: rotateZ(30deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-3 {
    transform: rotateZ(60deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-4 {
    transform: rotateZ(90deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-5 {
    transform: rotateZ(120deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-6 {
    transform: rotateZ(150deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-7 {
    transform: rotateZ(180deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-8 {
    transform: rotateZ(210deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-9 {
    transform: rotateZ(240deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-10 {
    transform: rotateZ(270deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-11 {
    transform: rotateZ(300deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-12 {
    transform: rotateZ(330deg) rotateX(-24deg) translateY(-1px);
  }
  .umbrellaWrapper .umbrella .triangle-1 {
    border-color: transparent transparent #d70606 transparent;
  }
  .umbrellaWrapper .umbrella .triangle-3 {
    border-color: transparent transparent #d70606 transparent;
  }
  .umbrellaWrapper .umbrella .triangle-5 {
    border-color: transparent transparent #d70606 transparent;
  }
  .umbrellaWrapper .umbrella .triangle-7 {
    border-color: transparent transparent #d70606 transparent;
  }
  .umbrellaWrapper .umbrella .triangle-9 {
    border-color: transparent transparent #d70606 transparent;
  }
  .umbrellaWrapper .umbrella .triangle-11 {
    border-color: transparent transparent #d70606 transparent;
  }

  @keyframes shadowUmbrella {
    from {
      transform: translateZ(-150px) translateX(120px) translateY(-40px) scale(0.95) rotateZ(0deg);
    }
    to {
      transform: translateZ(-150px) translateX(120px) translateY(-40px) scale(0.95) rotateZ(360deg);
    }
  }
  @keyframes umbrella {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
</style>
