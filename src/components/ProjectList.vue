<template>
  <el-container>
    <el-aside>
      <el-menu default-active="1">
        <h3>项目列表</h3>
        <el-menu-item v-for="(item,i) in titleList" v-bind:key="i" @click="getProjectData(i)">
          {{item}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
        <el-button icon="el-icon-edit" style="float: right" @click="gotoQuiz">去做题！</el-button>
      <el-table :data="tableData">
        <el-table-column
          prop="id"
          label="序号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="text"
          label="文本"
          >
        </el-table-column>
        <el-table-column
          prop="words"
          label="填空词"
          width="300">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>


</template>

<script>
import axios from "axios";

export default {
  name: "ProjectList",
  data(){
    return {
      titleList : [],
      idList: [],
      tableData: [],
      NowProjectId: 0
    }
  },
  methods: {
    getProjectData(projectId){
      console.log("index: " + projectId)
      axios({
        method:'post',
        url:'/question/getquestion',
        params:{'projectid': this.idList[projectId]}
      }).then(response => {
        console.log(response.data)
        if(response.data.code === 200){
          this.tableData = response.data.tablelist
        }else{
          alert('错误')
          this.$router.push('/main')
        }
        
      }).catch(error=>{
        console.log(error)
        this.$router.push('/main')
      })
      this.NowProjectId = this.idList[projectId]
    },
    gotoQuiz(){
      this.$router.push({path:'/quiz', query:{projectid:String(this.NowProjectId), id:'1'}})
    }
  },
  mounted(){
    axios({
      method:'post',
      url:'/project/getproject',
      params:{'id':localStorage.getItem('id')}

    }).then(response => {
      if(response.data.code === 200){
        console.log(response.data)
        this.titleList = response.data.namelist
        this.idList = response.data.projectidlist 
        console.log(this.idList)
        this.getProjectData(0)
      }else{
        alert('错误')
        this.$router.push('/main')
      }
    }).catch(error=>{
      console.log(error)
      alert('错误')
      this.$router.push('/main')
    });
   
    
  }
}
</script>

<style scoped>

</style>