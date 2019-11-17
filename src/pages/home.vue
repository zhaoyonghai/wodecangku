<template>
  <div class="home">
    <el-container>
  <el-header>
    <div class="logo"></div>
    <div class="title">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="logout">
      欢迎你，xxx <a href="javasript:;" @click="logout">退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
       <el-menu
       router
       unique-opened
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menu.authName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.path" v-for="item in menu.children" :key="item.id">
            <i class="el-icon-menu"></i>
            <span>{{item.authName}}</span>
            </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      menuList: []
    }
  },
  created () {
    axios({
      url: 'http://localhost:8888/api/private/v1/menus',
      method: 'get',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.menuList = data
        console.log(this.menuList)
      }
    })
  },
  computed: {
    defaultActive () {
      return this.$route.path.slice(1)
    }
  },
  methods: {
    logout () {
      this.$confirm('确定要退出登陆么?', '温馨提示', {
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('成功退出登陆')
      }).catch(() => {
        this.$message.info('操作取消')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .home{
    height: 100%;
    >.el-container{
      height: 100%;
      .el-aside{
        background-color: #545c64;
        .el-submenu{
          width: 200px;
        }
      }
      .el-header{
        line-height: 60px;
        background-color: #b3c1cd;
        display: flex;
        .logo,.logout{
          width: 180px;
        }
        .logo{
          background: url('../assets/logo.png') center center/contain no-repeat;
        }
        .logout{
          text-align: right;
          font-weight: bold;
          a{
            color: orange;
          }
        }
        .title{
          flex:1;
          text-align: center;
          h1{
            font-size: 32px;
            color: #fff;
          }
        }
      }
      .el-main{
        background-color: #eaeef1;
      }
    }
  }
</style>
