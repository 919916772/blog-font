<template>
  <div  class="container" id="container">
    <div class="login" id="login">
      <div class="title">欢迎登录</div>
      <div class=""></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        activeName:'usernameLogin',
        input:'',
        show:false,
        camera:'',
        scene:'',
        renderer:'',
        mesh:'',
        geometry:'',
        material:'',
        mouseX:0,
        mouseY:-8.75,//233.75
        start_time:new Date().getTime(),
      }
    },
    methods: {
      // 初始化图形
      init() {
        let container = document.getElementById('container');
        document.body.appendChild( container );
        this.camera = new THREE.Camera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
        this.camera.position.z = 6000;
        this.scene = new THREE.Scene();
        this.geometry = new THREE.Geometry();

        var texture = THREE.ImageUtils.loadTexture( 'static/cloud10.png' );
        texture.magFilter = THREE.LinearMipMapLinearFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

        var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );
        // 创建材质
        this.material = new THREE.MeshShaderMaterial({ uniforms: {
            "map": { type: "t", value:2, texture: texture },
            "fogColor" : { type: "c", value: fog.color },
            "fogNear" : { type: "f", value: fog.near },
            "fogFar" : { type: "f", value: fog.far },
          },
          vertexShader: document.getElementById( 'vs' ).textContent,
          fragmentShader: document.getElementById( 'fs' ).textContent,
          depthTest: false
        });

        var plane = new THREE.Mesh( new THREE.Plane( 64, 64 ) );
        for ( let i = 0; i < 8000; i++ ) {
          plane.position.x = Math.random() * 1000 - 500;
          plane.position.y = - Math.random() * Math.random() * 200 - 15;
          plane.position.z = i;
          plane.rotation.z = Math.random() * Math.PI;
          plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
          GeometryUtils.merge( this.geometry, plane );
        }

        this.mesh = new THREE.Mesh( this.geometry,this. material );
        this.scene.addObject(this.mesh);

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position.z = -8000;
        this.scene.addObject(this.mesh);

        // 创建web渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: false })
        // 设置渲染器的大小
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        // 将渲染器的dom放入到dom的容器中
        container.appendChild(this.renderer.domElement);
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.render();
      },
      render() {
        var position = ( ( new Date().getTime() - this.start_time ) * 0.03 ) % 8000;
        this.camera.position.x += ( this.mouseX - this.camera.target.position.x ) * 0.01;
        this.camera.position.y += ( - this.mouseY - this.camera.target.position.y ) * 0.01;
        this.camera.position.z = - position + 8000;
        this.camera.target.position.x = this.camera.position.x;
        this.camera.target.position.y = this.camera.position.y;
        this.camera.target.position.z = this.camera.position.z - 1000;
        this.renderer.render( this.scene, this.camera );
      },
      handleClick(tab, event) {

      }
    },
    mounted() {
      this.init()
      this.animate()
      /* setTimeout(()=>{
         this.mouseY =-8.75;
       }, 3000);*/
    },
  }
</script>


<style scoped>
  .container{
    width: 100vw;
    height: 100vh;
    background-color: #326696;
  }
  .login{
    width: 300px;
    height: 360px;
    background: #35394a;
    position: absolute;
    padding: 80px 40px 40px 40px;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    opacity: 1; /*0*/
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
    animation:loginBorder 10000ms ease;
    animation-fill-mode:forwards;
    animation-delay:4s;
    display: flex;
    flex-direction: column;
  }
  /*@keyframes loginBorder{
    0%{opacity: 0;}
    20%{opacity: 0.2;}
    40%{opacity: 0.4;}
    60%{opacity: 0.6;}
    80%{opacity: 0.8;}
    100%{opacity:1;}
  }*/
  .title{
    color: #D3D7F7;
    height: 60px;
    font-size: 23px;
    text-align: center
  }


</style>

