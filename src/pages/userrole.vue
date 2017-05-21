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
        <Row>
          <Col span="8" class="role-item">
          <p class="title">1,授权角色</p>
          <p>
            <Checkbox-group v-model="roleChecked">
              <Checkbox :label="name" class="role-checkbox" v-for="name in roleNames"></Checkbox>
            </Checkbox-group>
          </p>
          <span class="diamonds" style="z-index:999"></span>
          </Col>
          <Col span="8" class="role-item" style="background: #F6FBFF;">
          <p class="title">2,角色已授权菜单</p>
          <div class="ztree-content">
            <template v-for="(ztreeMenus,index) in ztreeMenusData">
              <p class="title-p">{{roleNames[index]}}</p>
              <ztree :list='ztreeMenus' :func='nodeClick' :is-open='true'></ztree>
            </template>
          </div>
          <span class="diamonds"></span>
          </Col>
          <Col span="8" class="role-item">
          <p class="title">3,授权车场</p>
          </Col>
        </Row>
      </div>
      <Row style="margin-top:30px">
        <Col span="19" style="text-align:right">
        <Button class="submit-btn" @click="submit" size="large">确认</Button>
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
      resource: {},
      status: '启用',
      parentCode: '',
      treeLevel: '',
      resourceType: '0',
      bmFunctreeId: '',
      roles: [],
      roleIds: [],
      roleNames: [],
      roleChecked: [],
      resourceTypes: [
        {
          "value": "0",
          "label": "菜单资源"
        },
        {
          "value": "1",
          "label": "按钮资源"
        },
        {
          "value": "2",
          "label": "区域资源"
        }
      ],
      type: this.$route.query.type == 1 ? false : true,
      ztreeDataSource: [],
      ztreeMenusData: [],
      ztreeMenusDataTemp: [],
      parkIds: [],
      funcTreeId: [],
      parkNames: []
    }
  },
  mounted() {
    $("#content").css({ "height": window.innerHeight, "background": '#F0F5FB' })
    $(".left-tree").css({ "height": window.innerHeight })
    if (this.$route.query.type == 0) {
      this.init()
    }
    this.selectOrganizByFathorCode()
    this.selectRoleByUserID()
  },
  watch: {
    roleChecked: function (val) {
      let ids = []
      for (let v of val) {
        let obj = this.roles.find((item) => {
          item.roleName == v
        })
        ids.push(v.bmRoleId)
      }
      this.ids = ids
      //查询右侧树列表
      this.ztreeMenusDataTemp = []
      for (let id of ids) {
        this.selectFunctreeByRoleId()
      }
      if (ids.length === 0) {
        this.ztreeMenusData = []
      }
    }
  },
  methods: {
    nodeClick(m) {
      this.funcTreeId = m.funcTreeId
    },
    init() {
      //this.$route.query.bmFunctreeId
      this.http.post('funcTree/selectFuncTreeById', {})
        .then(data => {
          this.resource = data.body
        })
    },
    selectRoleByUserID() {
      this.http.post('/role/selectRoleByUserID', {})
        .then(data => {
          let roles = [], roleNames = [], roleChecked = [], roleIds = []
          for (let role of data.body) {
            roleNames.push(role.roleName)
            if (role.checked) {
              roles.push(role)
              roleIds.push(role.bmRoleId)
              roleChecked.push(role.roleName)
            }
          }
          this.roles = roles
          this.roleNames = roleNames
          this.roleIds = roleIds
          this.roleChecked = roleChecked
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
    selectFunctreeByRoleId(roleId) {
      //roleId
      this.http.post('/funcTree/selectFunctreeByRoleId', {})
        .then(data => {
          this.ztreeMenusDataTemp.push(data.body)
          if (this.ids.length > 0 && this.ids.length === this.ztreeMenusDataTemp.length) {
            this.$nextTick(() => {
              this.ztreeMenusData = this.ztreeMenusDataTemp
            })
          }
        })
    },
    submit() {
      let url = '', params = {}
      params.name = this.resource.name
      params.type = this.resource.type
      params.isPublic = ''
      params.icon = this.resource.icon
      params.url = this.resource.url
      params.isLeaf = ''
      params.levelCode = this.levelCode
      params.bmOrganizationId = ''
      params.enableStatus = this.resource.enableStatus
      params.treeLevel = this.resource.treeLevel
      params.remark = this.resource.remark
      if (!this.type) {
        params.parentCode = this.parentCode
        url = '/funcTree/save'
      } else {
        params.bmFuncTreeId = this.resource.bmFuncTreeId
        url = '/funcTree/update'
      }
      this.http.post(url, params).then(data => {
        alert(data.msg)
        this.$router.push({ path: '/resources' })
      })
    }
  }
}
</script>
<style lang="less" scoped src="../assets/less/userrole.less"></style>
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
