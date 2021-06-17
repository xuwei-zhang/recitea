<template>
    <el-row>
      <el-col :span="8">
        <el-card class="card">
          <h3>请输入待出题的文本</h3>
          <div v-if="inputVisible">
            <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 20}"
                placeholder="请输入内容"
                v-model="textarea"
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
                复位
              </el-button>
              <el-button @click="handleMouseSelect">
                Get!
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card">
          <h3>出题区</h3>
          <div v-for="item in list" v-bind:key="item.id">
            第{{item.id + 1}}题
            :
            <p style="font-size: 20px;text-align: justify">
              {{item.text}}
            </p>
            <el-button @click="handleMouseSelect2(item.id, item.text)">
              出题！
            </el-button>
            <el-button @click="deleteItem(item.id)" type="danger">
              删除该题
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card">
          <h3>题目展示区</h3>
          <div v-for="item in quizList" v-bind:key="item.id">
            第{{item.id + 1}}题:
            原文:
            <p style="font-size: 20px;text-align: justify">
              {{item.text}}
            </p>
            需要填的空:
            <div v-for="(iitem,i) in item.qtext" v-bind:key="i" style="font-size: 20px;text-align: justify">
              {{i+1}}."{{iitem}}";
            </div>
            <br>
            <el-button>提交至题库！</el-button>
          </div>
        </el-card>
      </el-col>
      <el-dialog title="请选择要添加的题库" :visible.sync="dialogVisible">
        <el-select v-model="value" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <div style="margin: 20px">
          <el-button @click="defineProject">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
</template>

<script>
export default {
  name: "EditText",
  data(){
    return{
      textarea: '',
      inputVisible:true,
      textVisible:false,
      list: [],
      quizList: [],
      id: 0,
      quizId:0,
      tid:-1,
      projectList: [],
      dialogVisible: false,
      options : [],
      value: '',

    }
  },
  mounted() {
    this.dialogVisible = true
  },
  methods:{
    handleMouseSelect() {
      let text = window.getSelection().toString();
      if (text.length>0)
      {
        this.list.push({id:this.id, text:text});
        this.id += 1;
      }
    },
    handleMouseSelect2(tid, text) {
      let qtext = window.getSelection().toString();
      if (qtext.length>0)
      {
        console.log(this.tid, tid, this.quizList.length)
        if (this.tid >= tid)
        {
          for(let i=0; i<this.quizList.length; i++)
          {
            console.log(this.quizList)
            if (this.quizList[i].tid === tid)
            {
              if (this.quizList[i].qtext.indexOf(qtext)<0)
                this.quizList[i].qtext.push(qtext)
            }
          }
        }
        else{
          this.tid = tid
          this.quizList.push({id:this.quizId,tid:tid, text:text, qtext:[qtext] });
          this.quizId += 1;
        }
      }
    },
    deleteItem(id){
      this.list.splice(id,1)
      for (var i = id; i<this.list.length;i++)
      {
        if(this.list[i].id === 0)
          continue
        this.list[i].id = this.list[i].id - 1
      }
      this.id = this.list.length

      var flag = false
      for (var j = 0; j < this.quizList.length; j++)
      {
        if (this.quizList[j].id === id)
        {
          this.quizList.splice(j, 1)
          this.quizId = this.quizList.length
          flag = true
          j = j - 1
          this.tid -= 1
          continue
        }
        if (flag)
        {
          this.quizList[j].id =  this.quizList[j].id - 1
          this.quizList[j].tid -= 1
        }
      }
},
    defineProject(){
      if (this.value === '')
      {
        this.dialogVisible = true
        if (this.projectList.length === 0)
        {
          this.$message.error('项目列表为空,需要先创建项目, 为您自动跳转到项目库页面！')
          this.$router.push('/projectlist')
        }
      }
      else this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.card{
  height: 1200px;
}
</style>