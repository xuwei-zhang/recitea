<template>
  <el-main>
    <el-row>
      <el-col :span="12">
        <el-card ref="element">
          <el-image :src=logo class="scene"></el-image>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height: 900px">
          <div style="line-height: 90px">
            <p>
              《富士山》
            </p>
            <p>
              [江户时代]石川丈三
            </p>
            <p v-if="vis1" @click="vis1=false">
              仙客来游云外巅，
            </p>
            <div v-if="!vis1">
              <el-input v-model="text1" style="width: 200px">
              </el-input>
              <el-button @click="vis1=true">Check！</el-button>
            </div>
            <p v-if="vis2" @click="vis2=false">
              神龙栖老洞中渊。
            </p>
            <div v-if="!vis2">
              <el-input v-model="text2" style="width: 200px">
              </el-input>
              <el-button @click="vis2=true">Check！</el-button>
            </div>
            <p v-if="vis3" @click="vis3=false">
              雪如纨素烟如柄，
            </p>
            <div v-if="!vis3">
              <el-input v-model="text3" style="width: 200px">
              </el-input>
              <el-button @click="vis3=true">Check！</el-button>
            </div>
            <p v-if="vis4" @click="vis4=false">
              白扇倒悬东海天。
            </p>
            <div v-if="!vis4">
              <el-input v-model="text4" style="width: 200px">
              </el-input>
              <el-button @click="vis4=true">Check！</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import logo from '@/assets/IMG_5901.jpg';
export default {
  name: "Home",
  data(){
    return{
      logo:logo,
      vis1:true,
      vis2:true,
      vis3:true,
      vis4:true,
      text1: '',
      text2: '',
      text3: '',
      text4: ''
    }
  },
  methods:{
  }
}
</script>

<style scoped>
p{
  font-family: "WenYue GuDianMingChaoTi (Non-Commercial Use)";
  text-align: center;
  font-size: 40px;
}
</style>