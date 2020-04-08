<template>
  <div class="moodEssay">
    <div class="moodEssayNav" id="element" @click="goEdit()">
    </div>
    <div class="moodEssayTop" >
      <ul>
        <li v-for="image in TopImages" :style="{backgroundImage:'url(' +image.backImg + ')'}">
          <div>
            <h3>{{image.h}}</h3>
            <p>{{image.p}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="moodEssayCenter">
      <el-divider content-position="center">
        <span>旧忆时光</span>
        <el-divider direction="vertical"></el-divider>
        <span>无心岁月</span>
        <el-divider direction="vertical"></el-divider>
        <span>心向天空</span>
      </el-divider>
      <div  class="imgOutRow" v-for="CenterImage in CenterImages">
        <div class="imgRow">
          <img class="imgRowCss" :src="CenterImage.imageUrl">
        </div>
      </div>
    </div>
    <div class="moodEssayFooter">
      <el-divider content-position="left">心情随笔</el-divider>
      <div v-if="isLogin">
        <el-input class="moodEssayTitle" v-model="essayTitle" placeholder="请输入一个标题"></el-input>
        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="essayContent"></el-input>
        <el-button class="moodEssaySave" @click="moodEssaySave()" type="primary" :loading="SaveBtnLoading">保存</el-button>
      </div>
      <el-card  class="box-card" shadow="hover" v-for="(moodEssayDate,index) in moodEssayDates" :key="moodEssayDate.pk_moodEssay">
       <div class="card">
         <div class="cardLeft">
           <el-avatar src=" https://img.jbzj.com/file_images/article/201310/20131008165929119.jpg"></el-avatar>
           <swingingPendant class="swingingPendant" ></swingingPendant>
         </div>
         <div class="cardCenter">
           <div class="cardCenterHeader">
             <div class="articleTitle"><label>{{moodEssayDate.essayTitle}}</label></div>
             <span><i class="el-icon-time"></i>{{moodEssayDate.ts}}</span>
           </div>
           <div class="cardCenterBody">
             <div class="cardCenterBodyTop">
               <div :class="[moodEssayDate.isAll?'articleContent':'articleContent2']"  ref="articleContent">{{moodEssayDate.essayContent}}</div>
               <el-button class="checkArticle" type="text" @click="showAllContent(moodEssayDate,index)" v-show="moodEssayDate.showAllContentBtn">展开查看全文</el-button>
               <el-button style="margin: 0;" type="text" @click="NotShowAllContent(moodEssayDate,index)" v-show="moodEssayDate.packUpArticle" icon="el-icon-top">收起</el-button>
             </div>
             <div class="articleBtnS">
               <div  v-show="!isLogin">——无心语录</div>
               <el-button :loading="DelBtnLoading"  v-show="isLogin" @click="DelMoodEssay(moodEssayDate)"  type="primary" icon="el-icon-delete ">删除</el-button>
             </div>
           </div>
         </div>
       </div>
      </el-card>
      <el-pagination  hide-on-single-page  @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="5" layout="prev, pager, next, jumper" :total="currentTotal" :current-page="currentPage"/>
    </div>
  </div>
</template>

<script>
  import {getAllMessages, moodEssayDel, moodEssaySave,} from '../api/moodEssayApi'
  import swingingPendant from "../compents/swingingPendant";
  export default {
    name: "moodEssay",
    components:{
      swingingPendant
    },
    inject:["reload"],
    data(){
      return{
        TopImages:[
          {
            id:0,
            h:'微醺的春风',
            p:'空气中弥漫着的是温暖，和煦的微风，纷飞了漫天的白絮',
            backImg:'' + require('../assets/spring.jpg') + ''
          },
          {
            id:1,
            h:'盛夏的悲喜',
            p:'那一年，我们毕业了，轻松的假期是愉悦，离人的身影在内心荒凉',
            backImg:'' + require('../assets/summer.jpg') + ''
          },
          {
            id:2,
            h:'秋叶的枯黄',
            p:'枫叶随着渐凉的秋风簌簌而下，是叶的凄凉？还是人的感伤？',
            backImg:'' + require('../assets/autumn.jpg') + ''
          },
          {
            id:3,
            h:'凛冬的寒风',
            p:'是岁寒？是冬风?都敌不过人心寒凉，人性凉薄，冷暖自知',
            backImg:'' + require('../assets/winner.jpg') + ''
          }
        ],
        CenterImages:[
          {
            id:0,
            imageUrl:'' + require('../assets/yesteday.jpg') + ''
          },
          {
            id:1,
            imageUrl:'' + require('../assets/now.jpg') + ''
          },
          {
            id:2,
            imageUrl:'' + require('../assets/futter.jpg') + ''
          }
        ],
        NavText:'\"微弱凡尘，心向天空\"',
        currentPage:1,
        pageSize:5,
        currentTotal:0,
        isLogin:sessionStorage.getItem('administrator'),
        moodEssayDates:[],
        DelBtnLoading:false,
        essayContent:'',
        essayTitle:'',
        SaveBtnLoading:false,
        packUpArticle:'',
        showAllContentBtn:'',
        isAll:'',
      }
    },
    mounted() {
      this.showText(this.NavText,element,0,200)

    },
    created() {
      this.getAllMessages()
    },
    methods:{
      //随笔初始化
      getAllMessages(){
        getAllMessages().then(res=>{
          for(let i=0;i<res.data.moodEssayList.length;i++){
            this.$set(res.data.moodEssayList[i], 'index', i)
            this.$set(res.data.moodEssayList[i], 'packUpArticle', false)
            this.$set(res.data.moodEssayList[i], 'showAllContentBtn', false)
            this.$set(res.data.moodEssayList[i], 'isAll', true)
          }
          this.currentTotal = res.data.moodEssayList.length
          this.moodEssayDates = res.data.moodEssayList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
          setTimeout(() => {
            if(this.$refs.articleContent){
              for(let i = 0;i<this.$refs.articleContent.length;i++){
                if(this.$refs.articleContent[i].offsetHeight>=189){
                  this.$set(this.moodEssayDates[i], 'showAllContentBtn', true)
                }
              }
            }
          }, 200);
        })
      },
      //展开全文
      showAllContent(moodEssayDate,index){
        this.$set(this.moodEssayDates[index], 'isAll', false)
        this.$set(this.moodEssayDates[index], 'showAllContentBtn', false)
        this.$set(this.moodEssayDates[index], 'packUpArticle', true)
      },
      // 收起
      NotShowAllContent(moodEssayDate,index){
        this.$set(this.moodEssayDates[index], 'isAll', true)
        this.$set(this.moodEssayDates[index], 'showAllContentBtn', true)
        this.$set(this.moodEssayDates[index], 'packUpArticle', false)
      },

      handleCurrentChange(val){
        this.currentPage = val;
        //页面初始化
        this.getAllMessages()
      },
      handleSizeChange(val){
        this.pageSize = val;
      },

      //随便删除
      DelMoodEssay(moodEssayDate){
        this.DelBtnLoading = true
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          moodEssayDel({pk_moodEssay:moodEssayDate.pk_moodEssay}).then(res=>{
            this.$message({type: 'success', message: '删除成功!'});
            this.moodEssayDates.splice(moodEssayDate.index, 1)
            for(let i=0;i<this.moodEssayDates.length;i++){
              this.$set(this.moodEssayDates[i], 'index', i)
            }
            this.DelBtnLoading = false
          })
        }).catch();
      },

      //随笔保存
      moodEssaySave(){
        this.SaveBtnLoading = true
        if(this.essayTitle===null||this.essayTitle===''){
          this.$message({
            message: '标题不能为空',
            type: 'error'
          })
          this.SaveBtnLoading = false
        }else if(this.essayContent===null||this.essayContent==='') {
          this.$message({
            message: '内容不能为空',
            type: 'error'
          })
          this.SaveBtnLoading = false
        }else{
          moodEssaySave({essayContent:this.essayContent,essayTitle:this.essayTitle,Ts:new Date().toLocaleDateString()}).then(res=>{
            this.$notify({
              message: '保存成功',
              type: 'success'
            })
            this.SaveBtnLoading = false
            this.getAllMessages()
            this.essayTitle=''
            this.essayContent=''
          })
        }
      },



      goEdit(){
        if(!this.isLogin){
          this.$router.push({name:'login'})
        }
      },

    }
  }
</script>

<style scoped>
  .moodEssay{
    max-width: 840px;
    padding: 10px 10px 0 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    height: auto;
    background-color: rgba(255, 255, 255, .8);
  }
  .moodEssayNav{
    height: 60px;
    line-height: 60px;
    border: 1px dashed #E6E6E6;
    color: #969696;
    position: relative;
    display: inline-block;
    width: 100%;
    background: #fbfbfb50;
    border-radius: 10px;
    text-align: center;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur), auto;
  }
  .moodEssayTop{
    overflow: hidden;/*超出部分不显示,同时还可以清楚浮动的效果*/
    width: 840px;
    border: 1px dashed #E6E6E6;
    border-radius: 10px;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
  .moodEssayTop ul{
    list-style: none;/*去掉li的小圆点*/
    padding: 0;/*去掉浏览器自带的边距和填充*/
    font-size: 0;
  }
  .moodEssayTop ul li{
    position: relative;/*相对定位*/
    float: left;/*左浮动:让元素飘起来*/
    width: 200px;
    height: 200px;
    margin: 5px;
    background: #fff center/cover;
    overflow: hidden;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
  .moodEssayTop ul li::before,li::after{
    content: "";/*添加的内容*/
    position: absolute;/*绝对定位:在这里可以使before,after设置宽高*/
    width: 100%;
    height: 100%;
    background: rgba(255, 200, 200, 0.5);
    transition: 0.7s;
  }
  .moodEssayTop ul li::before{
    transform: rotate(55deg) translateX(-320px) scale(1.8);
  }
  .moodEssayTop ul li::after{
    transform: rotate(55deg) translateX(320px) scale(1.8);
  }
  .moodEssayTop ul li:hover::before{
    transform: rotate(55deg) translateX(-150px) scale(1.8);
  }
  .moodEssayTop ul li:hover::after{
    transform: rotate(55deg) translateX(150px) scale(1.8);
  }
  .moodEssayTop ul li div{
    z-index: 2;/*改变div的层级使其上移两层*/
    overflow: hidden;
    position: absolute;/*绝对定位*/
    top: 40px;/*定位:距离顶部40px*/
    color: #fff;
    width: 200px;
    height: 0;
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    transform: rotate(55deg);
    transition: 0.7s;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
  .moodEssayTop ul li:hover div{
    height: 120px;
    transform: rotate(0);
  }
  .moodEssayTop ul li div h3{
    margin: 0;
    border-bottom: 2px solid #fff;
    font-size: 20px;
    line-height: 54px;
  }
  .moodEssayTop ul li div p{
    font-size: 10px;
    margin: 5px;
    line-height: 24px;
  }
  .moodEssayCenter{
    width: 100%;
    height: auto;
    margin-top: 55px;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur), auto;
  }
  .el-divider{
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur), auto;
  }
  .imgRow{
    position: relative;
    height: 160px;
    width: 253px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
    overflow: hidden;
    border-radius: 10px;
    margin-left: 20px;
  }
  .imgOutRow{
    display: inline-block;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
  .imgRowCss{
    height: 160px;
    width: 257px;
    transition: all 0.6s;
  }
  .imgRowCss:hover{
    transform: scale(1.4);
  }
  .moodEssayTitle{
    width: 200px;
    margin: 0 0 2% 35%;
  }
  .moodEssaySave{
    width: 100px;
    margin-top: 2%;
    margin-left: 88%;
  }
  .el-card{
    margin: 30px 0 50px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
  }
   .card{
     width: 800px;
     height: auto;
     display: flex;
     flex-direction: row; /*决定主轴方向 自左往右水平排列*/
     justify-content: flex-start; /*决定水平齐方式 左对齐*/
   }
  .cardLeft{
    height: auto;
    width: 20%;
    display: flex;
    flex-direction:column;/*决定主轴方向 自上而下竖直排列*/
    align-items:flex-start; /*决定垂直对齐方式 上对齐*/
  }
  .cardLeft .swingingPendant{
    transform: scale(0.3);
    margin-left: 35%;
    margin-top: 85%;
  }
  .cardLeft .el-avatar{
    margin-top: 25%;
    margin-left: 25%;
    transform: scale(3);
  }
  .cardCenter{
    display: flex;
    flex-direction:column;/*决定主轴方向 自上往下水平排列*/
    align-items:flex-start; /*决定垂直对齐方式 上对齐*/
    width: 80%;
    min-height: 300px;
  }
  .cardCenterHeader{
    display: flex;
    flex-direction: row; /*决定主轴方向 自左往右水平排列*/
    justify-content: space-between; /*决定水平齐方式 两边对齐*/
    align-items:center;  /* 决定垂直对齐方式 居中*!*/
    width: 100%;
    margin-bottom: 2%;
  }

  .articleTitle{
    letter-spacing: 4px;
    color: #797979;
    font-size: 1.5rem;
    margin-left:40% ;
  }
  .cardCenterBody{
    flex-direction: column;
    justify-content: space-between;
    display: flex;
  }
  .articleContent{
    width: 640px;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 9;
    overflow: hidden;
  }
  .articleContent2{
    width: 640px;
    word-wrap: break-word
  }
  .articleBtnS{
    display: flex;
    flex-direction:row;
    justify-content:flex-end;
    margin-top: 2%;
  }
  .el-pagination{
    position: absolute;
    right: 29%;
  }

</style>
