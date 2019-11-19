<template>
  <div class="users">
    <el-table
    :data="userList"
    style="width: 100%">
    <el-table-column
    prop='username'
      label="姓名">
    </el-table-column>
    <el-table-column
    prop='email'
      label="邮箱">
    </el-table-column>
    <el-table-column
    prop='mobile'
      label="电话">
    </el-table-column>
    <el-table-column
      label="用户状态">
      <template v-slot='{row}'>
      <el-switch
      @change="changeStatus(row)"
  v-model="row.mg_state"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
</template>
    </el-table-column>
    <el-table-column
      label="用户状态">
      <template v-slot='{row}'>
        <el-button type="primary" icon="el-icon-edit" circle plain size='mini'></el-button>
        <el-button type="danger" icon="el-icon-delete" circle plain size="mini" @click="del(row.id)"></el-button>
        <el-button type="success" icon="el-icon-edit" round plain size='mini'>分配角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userList: [],
      query: '',
      pagenum: 1,
      pagesize: 10
    }
  },
  created () {
    this.render()
  },
  methods: {
    async render () {
      const { data, meta } = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        this.userList = data.users
      }
    },
    async del (id) {
      try {
        await this.$confirm('确定删除么', '温馨提示', { type: 'warning' })
        const { meta } = await this.$axios.delete(`users/${id}`)
        if (meta.status === 200) {
          this.$message.success('删除成功')
          this.render()
        } else {
          this.$message.error(meta.msg)
        }
      } catch {
        this.$message.info('取消删除')
      }
    },
    async changeStatus ({ id, mg_state: mgState }) {
      const { meta } = await this.$axios.put(`users/${id}/state/${mgState}`)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        this.render()
      } else {
        this.$message.danger(meta.msg)
      }
    }
  }
}
</script>

<style>

</style>
