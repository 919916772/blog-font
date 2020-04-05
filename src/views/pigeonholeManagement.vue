<template>
  <div class="fileRow" >
      <el-timeline>
        <el-timeline-item :timestamp="pigeonholeManagementDate.ts" placement="top" v-for="pigeonholeManagementDate in pigeonholeManagementDates" :key="pigeonholeManagementDate.pk_moodEssay">
          <el-card>
            <h4 class="Title">{{pigeonholeManagementDate.essayTitle}}</h4>
            <p class="Content">{{pigeonholeManagementDate.essayContent}}</p>
            <span class="tag"> ——无心语录</span>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    <el-pagination  hide-on-single-page  @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="10" layout="prev, pager, next, jumper" :total="currentTotal" :current-page="currentPage"/>
  </div>
</template>

<script>
  import {getAllMessages, moodEssayDel, moodEssaySave,} from '../api/moodEssayApi'
    export default {
        name: "pigeonholeManagement",
      data () {
        return {
          currentPage:1,
          pageSize:10,
          currentTotal:0,
          pigeonholeManagementDates:[],
          timestamp:'',
        }
      },
     created() {
        this.getAllMessages();
     },
      methods: {
        //随笔初始化
        getAllMessages(){
          getAllMessages().then(res=>{
            this.currentTotal = res.data.messageBoardList.length
            this.pigeonholeManagementDates = res.data.messageBoardList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
          })
        },
        handleCurrentChange(val){
          this.currentPage = val;
          this.getAllMessages()
        },
        handleSizeChange(val){
          this.pageSize = val;
        },

      }
    }
</script>

<style scoped>
.fileRow{
  width: 800px;
  margin-top: 80px;
  margin-left: 30%;
}
  .Title{
    text-align: center;
    margin-top: 0;
  }
  .tag{
    margin-left: 85%;
  }
  .Content{
    overflow: hidden; white-space: nowrap; text-overflow: clip;width:550px;
  }
</style>
