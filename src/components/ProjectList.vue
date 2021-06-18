<template>
  <el-container>
    <el-aside>
      <el-menu default-active="1">
      <div style="align:center">
          <h3>项目列表</h3>
          <el-button @click="gotoNewProject"> 新建项目</el-button>
        </div>
        <el-menu-item v-for="(item,i) in titleList" v-bind:key="i" @click="getProjectData(i)">
          {{item}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
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
      <el-button style="float: left" @click="newItem">新建题目</el-button>
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
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index)">练习</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)">删除</el-button>
          </template>
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
        for(var i = 0; i< this.titleList.length; i++){
          if(this.titleList[i] === value){
            callback(new Error('该项目名称已存在！'))
          }
        }
        callback()
      }
    }
    return {
      titleList : [],
      idList: [],
      tableData: [],
      NowProjectId: 0,
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
      console.log("index: " + projectId)
      axios({
        method:'post',
        url:'/question/getquestion',
        params:{'projectid': this.idList[projectId]}
      }).then(response => {
        console.log(response.data)
        if(response.data.code === 200){
          this.tableData = response.data.tablelist
          for(var o=0;o<this.tableData.length;o++)
          {
            var tmp = this.tableData[o].words 
            var res = ""
            for(var k =0; k<tmp.length;k++)
            {
              if (k != tmp.length - 1)
                res += tmp[k] + ","
              else
                res += tmp[k]
            }
            this.tableData[o].words = res
          }
        }else{
          alert('错误')
          // this.$router.push('/main')
        }
        
      }).catch(error=>{
        console.log(error)
        // this.$router.push('/main')
      })
      this.NowProjectId = this.idList[projectId]
    },
    gotoQuiz(){
      this.$router.push({path:'/quiz', query:{projectid:String(this.NowProjectId), id:'1'}})
    },
    gotoNewProject(){
      this.dialogFormVisible = true
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          axios({
          method:'post',
          url:'/project/newproject',
          params:{'id': localStorage.getItem("id"), 'name': this.projectData.projectname}
        }).then(response=>{
          console.log(response)
          if(response.data.code === 200){
            alert("新建项目成功")
            this.$router.go(0)
          }else{
            alert("错误")
            this.$router.push("/projectlist")
          }
        }).catch(error =>{
          console.log(error)
          this.$router.push("/projectlist")
        })
        }
      });

    },
    deleteProject(){
      axios({
        method:'post',
        url:'/project/deleteproject',
        params:{'projectid': this.NowProjectId}
      }).then(
        response => {
          if(response.data.code === 200){
            alert("删除项目成功")
            this.getProjectData(this.NowProjectId)
          }
          else{
            alert("删除项目失败")
            this.$router.push('/home')
          }
        }
      ).catch(error => {
        console.log(error)
        this.$router.push('/home')
      })
    },
    handleEdit(index) {
      this.$router.push({path:'/quiz', query:{projectid:String(this.NowProjectId), id: index + 1}})
    },
    handleDelete(index) {
      var questionid = this.tableData[index].questionid
      axios({
        method:'post',
        url:'/question/deletequestion',
        params:{'questionid': questionid}
      }).then(response => {
        if(response.data.code === 200){
          alert('删除题目成功')
          this.$router.go(0)
        }
        else{
          alert('删除题目失败')
          this.$router.push('/home')
        }
      }).catch(error => {
        console.log(error)
        alert('错误')
        this.$router.push('/home')
      })
    },
    newItem(){
      this.$router.push({
        path:'/edittext',
        query:{
          id: this.NowProjectId
        }
      })
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
        this.getProjectData(this.NowProjectId)
      }else{
        alert('错误')
        // this.$router.push('/main')
      }
    }).catch(error=>{
      console.log(error)
      alert('错误')
      // this.$router.push('/main')
    });
   
    
  }
}
</script>

<style scoped>

</style>