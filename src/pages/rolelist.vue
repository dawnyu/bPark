<template>
  <div>
    <Row class="item-header">
      <Col span="21">
      <blockTitle>角色信息表</blockTitle>
      </Col>
      <Col span="3">
      <span class="btn" @click.stop="add">
        <Icon type="android-add-circle" size="16"></Icon>增加</span>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="content">
      <Col span="22">
      <table cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td>编号</td>
          <td>角色名称</td>
          <td>角色类型</td>
          <td>所属部门</td>
          <td>角色描述</td>
          <td>角色状态</td>
          <td>授权状态</td>
          <td>操作</td>
        </tr>
        <tr v-for="(role,index) in roleList">
          <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
          <td>{{role.roleName}}</td>
          <td>{{roleType[role.roleType]}}</td>
          <td>{{role.bmOrganizationName}}</td>
          <td>{{role.remark}}</td>
          <td>{{state[role.state]}}</td>
          <td>{{role.isAuth}}</td>
          <td>
            <Button size="small" class="edit-btn" @click.stop="edit(role.bmRoleId)">编辑</Button>
            <Button size="small" class="accredit-btn" @click.stop="deleteModal = true">授权</Button>
            <Button size="small" class="delete-btn" @click.stop="delModal(role.bmRoleId)">删除</Button>
          </td>
        </tr>
      </table>
      </Col>
    </Row>
    <Row type="flex" justify="center" style="margin:50px;">
      <Col>
      <Page :total="total" :pageSize=17 @on-change="toPage" v-if="total > pageSize"></Page>
      </Col>
    </Row>
    <Modal v-model="deleteModal" width="500" :styles="{top: '200px'}">
      <p slot="header" class="modal-header">
        <Icon type="information-circled"></Icon>
        <span style="letter-spacing:2px">删除确认</span>
      </p>
      <div style="text-align:center">
        <p>是否继续删除
          <em>[部门]</em>？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" class="modal-delete-btn" @click="del()">删除</Button>
        <Button type="error" size="large" class="modal-cancel-btn" @click="deleteModal = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 14,
      total: 0,
      deleteModal: false,
      organizationId: '',
      roleList: [],
      roleType: ['公有角色', '私有角色'],
      state: ['启用', '禁用'],
      roleId: ''
    }
  },
  mounted() {
    this.loadPage()
  },
  methods: {
    loadPage() {
      this.http.post('/user/selectRoleByPage', {
        name: '',
        start: this.page * this.pageSize,
        limit: this.pageSize,
        organizationId: this.organizationId
      }).then(data => {
        this.roleList = data.body
        this.total = data.total
      })
    },
    toPage(page) {
      this.page = page
    },
    add() {
      this.$router.push({ path: '/roleedit', query: { type: 1 } })
    },
    edit(id) {
      this.$router.push({ path: '/roleedit', query: { roleId: id, type: 0 } })
    },
    delModal(id) {
      this.deleteModal = true
      this.roleId = id
    },
    del() {
      //`/user/deleteUserByUserId/${this.roleId}`
      this.http.post(`/user/deleteUserByUserId`, {}).then(data => {
        this.deleteModal = false
        alert(data.msg)
        this.loadPage()
      })
    },
  }
}
</script>


<style lang="less" scoped src="../assets/less/index.less"></style>

