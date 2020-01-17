<template>
  <div class="body">
  </div>
</template>

<script>
  var canvas = document.createElement( 'canvas' );
  canvas.width = 32;
  canvas.height = window.innerHeight;
  var context = canvas.getContext( '2d' );
  var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
  gradient.addColorStop(0, "#1e4877");
  gradient.addColorStop(0.5, "#4584b4");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  document.body.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
  var container;
  var camera, scene, renderer, sky, mesh, geometry, material,
    i, h, color, colors = [], sprite, size, x, y, z;
  var mouseX = 0, mouseY = 0;
  var start_time = new Date().getTime();
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
    export default {
      name: "DrawingLines",
      methods: {
        // 初始化图形
        init() {
          container = document.createElement( 'div' );
          document.body.appendChild( container );
          camera = new THREE.Camera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
          camera.position.z = 6000;
          scene = new THREE.Scene();
          geometry = new THREE.Geometry();

          var texture = THREE.ImageUtils.loadTexture( 'static/cloud10.png' );
          texture.magFilter = THREE.LinearMipMapLinearFilter;
          texture.minFilter = THREE.LinearMipMapLinearFilter;

          var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );
          // 创建材质
          material = new THREE.MeshShaderMaterial({ uniforms: {
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
            GeometryUtils.merge( geometry, plane );
          }

          mesh = new THREE.Mesh( geometry, material );
          scene.addObject(mesh);

          mesh = new THREE.Mesh( geometry, material );
          mesh.position.z = -8000;
          scene.addObject(mesh);

          // 创建web渲染器
          renderer = new THREE.WebGLRenderer({ antialias: false })
          // 设置渲染器的大小
          renderer.setSize(window.innerWidth, window.innerHeight)
          // 将渲染器的dom放入到dom的容器中
          container.appendChild(renderer.domElement);

          window.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
          window.addEventListener( 'resize', this.onWindowResize, false );
        },
        onDocumentMouseMove( event ) {
          mouseX = (event.clientX - windowHalfX) * 0.25;
          mouseY = (event.clientY - windowHalfY) * 0.15;
        },
        onWindowResize( event ) {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight );
        },
        animate() {
          requestAnimationFrame(this.animate);
          this.render();
        },
        render() {
          var position = ( ( new Date().getTime() - start_time ) * 0.03 ) % 8000;
          camera.position.x += ( mouseX - camera.target.position.x ) * 0.01;
          camera.position.y += ( - mouseY - camera.target.position.y ) * 0.01;
          camera.position.z = - position + 8000;
          camera.target.position.x = camera.position.x;
          camera.target.position.y = camera.position.y;
          camera.target.position.z = camera.position.z - 1000;
          renderer.render( scene, camera );
        },
      },
      mounted() {
        this.init()
        this.animate()
      }
    }
</script>


<style scoped>
  body {
    background-color: #326696;
    margin: 0px;
    overflow: hidden;
  }
</style>
