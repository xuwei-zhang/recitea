<template>
  <el-main>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" placeholder="请输入用户名" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </el-main>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '用户名不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method:"post",
            url:'/user/login',
            params:{'name':this.form.username,'password':this.form.password}
        }).then(
          response=>{
            console.log(response)
            if(response.data.code === 200)
            {
              alert('登录成功')
              localStorage.setItem("id", response.data.id);
              localStorage.setItem("username", response.data.username)
              console.log(localStorage.getItem('id'));
              console.log(localStorage.getItem('username'));
              this.$router.push("/home");
              this.$router.go(0)
            }
            else if(response.data.code === 400){
              alert('用户名或密码错误');
              this.form.password = ''
            }
            else{
              alert('错误')
              this.$router.go(0);
            }
          }
        ).catch(error=>{
          console.log(error)
          this.$router.go(0);
        })
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>