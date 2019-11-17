<template >
  <div class="login">
    <el-form :model="ruleForm" label-width="100px" status-icon :rules="rules" ref="form">
      <img src="../assets/avatar.jpg" alt="">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="reset">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: ['change', 'blur'] },
          { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: ['change', 'blur'] },
          { min: 5, max: 12, message: '密码长度在 6 到 12 个字符', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.form.resetFields()
    },
    login () {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          axios({
            method: 'post',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.ruleForm
          }).then(res => {
            const { meta, data } = res.data
            if (meta.status === 200) {
              localStorage.setItem('token', data.token)
              this.$router.push('/')
              this.$message.success('登陆成功')
            } else {
              this.$message.error(meta.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
  .login{
    background-color: #2d434c;
    height: 100%;
    overflow: hidden;
    .el-form{
      background-color: #fff;
      width: 400px;
      margin: 200px auto;
      padding: 75px 40px 15px;
      border-radius: 20px;
      position: relative;
      img {
      position: absolute;
      top: -75px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 10px solid #fff;
    }
    .el-button:last-child {
      margin-left: 80px;
    }
    }
  }
</style>
