<template>
  <div class="container" id="container">
    <div class="login" id="login">
      <div class="title">管理员登陆</div>
      <div class="login_row">
        <div class="login_user" style="position: relative">
          <div class="icon"><img src="static/images/user_icon.png"></div>
          <input v-model="username" class="login_input"  placeholder="用户名" type="text" maxlength="16">
        </div>
        <div class="login_user" style="position: relative">
          <div class="icon"><img src="static/images/lock_icon.png"></div>
          <input v-model="password" class="login_input" placeholder="密码" type="password" maxlength="16">
        </div>
          <el-button class="login_button" @click="goLogin()" round>登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {adminLogin} from '../api/adminLogin'
  export default {
    name: "login",
    data() {
      return {
        username:'',
        password:'',
        activeName: 'usernameLogin',
        input: '',
        show: false,
        camera: '',
        scene: '',
        renderer: '',
        mesh: '',
        geometry: '',
        material: '',
        mouseX: 0,
        mouseY: 0,//233.75
        start_time: new Date().getTime(),
        windowHalfX:window.innerWidth / 2,
        windowHalfY: window.innerHeight / 2
      }
    },
    methods: {
      // 初始化图形
      init() {
        let container = document.getElementById('container');
        document.body.appendChild(container);
        this.camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 3000);
        this.camera.position.z = 6000;
        this.scene = new THREE.Scene();
        this.geometry = new THREE.Geometry();

        var texture = THREE.ImageUtils.loadTexture('static/images/cloud10.png');
        texture.magFilter = THREE.LinearMipMapLinearFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

        var fog = new THREE.Fog(0x4584b4, -100, 3000);
        // 创建材质
        this.material = new THREE.MeshShaderMaterial({
          uniforms: {
            "map": {type: "t", value: 2, texture: texture},
            "fogColor": {type: "c", value: fog.color},
            "fogNear": {type: "f", value: fog.near},
            "fogFar": {type: "f", value: fog.far},
          },
          vertexShader: document.getElementById('vs').textContent,
          fragmentShader: document.getElementById('fs').textContent,
          depthTest: false
        });

        var plane = new THREE.Mesh(new THREE.Plane(64, 64));
        for (let i = 0; i < 8000; i++) {
          plane.position.x = Math.random() * 1000 - 500;
          plane.position.y = -Math.random() * Math.random() * 200 - 15;
          plane.position.z = i;
          plane.rotation.z = Math.random() * Math.PI;
          plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
          GeometryUtils.merge(this.geometry, plane);
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.addObject(this.mesh);

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.z = -8000;
        this.scene.addObject(this.mesh);

        // 创建web渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: false})
        // 设置渲染器的大小
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        // 将渲染器的dom放入到dom的容器中
        container.appendChild(this.renderer.domElement);

        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
        window.addEventListener( 'resize', this.onWindowResize, false );
      },
      onDocumentMouseMove( event ) {
        this.mouseX = ( event.clientX - this.windowHalfX ) * 0.25;
        this.mouseY = ( event.clientY - this.windowHalfY ) * 0.15;

      },
      onWindowResize( event ) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.render();
      },
      render() {
        var position = ((new Date().getTime() - this.start_time) * 0.03) % 8000;
        this.camera.position.x += (this.mouseX - this.camera.target.position.x) * 0.01;
        this.camera.position.y += (-this.mouseY - this.camera.target.position.y) * 0.01;
        this.camera.position.z = -position + 8000;
        this.camera.target.position.x = this.camera.position.x;
        this.camera.target.position.y = this.camera.position.y;
        this.camera.target.position.z = this.camera.position.z - 1000;
        this.renderer.render(this.scene, this.camera);
      },
      goLogin(){
        if(this.username===null||this.username===''){
          this.$message({
            message: '用户名不能为空',
            type: 'error'
          })
        }else if(this.password===null||this.password===''){
          this.$message({
            message: '密码不能为空',
            type: 'error'
          })
        }else{
          adminLogin({"username": this.username,"password": this.password}).then(res=> {
            if(res.data.adminInfo){
              sessionStorage.setItem('administrator','true');
              this.$router.push({name:'moodEssay'})
              this.$notify({
                message: '登陆成功', // 修改成功
                type: 'success'
              })
            }else{
              this.$message({
                message: '账号不存在或者密码错误',
                type: 'error'
              })
            }
          })
        }
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
  .container {
    width: 100vw;
    height: 100vh;
    background-color: #326696;
  }

  .login {
    width: 240px;
    height: 300px;
    background: #35394a;
    position: absolute;
    padding: 80px 40px 40px 40px;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    opacity: 1;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
    animation: loginBorder 10000ms ease;
    animation-fill-mode: forwards;
    animation-delay: 4s;
    display: flex;
    flex-direction: column;
  }
  .title {
    color: #D3D7F7;
    height: 60px;
    font-size: 23px;
    text-align: center;
  }
  .login_row{
    height: 208px;
    position: absolute;
    left: 15px;
    top:35%;
  }
  .login_input{
    color: #afb1be;
    width: 160px;
    margin-top: -5px;
    margin-bottom: 30px;
    background: rgba(57, 61, 82, 0);
    left: 0;
    padding: 13px 65px;
    border-top: 2px solid rgba(57, 61, 82, 0);
    border-bottom: 2px solid rgba(57, 61, 82, 0);
    border-right: none;
    border-left: none;
    outline: none;
    font-family: 'Gudea', sans-serif;
    box-shadow: none;
    font-size: 16px;
  }
  .icon{
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 12px;
    opacity:0.5;
  }
  .login_button{
    position: absolute;
    left: 27%;
    width: 120px;
    border: 2px solid #4FA1D9;
    color: #4FA1D9;
    background: transparent;
  }
  .login_button:hover{
    background:#4FA1D9;
    color: white;
  }
  .login_input::-webkit-input-placeholder{
    color: #c4c4c4;
  }

</style>

