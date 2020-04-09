<template>
    <div class="headerNav">
      <div class="homeHeaderNav">
        <div class="homeHeaderNav-left"><label @click="backTop">无心岁月，旧忆时光</label></div>
        <div  class="homeHeaderNav-center">
          <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="homePage"><i class="el-icon-house"></i>首页</el-menu-item>
            <el-menu-item index="moodEssay"><i class="el-icon-edit"></i>心情随笔</el-menu-item>
            <el-menu-item index="messageBoard"><i class="el-icon-chat-round"></i>留言板</el-menu-item>
            <el-menu-item index="pigeonholeManagement"><i class="el-icon-suitcase"></i>归档</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "headerNav",
      inject:["reload"],
      data(){
       return{
         activeIndex:this.$route.name,
         showNavMenu:'false',
         keyPath:'1',
       }
      },
      created() {

      },
      mounted() {
        window.addEventListener('scroll', this.scrollToTop)
      },

      destroyed () {
        window.removeEventListener('scroll', this.scrollToTop)
      },

      methods:{
        handleSelect(key){
          if(key==='homePage'){
            // 去往首页
            this.$router.push({name:'homePage'})

          }
          if(key==='moodEssay'){
            this.$router.push({name:'moodEssay'})

          }
          if(key==='messageBoard'){

            this.$router.push({name:'messageBoard'})

          }
          if(key==='pigeonholeManagement'){
            this.$router.push({name:'pigeonholeManagement'})
          }
        },
        // 回到顶部
        backTop () {
          const that = this
          let timer = setInterval(() => {
            let ispeed = Math.floor(-that.scrollTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
            if (that.scrollTop === 0) {
              clearInterval(timer)
            }
          }, 16)
        },
        scrollToTop () {
          const that = this
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          that.scrollTop = scrollTop
          if (that.scrollTop > 60) {
            that.btnFlag = true
          } else {
            that.btnFlag = false
          }
        }
      }
    }
</script>

<style scoped>
  .headerNav{
    width: 100vw;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur), auto;
  }
  .homeHeaderNav{
    line-height: 60px;
    opacity: 0;
    background: white;
    transition: opacity 2s;
    position: fixed;
    top: 0;
    width: 100vw;
    border: black 1px solid;
  }
  .homeHeaderNav:hover{
    opacity: 1;
    transition-duration: 2s;

  }
  .homeHeaderNav-left{
    color: #464646;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
    float: left;
    margin-right: 30%;
    margin-left: 3%;
  }
  .homeHeaderNav-center{
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
    float: left;
  }
  .el-menu-item{
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
</style>
