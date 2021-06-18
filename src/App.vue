<template>
  <div id="app">
    <el-header>
      <el-menu mode="horizontal">
        <el-menu-item>
          <div align="left" class="logo" @click="goHome">
            <img alt="Vue logo" src="./assets/logo.png">
          </div>
        </el-menu-item>

        <el-menu-item v-show="isLogin" style="float:right;padding-left: 5px;padding-right: 5px">
          <el-button class="button" @click="goReg" round>注册</el-button>
        </el-menu-item>
        <el-menu-item v-show="isLogin" style="float: right;padding-left: 5px;padding-right: 5px">
          <el-button @click="goLog" round> 登陆 </el-button>
        </el-menu-item>
        <el-menu-item v-show="!isLogin" style="float: right;padding-left: 5px;padding-right: 5px">
          您好，{{localStorage.getItem('username')}}
        </el-menu-item>
        <el-menu-item v-show="!isLogin" style="float: right;padding-left: 5px;padding-right: 5px">
          <el-button @click="Logout" round> 注销 </el-button>
        </el-menu-item>
        <el-menu-item index="1" style="float: right" @click="goProjectList">
          库
        </el-menu-item>
        <el-menu-item index="2" style="float: right" @click="goEditText">
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
    },
    goProjectList(){
      this.$router.push('/projectlist')
    },
    goEditText(){
      this.$router.push('/edittext')
    },
    isLogin(){
      if (localStorage.getItem('id'))
        return true
      else
        return false
    },
    Logout(){
      localStorage.removeItem('id')
      localStorage.removeItem('username')
    }
  }
}
</script>
