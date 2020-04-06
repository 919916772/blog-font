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
       <el-card class="box-card" shadow="hover" v-for="messageDate in messageDates" :key="messageDate.pk_MessageBoard">
        <el-avatar>{{messageDate.author}}</el-avatar>
         <div class="messageContent">{{messageDate.messageContent}}</div>
        <div class="commitTime"><i class="el-icon-time"></i>{{messageDate.ts}}</div>
         <el-button  class="delMessage"  v-if="isLogin&&!messageDate.DelRelPlayBtn" @click="showDelBtn(messageDate)"  type="primary" icon="el-icon-delete ">取消</el-button>
         <el-button  class="delMessage"  v-if="isLogin&&messageDate.DelRelPlayBtn" @click="DelMessage(messageDate)"  type="primary" icon="el-icon-delete ">删除</el-button>
         <el-button  class="answerMessage" v-if="isLogin&&messageDate.showRelPlayBtn" @click="showReplay(messageDate)" type="primary" icon="el-icon-chat-line-round">{{messageDate.status===0?'回复':'修改回复'}}</el-button>
         <el-button :loading="ReplayBtnLoading" class="answerMessage" v-if="isLogin&&!messageDate.showRelPlayBtn" @click="replyMessage(messageDate)" icon="el-icon-chat-line-round" type="primary">确定</el-button>
         <el-collapse v-show="messageDate.status" :v-model="activeNames" >
           <el-collapse-item title="无心的回复:" name="1">
             <div>{{messageDate.replyContent}}</div>
           </el-collapse-item>
         </el-collapse>
         <el-input v-if="isLogin&&messageDate.isEdit"  type="textarea" :rows="1" class="replyInput" v-model="messageDate.replyContent" placeholder="请输入要回复复的内容"></el-input>
       </el-card>
       <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :page-size="5"
         layout="prev, pager, next, jumper"
         :total="currentTotal"
         :current-page="currentPage"
         hide-on-single-page
       >
       </el-pagination>
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
          }
      },
      methods:{
          //获取所有留言内容
         getAllMessages(){
           getAllMessages().then(res=>{
             for(let i=0;i<res.data.messageBoardList.length;i++){
               this.$set(res.data.messageBoardList[i], 'isEdit', false)
               this.$set(res.data.messageBoardList[i], 'showRelPlayBtn', true)
               this.$set(res.data.messageBoardList[i], 'DelRelPlayBtn', true)
               this.$set(res.data.messageBoardList[i], 'index', i)
             }
             this.currentTotal = res.data.messageBoardList.length
             this.messageDates = res.data.messageBoardList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
         })
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
        })
        },
        showReplay(messageDate){
          this.$set(messageDate, 'isEdit', true)
          this.$set(messageDate, 'showRelPlayBtn', false)
          this.$set(messageDate, 'DelRelPlayBtn', false)
          this.$set(messageDate, 'replyContent', '')
        },
        showDelBtn(messageDate){
          this.$set(messageDate, 'isEdit', false)
          this.$set(messageDate, 'showRelPlayBtn',true )
          this.$set(messageDate, 'DelRelPlayBtn', true)
          this.$set(messageDate, 'replyContent', '')
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
              this.$set(this.messageDates[messageDate.index], 'isEdit', false)
              this.$set(this.messageDates[messageDate.index], 'showRelPlayBtn', true)
              this.$set(this.messageDates[messageDate.index], 'DelRelPlayBtn', true)
              this.$set(this.messageDates[messageDate.index], 'replyContent', messageDate.replyContent)
              this.$set(this.messageDates[messageDate.index], 'status',1)
              this.ReplayBtnLoading = false
            })
          }
        }
      }
    }
</script>

<style scoped>
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
    width: 100%;
    height: 300px;
    margin: 50px 0 50px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
    position: relative;
  }
  .el-pagination{
    position: absolute;
    right: 29%;

  }
  .el-avatar{
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
    height:140px;
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
  }
</style>
