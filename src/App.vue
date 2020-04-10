<template>
  <keep-alive>
    <div id="app">
      <keep-alive><router-view :key="key" v-if="isRouterAlive"/></keep-alive>
      <headerNav v-show="$route.name!=='login'"></headerNav>
    </div>
  </keep-alive>
</template>
<script>
  import headerNav from "./views/headerNav";
  export default {
    name: 'App',
    components:{
      headerNav,
    },
    provide(){
      return{
        reload:this.reload
      }
    },
    computed: {
      key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
      }
    },
    data(){
      return{
        isRouterAlive:true,
        btnFlag:false,
      }
    },
    mounted() {
      },
    created() {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: 'static/live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-haru_1/assets/',
          tagMode: false,
          debug: false,
          model: { jsonPath: 'static/live2dw/live2d-widget-model-haru_1/assets/haru01.model.json' },
          display: { position: 'right', width: 300, height:300 },
          mobile: { show: true },
          log: false,
        })
      }, 1000)
    },
  watch: {
      '$route' (to, from) {
        this.reload();
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
    }
  }
</script>
<style>
  *{
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur), auto;
  }
  *::-webkit-scrollbar {
    width: 6px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #fe9600;
    border-radius: 3px;
  }
</style>

