<template>
 <div class="messageBoard">
     <cloudBoard></cloudBoard>
     <div class="messageBoardNav" id="element"/>
     <umbrella class="umbrellaCss"></umbrella>
     <el-divider content-position="center">留言板</el-divider>
     <div class="masterMessage">
       <div class="masterMessage_left"></div>
       <div class="masterMessage_Right"></div>
       <h1>主人寄语</h1>
       <p>无心——岁寒</p>
       <p>冬风雪里嚼岁寒，迎着风霜喝夕阳。</p>
       <p>剁了良心下酒菜，自此无心人无惶。</p>
     </div>
     <div class="messageBoardWrite">
     <label>您的名称:</label>
     <el-input class="userInput" v-model="author" placeholder="请输入昵称"/>
     <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="messageContent"></el-input>
     <el-button class="messageCommitBtn" type="info" @click="commitMessage()" :loading="CommitBtnLoading">提交</el-button>
     <el-card class="box-card" shadow="hover" v-for="(messageDate,index) in messageDates" :key="messageDate.pk_MessageBoard">
           <div class="messageWall">
             <div class="messageWallLeft">
               <el-avatar>{{messageDate.author}}</el-avatar>
             </div>
             <div class="messageWallBody">
               <div :class="[messageDate.isAll?'messageContent':'messageContent2']" ref="messageBoardContent">{{messageDate.messageContent}}</div>
               <div class="messageWallBodyBtn">
                 <div style="min-width: 84px;min-height: 56px">
                   <el-button class="checkArticle" type="text" @click="showAllContent(messageDate,index)" v-show="messageDate.showAllContentBtn">展开查看全文</el-button>
                   <el-button style="margin: 0;" type="text" @click="NotShowAllContent(messageDate,index)" v-show="messageDate.packUpArticle" icon="el-icon-top">收起</el-button>
                 </div>
                 <div class="commitTime"><i class="el-icon-time"></i>{{messageDate.ts}}</div>
               </div>
             </div>
           </div>
           <div class="divider" v-show="messageDate.status"></div>
           <div class="replayWall" v-show="messageDate.status" >
             <div class="replayWallLeft">
               <el-avatar src=" https://img.jbzj.com/file_images/article/201310/20131008165929119.jpg"></el-avatar>
             </div>
             <div class="replayWallBody">
               <div :class="[messageDate.ReplyIsAll?'replayContent':'replayContent2']" ref="replayBoard"  v-show="messageDate.showReplayBoard">
                 {{messageDate.replyContent}}
               </div>
               <div class="replayWallBodyBtn" >
                 <el-button class="checkArticle" type="text" @click="showAllReplay(messageDate,index)" v-show="messageDate.showAllReplayContent">展开查看全文</el-button>
                 <el-button style="margin: 0;" type="text" @click="NotShowAllReplay(messageDate,index)" v-show="messageDate.packUpReplay" icon="el-icon-top">收起</el-button>
               </div>
             </div>
           </div>
           <div class="btnWall">
             <div class="inputArea">
               <el-input   @focus="inputFocus(messageDate)" v-if="isLogin&&messageDate.isEdit"  type="textarea" :rows="1" class="replyInput" v-model="messageDate.replyContent" placeholder="请输入要回复复的内容"></el-input>
             </div>
             <div class="btnArea">
               <el-button :loading="ReplayBtnLoading" class="answerMessage" v-if="isLogin&&!messageDate.showRelPlayBtn" @click="replyMessage(messageDate)" icon="el-icon-chat-line-round" type="primary">确定</el-button>
               <el-button  class="delMessage"  v-if="isLogin&&!messageDate.DelRelPlayBtn" @click="showDelBtn(messageDate)"  type="primary" icon="el-icon-delete ">取消</el-button>
               <el-button  class="answerMessage" v-if="isLogin&&messageDate.showRelPlayBtn" @click="showReplay(messageDate)" type="primary" icon="el-icon-chat-line-round">{{messageDate.status===0?'回复':'修改回复'}}</el-button>
               <el-button  class="delMessage"  v-if="isLogin&&messageDate.DelRelPlayBtn" @click="DelMessage(messageDate)"  type="primary" icon="el-icon-delete ">删除</el-button>
             </div>
           </div>
     </el-card>
     <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="5" layout="prev, pager, next, jumper" :total="currentTotal" :current-page="currentPage" hide-on-single-page/>
    </div>
 </div>
</template>

<script>
  import cloudBoard from "../compents/cloudBoard";
  import umbrella from "../compents/umbrella";
  import {getAllMessages,personMessage,replayMessage,deleteMessage} from '../api/messageBoardApi'
    export default {
        name: "messageBoard",
      components:{
        cloudBoard,
        umbrella
      },
      created() {
        this.getAllMessages()
      },
      mounted() {
        this.showText(this.messageNavText,element,0,200)
      },
      data(){
          return{
            messageNavText:'\"人来人往，聚散随缘\"',
            messageContent:'',  //留言内容
            author:'', //留言人
            replyContent:'', //回复内容
            activeNames:['1'],
            isLogin:sessionStorage.getItem('administrator'),
            showReplyLabel:false,// 显示回复内容,
            messageDates:[],//留言板所有信息
            CommitBtnLoading:false, //提交按钮loading
            ReplayBtnLoading:false, //回复按钮loading
            currentPage:1,
            pageSize:5,
            currentTotal:0,
            replayContents:[]
          }
      },
      methods:{
          inputFocus(messageDate){
            this.$set(messageDate, 'showReplayBoard', false)
          },
          //获取所有留言内容
         getAllMessages(){
           getAllMessages().then(res=>{
             for(let i=0;i<res.data.messageBoardList.length;i++){
               this.$set(res.data.messageBoardList[i], 'isEdit', false)
               this.$set(res.data.messageBoardList[i], 'showRelPlayBtn', true)
               this.$set(res.data.messageBoardList[i], 'DelRelPlayBtn', true)
               this.$set(res.data.messageBoardList[i], 'index', i)
               this.$set(res.data.messageBoardList[i], 'packUpArticle', false)
               this.$set(res.data.messageBoardList[i], 'showAllContentBtn', false)
               this.$set(res.data.messageBoardList[i], 'isAll', true)
               this.$set(res.data.messageBoardList[i], 'packUpReplay', false)
               this.$set(res.data.messageBoardList[i], 'showAllReplayContent', false)
               this.$set(res.data.messageBoardList[i], 'ReplyIsAll', true)
               this.$set(res.data.messageBoardList[i], 'showReplayBoard', true)
             }
             this.replayContents =JSON.parse(JSON.stringify( res.data.messageBoardList))
             this.currentTotal = res.data.messageBoardList.length
             this.messageDates = res.data.messageBoardList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)

             setTimeout(() => {
               if(this.$refs.messageBoardContent){
                 for(let i = 0;i<this.$refs.messageBoardContent.length;i++){
                   if(this.$refs.messageBoardContent[i].offsetHeight>=210){
                     this.$set(this.messageDates[i], 'showAllContentBtn', true)
                   }
                 }
               }
               if(this.$refs.replayBoard){
                 for(let i = 0;i<this.$refs.replayBoard.length;i++){
                   if(this.$refs.replayBoard[i].offsetHeight>=126){
                     this.$set(this.messageDates[i], 'showAllReplayContent', true)
                   }
                 }
               }

             }, 200);
         })
         },
        showAllReplay(moodEssayDate,index){
          this.$set(this.messageDates[index], 'ReplyIsAll', false)
          this.$set(this.messageDates[index], 'showAllReplayContent', false)
          this.$set(this.messageDates[index], 'packUpReplay', true)
        },
        NotShowAllReplay(moodEssayDate,index){
          this.$set(this.messageDates[index], 'ReplyIsAll', true)
          this.$set(this.messageDates[index], 'showAllReplayContent', true)
          this.$set(this.messageDates[index], 'packUpReplay', false)
        },

        showAllContent(moodEssayDate,index){
          this.$set(this.messageDates[index], 'isAll', false)
          this.$set(this.messageDates[index], 'showAllContentBtn', false)
          this.$set(this.messageDates[index], 'packUpArticle', true)
        },
        // 收起
        NotShowAllContent(moodEssayDate,index){
          this.$set(this.messageDates[index], 'isAll', true)
          this.$set(this.messageDates[index], 'showAllContentBtn', true)
          this.$set(this.messageDates[index], 'packUpArticle', false)
        },

           // 分页器
        handleCurrentChange(val){
          this.currentPage = val;
          this.getAllMessages()
        },
        handleSizeChange(val){
          this.pageSize = val;
        },
        // 访客留言
        commitMessage(){
          this.CommitBtnLoading = true
          if(this.author===null||this.author===''){
            this.$message({
              message: '昵称不能为空',
              type: 'error'
            })
            this.CommitBtnLoading = false
          }else if(this.messageContent===null||this.messageContent===''){
            this.$message({
              message: '留言内容不能为空',
              type: 'error'
            })
            this.CommitBtnLoading = false
          }else{
            personMessage({author:this.author,messageContent: this.messageContent,Ts:new Date().toLocaleDateString()}).then(res=>{
              this.$notify({
                message: '留言成功', // 修改成功
                type: 'success'
              })
              this.CommitBtnLoading = false
              this.getAllMessages();
              this.author =''
              this.messageContent = ''
            })

          }

        },

          //删除回复
        DelMessage(messageDate){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteMessage({pk_MessageBoard:messageDate.pk_MessageBoard}).then(res=>{
              this.$message({type: 'success', message: '删除成功!'});
              this.messageDates.splice(messageDate.index, 1)
               for(let i=0;i<this.messageDates.length;i++){
                 this.$set(this.messageDates[i], 'index', i)
               }
            })
        }).catch();
        },
        showReplay(messageDate){
          this.$set(messageDate, 'showReplayBoard', false)
          this.$set(messageDate, 'isEdit', true)
          this.$set(messageDate, 'showRelPlayBtn', false)
          this.$set(messageDate, 'DelRelPlayBtn', false)
          this.$set(messageDate, 'showAllReplayContent', false)
          this.$set(messageDate, 'replyContent', '')
        },
        showDelBtn(messageDate){
          this.$set(messageDate, 'showReplayBoard', true)
          this.$set(messageDate, 'isEdit', false)
          this.$set(messageDate, 'showRelPlayBtn',true )
          this.$set(messageDate, 'DelRelPlayBtn', true)
          this.messageDates[messageDate.index].replyContent =JSON.parse(JSON.stringify( this.replayContents[messageDate.index].replyContent))
          setTimeout(()=>{
            if(this.$refs.replayBoard){
              for(let i = 0;i<this.$refs.replayBoard.length;i++){
                if(this.$refs.replayBoard[i].offsetHeight>=126){
                  this.$set(this.messageDates[i], 'showAllReplayContent', true)
                }
              }
            }
          },200)
        },
        // 回复信息
        replyMessage(messageDate){

          this.ReplayBtnLoading = true
          if(!messageDate.replyContent){
            this.$message({
              message: '留言内容不能为空',
              type: 'error'
            })
            this.ReplayBtnLoading = false
          }else{
            replayMessage({pk_MessageBoard: messageDate.pk_MessageBoard,replyContent:messageDate.replyContent,status:1}).then(res=>{
              this.$notify({
                message: '修改成功', // 修改成功
                type: 'success'
              })
              this.$set(this.messageDates[messageDate.index], 'isEdit', false)
              this.$set(this.messageDates[messageDate.index], 'showRelPlayBtn', true)
              this.$set(this.messageDates[messageDate.index], 'DelRelPlayBtn', true)
              this.$set(this.messageDates[messageDate.index], 'replyContent', messageDate.replyContent)
              this.$set(this.messageDates[messageDate.index], 'status',1)
              this.$set(this.messageDates[messageDate.index], 'showReplayBoard', true)
              this.replayContents[messageDate.index].replyContent =JSON.parse(JSON.stringify(this.messageDates[messageDate.index].replyContent ))
              setTimeout(()=>{
                if(this.$refs.replayBoard){
                  for(let i = 0;i<this.$refs.replayBoard.length;i++){
                    if(this.$refs.replayBoard[i].offsetHeight>=126){
                      this.$set(this.messageDates[i], 'showAllReplayContent', true)
                    }
                  }
                }
              },200)
              this.ReplayBtnLoading = false
            })
          }
        }
      }
    }
</script>

<style scoped>
  .el-pagination{
    position: absolute;
    right: 29%;

  }
  .divider{
    border:1px #dcdfe6 solid;
    margin-top:1% ;
    margin-bottom: 1%;
  }
  .messageBoardNav{
    height: 60px;
    line-height: 60px;
    margin-left: 29%;
    margin-right: auto;
    margin-top: 6%;
    border: 1px dashed #E6E6E6;
    color: #969696;
    display: inline-block;
    width: 800px;
    background: #fbfbfb50;
    border-radius: 10px;
    text-align: center;
  }
  .umbrellaCss{
   margin-top: -23%;
    margin-left: 19%;
   }
  .el-divider{
    max-width: 800px;
    margin-top: 15%;
    margin-left: auto;
    margin-right: auto;
  }
  .masterMessage{
    max-width:  800px;
    border: 2px solid #797979;
    border-top: none;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  .masterMessage_left{
    height: 2px;
    width: 27%;
    background-color: #797979;
  }
  .masterMessage_Right{
    height: 2px;
    width: 27%;
    background-color: #797979;
    margin-left: 73%;
    margin-top: -0.2%;
  }
  .masterMessage h1{
    position: relative;
    margin-top: -20px;
    display: inline-block;
    letter-spacing: 4px;
    color: #797979;
  }
  .masterMessage p{
    margin-top: 5px;
    color: #797979;
    font-size: 25px;
  }
  .messageBoardWrite{
    max-width: 800px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4%;
    height: auto;
    background-color: rgba(255, 255, 255, .8);
  }
  .messageCommitBtn{
    margin-left:88%;
    margin-top: 1%;
    width: 90px;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
  .userInput{
    width: 200px;
    margin-bottom: 2%;
  }
  .el-card{
    margin: 30px 0 50px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    flex-direction: column; /*决定主轴方向 自上往右水平排列*/
    align-items:flex-start; /*决定垂直对齐方式 上对齐*/
    width: 800px;
    height: auto;
   /* max-width: 840px;
    padding: 10px 10px 0 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    height: auto;
    background-color: rgba(255, 255, 255, .8);*/
  }
  .messageWall{
    display: flex;
    flex-direction: row; /*决定主轴方向 自左往右水平排列*/
    justify-content: flex-start; /*决定水平齐方式 左对齐*/
    min-height:250px;
  }
  .messageWallLeft{
    width: 150px;
  }
  .messageWallLeft .el-avatar{
    transform: scale(3);
    margin-top: 70%;
    margin-left: 35%;
  }
  .messageWallBody{

    flex-direction: column;
    justify-content: space-between;
    display: flex;
  }
  .messageContent{
    width: 620px;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:10;
    overflow: hidden;
  }
  .messageContent2{
    width: 620px;
    word-wrap: break-word;
  }
  .messageWallBodyBtn{
    padding-left: 1%;
    display: flex;
    flex-direction:row;
    justify-content:space-between;
  }

  .replayWall{
    min-height: 160px;
    display: flex;
    flex-direction: row; /*决定主轴方向 自左往右水平排列*/
    justify-content: flex-start; /*决定水平齐方式 左对齐*/
  }
  .replayWallLeft{
    width: 150px;
  }
  .replayWallLeft .el-avatar{
    transform: scale(2);
    margin-top: 30%;
    margin-left: 35%;
  }
  .replayWallBody{
    width: 620px;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
  }
  .replayContent{
    width: 620px;
    min-height: 125px;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:6;
    overflow: hidden;
  }
  .replayContent2{
    width: 620px;
    min-height: 125px;
    word-wrap: break-word;
  }
  .btnWall{
    flex-direction: row;
    justify-content: flex-end;
    display: flex;
  }
  .btnArea{
    margin-left: 2%;
  }
  .replyInput{
    width: 415px;
  }
 /* .el-avatar{
    transform: scale(3);
    margin-top: 5%;
    margin-left: 5%;
  }
  .commitTime{
   position: absolute;
    right:2%;
    top:2%
  }
  .messageContent{
    width: 500px;
    max-height: 140px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;

    position: absolute;
    right: 16%;
    top:7%
  }
  .delMessage{
    position: absolute;
    bottom: 2%;
    right: 1%;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
  .answerMessage{
    position: absolute;
    bottom: 2%;
    right: 13%;
    cursor: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur), auto;
  }
  .el-collapse{
    position: absolute;
    bottom:20%;
    left: 10%;
    width:500px
  }
  .replyInput{
    width: 490px;
    position: absolute;
    left: 10%;
    bottom: 3%;
  }*/
</style>
