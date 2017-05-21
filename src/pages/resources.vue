<template>
  <div>
    <Row class="item-header">
      <Col span="21">
      <blockTitle>资源信息表</blockTitle>
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
          <td>资源名称</td>
          <td>链接地址</td>
          <td>是否启用</td>
          <td>操作</td>
        </tr>
        <tr v-for="(resource,index) in resources">
          <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
          <td>{{resource.name}}</td>
          <td>{{resource.url}}</td>
          <td>{{enableStatus[resource.enableStatus]}}</td>
          <td>
            <Button size="small" class="edit-btn" @click.stop="edit(resource.bmFuncTreeId)">编辑</Button>
            <Button size="small" class="accredit-btn" v-if="resource.enableStatus == '1'" @click.stop="startStop(resource.bmFuncTreeId,0)">启用</Button>
            <Button size="small" class="delete-btn" v-if="resource.enableStatus == '0'" @click.stop="startStop(resource.bmFuncTreeId,1)">停用</Button>
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
      resources: [],
      enableStatus: {
        0: "已启用",
        1: "已停用"
      }
    }
  },
  mounted() {
    this.loadPage()
  },
  methods: {
    loadPage() {
      this.http.post('/funcTree/selectFuncTreeByPage', {
        name: '',
        type: '',
        start: this.page * this.pageSize,
        limit: this.pageSize,
        organizationId: this.organizationId
      }).then(data => {
        this.resources = data.body
        this.total = data.total
      })
    },
    toPage(page) {
      this.page = page
    },
    add() {
      this.$router.push({ path: '/resourceedit', query: { type: 1 } })
    },
    edit(id) {
      this.$router.push({ path: '/resourceedit', query: { bmFunctreeId: id, type: 0 } })
    },
    startStop(id, type) {
      //{bmFuncTreeId}/{type}
      this.http.post(`/user/updateFuncTreeStatusByFunctreeId`, {}).then(data => {
        this.loadPage()
      })
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

