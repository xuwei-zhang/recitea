<template>
<el-row>
  <el-col span="8">
    <el-card>
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
  <el-col span="8">
    <el-card>
      <div v-for="item in list" v-bind:key="item.id">
        {{item.id + 1}}
        :
        <p style="font-size: 20px;text-align: justify">
          {{item.text}}
        </p>
        <el-button @click="handleMouseSelect2(item.id, item.text)">
          出题！
        </el-button>
      </div>
    </el-card>
  </el-col>
  <el-col span="8">
    <el-card>
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
      id:0,
      quizId:0,
      tid:-1,
    }
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
        if (this.tid >= tid)
        {
          for(let i=0; i<this.quizList.length; i++)
          {
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
    }

  }
}
</script>

<style scoped>

</style>