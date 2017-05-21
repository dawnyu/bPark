<template>
  <div>
    <Row>
      <Col span="4" class="left-tree">
      <p class="tree-header">
        <Icon type="ios-people" class="tree-header-icon" size="23"></Icon>
        组织机构
      </p>
      <ztree :list='ztreeDataSource' :func='nodeClick' :is-open='true'></ztree>
      </Col>
      <Col span="20">
      <Row class="item-header">
        <Col span="21">
        <blockTitle>人员信息表</blockTitle>
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
            <td>姓名</td>
            <td>登录账号</td>
            <td>所属部门</td>
            <td>人员角色</td>
            <td>用户状态</td>
            <td>授权状态</td>
            <td>操作</td>
          </tr>
          <tr v-for="(user,index) in userList">
            <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
            <td>{{user.name}}</td>
            <td>{{user.login}}</td>
            <td>{{user.bmOrganizationName}}</td>
            <td>{{user.roleName}}</td>
            <td>{{user.state}}</td>
            <td>{{user.isAuth}}</td>
            <td>
              <Button size="small" class="edit-btn" @click.stop="edit(user.bmUserId)">编辑</Button>
              <Button size="small" class="delete-btn" @click.stop="deleteModal = true">授权</Button>
              <Button size="small" class="delete-btn" @click.stop="delModal(user.bmUserId)">删除</Button>
            </td>
          </tr>
        </table>
        </Col>
      </Row>
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
      userList: [],
      levelCode: '',
      ztreeDataSource: []
    }
  },
  mounted() {
    this.loadPage()
    this.selectOrganizByFathorCode()
  },
  methods: {
    nodeClick(m) {
      this.organizationId = m.organizationCode
    },
    loadPage() {
      this.http.post('/user/selectUserByPage', {
        name: '',
        start: this.page * this.pageSize,
        limit: this.pageSize,
        organizationId: this.organizationId
      }).then(data => {
        this.userList = data.body
        this.total = data.total
      })
    },
    selectOrganizByFathorCode() {
      this.http.post('/organizatoin/selectOrganizByFathorCode', {})
        .then(data => {
          this.$nextTick(() => {
            this.ztreeDataSource = data.body
          })
        })
    },
    toPage(page) {
      this.page = page
    },
    add() {
      this.$router.push({ path: '/useredit', query: { type: 1 } })
    },
    edit(id) {
      this.$router.push({ path: '/useredit', query: { userId: id, type: 0 } })
    },
    delModal(id) {
      this.deleteModal = true
      this.id = id
    },
    del() {
      //`/user/deleteUserByUserId/${this.id}`
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

