<template>
  <div id="content">
    <Row>
      <Col span="4" class="left-tree" style="background:#fff">
      <p class="tree-header">
        <Icon type="ios-people" class="tree-header-icon" size="23"></Icon>
        组织机构
      </p>
      <ztree :list='ztreeDataSource' :func='nodeClick' :is-open='true'></ztree>
      </Col>
      <Col span="20" style="margin-top:100px">
      <div class="wrapper">
        <blockTitle style="margin-top:30px">菜单授权</blockTitle>
        <Tree :data="ztreeMenusData" ref="tree" show-checkbox class="tree-content"></Tree>
      </div>
      <Row style="margin-top:30px">
        <Col span="19" style="text-align:right">
        <Button class="submit-btn" @click="submit" size="large">保存</Button>
        <Button class="return-btn" @click="$router.go(-1)">取消</Button>
        </Col>
      </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ztreeDataSource: [],
      ztreeMenusData: [],
      currentUser: {}
    }
  },
  mounted() {
    $("#content").css({ "height": window.innerHeight, "background": '#F0F5FB' })
    $(".left-tree").css({ "height": window.innerHeight })
    if (this.$route.query.type == 0) {
      this.init()
    }
    this.selectOrganizByCurrentUser()
    this.getCurrentUserInfo()
  },

  methods: {
    nodeClick(m) {

    },
    selectOrganizByCurrentUser() {
      this.http.post('btcauthorize/organization/selectOrganizByCurrentUser', {})
        .then(data => {
          this.$nextTick(() => {
            this.ztreeDataSource = data.body
          })
        })
    },
    selectFunctreeByRoleId() {
      this.http.post(`btcauthorize/funcTree/selectFunctreeByCurrentUser/`, {})
        .then(data => {
          this.parseTreeData(data.body, this.currentUser.type)
        })
    },

    getCurrentUserInfo() {
      this.http.post('btcauthorize/user/getCurrentUserInfo', {})
        .then(data => {
          this.currentUser = data.body
          this.selectFunctreeByRoleId()
        })
    },

    parseTreeData(list, type) {
      if (!list) return
      var vm = this;
      var recurrenceFunc = (data) => {
        data.forEach((m) => {
          m.expand = true
          m.title = m.name
          m.disabled = type === '0' ? false : true
          m.checked = m.checked || false
          m.children = m.nodeList || []
          if (m.children.length > 0) {
            recurrenceFunc(m.children)
          } else {
            delete m.children
          }
        })
      };
      recurrenceFunc(list)
      this.ztreeMenusData = list
    },
    submit() {
      let params = {}, list = this.$refs.tree.getCheckedNodes() || [], funcTreeIds = []
      for (let obj of list) {
        funcTreeIds.push(obj.bmFunctreeId)
      }
      this.http.post('btcauthorize/role/authorizFunctree', {
        roleId: this.$route.query.roleId,
        funcTreeIds: funcTreeIds.join(",")
      }).then(data => {
        this.$router.push({ path: '/rolelist' })
      })
    }
  }
}
</script>
<style lang="less" scoped src="../assets/less/authortree.less"></style>
<style lang="less">
.ivu-input-large {
  font-size: 16px;
  padding: 6px 7px;
  height: 50px;
}

.ivu-select-single .ivu-select-selection {
  font-size: 16px;
  height: 50px;
  .ivu-select-selected-value {
    height: 50px;
    font-size: 16px;
    line-height: 50px;
  }
}

.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}

.ivu-radio-wrapper {
  font-size: 16px;
}

.ivu-radio-inner:after {
  background-color: #00ceec;
}

.ztree-content ul {
  background: #F6FBFF!important;
}
</style>
