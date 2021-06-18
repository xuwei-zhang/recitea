<template>
<el-container>
  <el-main>
    <el-row>
      <el-col :span="20">
        <el-card style="height: 700px">
          <div>
            <el-button style="float: left" @click="goLastPage" :disabled="isFirst">上一题</el-button>
            <el-button style="float: right" @click="goNextPage" :disabled="isLast">下一题</el-button>
            <h3 style="text-align: center">第{{this.getQueryVariable('id')}}/{{tests.length}}题</h3>
            <p style="text-align: justify;font-size: 30px" id="quiz">
            {{this.input}}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="height: 700px">
          <div id="content" style="text-align: justify">
            <div v-show="showFlag">
              <el-button @click="resetInput"> 清空</el-button>
            </div>
            <div v-for="(item, i) in this.ans" v-bind:key="i" :id="i">
              {{(i+1)}}.<el-input v-model="inputvalue[i]" ></el-input>
              <div v-show="showFlag">
                <div v-show="isCorrect[i]">
                  <i class="el-icon-circle-check" style="font-size: 30px"></i>
                </div>
                <div v-show="!isCorrect[i]">
                  <i class="el-icon-error" style="font-size: 30px"></i>
                  <p>正确答案是：{{ans[i]}}</p>
                </div>
              </div>
            </div>
            <br>
            <el-button @click="checkAnswers">check!</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </el-main>
</el-container>
</template>

<script>

import router from "../router";
import axios from 'axios';
export default {
  name: "Quiz",
  data(){
    return {
      tests : [],
      inputlen : 0,
      input : null,
      inputvalue : [],
      isCorrect : [],
      ty : null,
      ans : null,
      showFlag : false,
      isFirst :false,
      isLast: false
    }
  },
  created() {
    axios({
        method:'post',
        url:'/question/getquestion',
        params:{'projectid': this.getQueryVariable('projectid')}
      }).then(response => {
        console.log('response: ' + response)
        if(response.data.code === 200){
          this.tests = response.data.tablelist
          console.log(this.tests)
          this.changeHTML(this.getQueryVariable('id') - 1);
          this.checkPageValid();
        }else{
          alert('获取题目信息失败')
          this.$router.push('/home')
        }
        
      }).catch(error=>{
        console.log(error)
        alert('错误')
        this.$router.push('/home')
      });
    
  },
  methods:{
    changeHTML(i){
      var text = this.tests[i].text
      var words = this.tests[i].words
      this.ans = this.tests[i].words
      for(var j=0;j<words.length; j++)
      {
        text = text.replaceAll(words[j], "【填空"+(j+1).toString()+"】")
      }
      this.input = text
    //   var ty = []
    //   var input = []
    //   let res = text
    //   var sor = {}
    //   var ans = []
    //   for(let j=0;j<words.length;j++)
    //   {
    //     sor[text.indexOf(words[j])] = words[j]
    //   }
    //   words = Object.keys(sor).sort();
    //   for(var key in words){
    //     res = (res+ "").split(sor[words[key]], 2)
    //     if(res.length === 2)
    //     {
    //       input.push(res[0])
    //       ty.push(0)
    //       input.push(sor[words[key]])
    //       ty.push(1)
    //       res = res[1]
    //     }
    //   }
    //   input.push(res)
    //   ty.push(0)
    //   console.log(input, ty)
    //   this.inputlen = input.length
    //   this.input = input
    //   this.ty = ty
    //   for(var k = 0; k<input.length; k++)
    //   {
    //     if (ty[k] === 0)
    //     {
    //       var para1 = document.createElement("span")
    //       var node1 = document.createTextNode(input[k])
    //       para1.appendChild(node1)
    //       var element1 = document.getElementById("quiz")
    //       element1.appendChild(para1)
    //     }
    //     else
    //     {
    //       var para = document.createElement("span")
    //       var node2 = document.createTextNode("【填空"+(this.inputvalue.length+1)+"】")
    //       para.appendChild(node2)
    //       var element = document.getElementById("quiz")
    //       element.appendChild(para)
    //       ans.push(this.input[k])
    //       this.inputvalue.push("")
    //       this.isCorrect.push(false)
    //     }
    //   }
    //   this.ans = ans
    //   console.log(this.inputvalue)
    },
    getQueryVariable(name)
    {
      var url2 = window.location.href;
      var temp2 = url2.split('?')[1];
      var param2 = new URLSearchParams('?'+temp2);
      return param2.get(name)
    },
    checkAnswers()
    {
      this.showFlag = true
      for(var i=0;i<this.ans.length;i++)
      {
        if (this.ans[i] === this.inputvalue[i])
        {
          this.isCorrect[i] = true
        }
        else {
          this.isCorrect[i] = false
        }
      }
      console.log(this.isCorrect)
    },
    goNextPage(){
      this.$router.push({path:'/quiz', query:{projectid:String(this.getQueryVariable('projectid')),id:String(parseInt(this.getQueryVariable('id')) + 1)}})
      router.go(0)
    },
    goLastPage(){
      this.$router.push({path:'/quiz', query:{projectid:String(this.getQueryVariable('projectid')),id:String(parseInt(this.getQueryVariable('id')) - 1)}})
      router.go(0)
    },
    checkPageValid(){
      if (parseInt(this.getQueryVariable('id')) === 1)
      {
        this.isFirst = true
      }
      if (parseInt(this.getQueryVariable('id')) === this.tests.length)
      {
        this.isLast = true
      }
    },
    resetInput(){
      console.log(this.inputvalue)
      this.inputvalue = []
      for (var i = 0; i< this.inputvalue.length; i++)
      {
        this.inputvalue.push("")
      }
      this.showFlag = false
      console.log(this.inputvalue)
    }
  }
}
</script>

<style scoped>

</style>