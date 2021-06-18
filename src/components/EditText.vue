<template>
    <el-row>
      <el-col :span="8">
        <el-card class="card">
          <h3>
            当前添加的题库：{{this.value}}
          </h3>
          <el-button @click="dialogVisible=true">更改题库</el-button>
          <el-divider></el-divider>
          <h3>请输入待出题的文本</h3>
          <div v-if="inputVisible">
            <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 20}"
                placeholder="请输入内容"
                v-model="textarea"
                :disabled="isEmptyProject"
            >
            </el-input>
            <el-button @click="inputVisible=false;textVisible=true">
              转换
            </el-button>
          </div>
          <div v-if="textVisible" style="font-size: 20px;text-align: justify">
            {{textarea}}
            <div style="margin-top: 20px" align="center">
              <el-button @click="inputVisible=true;textVisible=false">
                编辑
              </el-button>
              <el-button @click="handleMouseSelect">
                Get!
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
          <el-card class="card">
            <h3>出题区</h3>
            <el-divider></el-divider>
            <div v-for="(item, i) in list" v-bind:key="item.id">
              第{{i + 1}}题
              :
              <p style="font-size: 20px;text-align: justify">
                {{item.text}}
              </p>
              <el-button @click="handleMouseSelect2(i)" :disabled="item.isSubmit">
                出题！
              </el-button>
              <el-button @click="deleteItem(i)" type="danger" :disabled="item.isSubmit">
                删除该题
              </el-button>
              <div v-show="item.qtext.length > 0" style="margin: 10px">
                需要填的空：
              </div>
              <div v-for="(iitem, j) in item.qtext" v-bind:key="j" style="font-size: 20px;text-align: justify">
                {{j+1}}."{{iitem}}"
              </div>
              <el-button v-show="item.qtext.length > 0" @click="submitQuiz(i)" :disabled="item.isSubmit">提交至题库！</el-button>
              <el-divider></el-divider>
            </div>
          </el-card>
      </el-col>
      <el-dialog title="请选择要添加的题库" :visible.sync="dialogVisible">
        <el-select v-model="value" placeholder="请选择">
          <el-option
              v-for="(item, i) in projectList"
              :key="i"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
        <div style="margin: 20px">
          <el-button @click="defineProject">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
</template>

<script>
import axios from 'axios'
export default {
  name: "EditText",
  data(){
    return{
      textarea: '',
      inputVisible:true,
      textVisible:false,
      list: [],
      projectList: [],
      dialogVisible: false,
      options : [],
      value: '',
      isEmptyProject: true
    }
  },
  mounted() {
    axios({
      method:'post',
      url:'/project/getproject',
      params:{'id':localStorage.getItem('id')}

    }).then(response => {
      if(response.data.code === 200){
        console.log(response.data)
        this.projectList = response.data.namelist
        // this.idList = response.data.projectidlist
        // console.log(this.idList)
      }else{
        alert('错误')
        this.$router.push('/home')
      }
    }).catch(error=>{
      console.log(error)
      alert('错误')
      this.$router.push('/home')
    });
  },
  methods:{
    handleMouseSelect() {
      let text = window.getSelection().toString();
      if (text.length>0)
      {
        this.list.push({text:text, qtext:[], isSubmit: false});
      }
    },
    handleMouseSelect2(i) {
      let qtext = window.getSelection().toString();
      if (qtext.length>0)
      {
        var item = this.list[i].qtext
        for(var j = 0;j<item.length; j++)
        {
          if (item[j] === qtext)
          {
            return
          }
        }
        this.list[i].qtext.push(qtext);
        }
      },
    deleteItem(id) {
      this.list.splice(id, 1)
    },
    defineProject(){
      if (this.value === '')
      {
        this.dialogVisible = true
        if (this.projectList.length === 0)
        {
          this.$message.error('项目列表为空,需要先创建项目')
        }
      }
      else
      {
        this.isEmptyProject = false
        this.dialogVisible = false
      }
    },
    submitQuiz(i){
      if(this.list[i].qtext.length === 0)
      {
        this.$message.error('提交失败，请先选择需要填的空！')
        return
      }
      var res = {
        text: '',
        qtext: []
      }
      res.qtext = this.list[i].qtext
      res.text = this.list[i].text
      // 如果提交成功，按钮会disabled
      this.list[i].isSubmit = true
      return res
    }
}
}
</script>

<style scoped>
.card{
  height: 1200px;
}
</style>