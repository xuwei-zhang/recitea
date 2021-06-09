<template>
<el-main>
  <el-form ref="registerForm" :model="ruleForm" :rules="rules" label-width="80px" class="login-box">
    <h3 class="login-title">欢迎注册</h3>
    <el-form-item label="用户名" prop="username" >
      <el-input v-model="ruleForm.username" type="text" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" type="password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</el-main>
</template>

<script>
export default {
  name: "Register",
  data() {
    return{
      ruleForm: {
        password: '',
        checkPass: '',
        username: ''
      },
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
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