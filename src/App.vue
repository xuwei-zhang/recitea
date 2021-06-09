<template>
  <div id="app">
    <el-header>
      <el-menu mode="horizontal" :default-active="activeIndex">
        <el-menu-item>
          <div align="left" class="logo" @click="goHome">
            <img alt="Vue logo" src="./assets/logo.png">
          </div>
        </el-menu-item>
        <el-menu-item style="float:right;margin: 0px">
          <el-button class="button" @click="goReg" round>注册</el-button>
        </el-menu-item>
        <el-menu-item style="float: right;margin: 0px">
          <el-button @click="goLog" round> 登陆 </el-button>
        </el-menu-item>
        <el-menu-item index="1" style="float: right">
          库
        </el-menu-item>
        <el-menu-item index="2" style="float: right">
          文字导入
        </el-menu-item>
      </el-menu>
    </el-header>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo img{
  height: 70%;
  width: 70%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goReg(){
      this.$router.push('/register')
    },
    goLog(){
      this.$router.push('/login')
    },
    goHome(){
      this.$router.push('/home')
    }
  }
}
</script>
