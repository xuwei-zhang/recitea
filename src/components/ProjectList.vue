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
      <el-button @click="gotoNewProject" style="float: left"> 新建项目</el-button>
      <el-dialog title="新建项目" :visible.sync="dialogFormVisible">
        <el-form :model="projectData" :rules="rules" ref="projectData">
          <el-form-item label="项目名" prop="projectname">
            <el-input type="text" v-model="projectData.projectname"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('projectData')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="删除项目" :visible.sync="deleteVisible">
        <div>
          您确定删除该项目及该项目下的所有题目？
        </div>
        <br>
        <el-button type="danger" @click="deleteProject">删除</el-button>
        <el-button @click="deleteVisible=false">取消</el-button>
      </el-dialog>
      <div style="float: right;padding-left: 5px;padding-right: 5px">
        <el-button @click="deleteVisible=true" type="danger"> 删除项目</el-button>
      </div>
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
    let projectnameValid = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('项目名称不能为空'))
      }
      else{
        for(var i = 0; i< this.projectList.length; i++){
          if(this.projectList[i].title === value){
            callback(new Error('该项目名称已存在！'))
          }
        }
        callback()
      }
    }
    return {
      projectList : [],
      tableData: [],
      NowProjectId: 1,
      dialogFormVisible: false,
      deleteVisible: false,
      projectData: {
        projectname : ''
      },
      rules: {
        projectname: [
          { required:true , validator: projectnameValid ,trigger: 'blur'}
        ]
      }
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
    },
    gotoNewProject(){
      this.dialogFormVisible = true
    },
    submitForm(formName){
      return formName
    },
    deleteProject(){
      return
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