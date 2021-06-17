<template>
  <el-container>
    <el-aside>
      <el-menu default-active="1">
        <h3>项目列表</h3>
        <el-menu-item v-for="item in projectList" v-bind:key="item.id" @click="getProjectData(item.id)" :index="item.id">
          {{item.title}}
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
      projectList : [],
      tableData: [],
      NowProjectId: 1
    }
  },
  methods: {
    getProjectData(projectId){
      axios.post('/api/getitems', projectId).then(response => {
        this.tableData = response.data.data
        console.log(response)
      })
      this.NowProjectId = projectId
    },
    gotoQuiz(){
      this.$router.push({path:'/quiz', query:{projectid:String(this.NowProjectId), id:'1'}})
    }
  },
  mounted(){
    axios.get('/api/getprojectlist').then(response => {
      this.projectList = response.data.data
      console.log(response)
    });
    this.getProjectData(1);
  }
}
</script>

<style scoped>

</style>