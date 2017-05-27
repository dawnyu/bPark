<template>
  <div id="content">
    <Row>
      <Col span="4" class="left-tree" style="background:#fff">
      <p class="tree-header">
        <Icon type="ios-people" class="tree-header-icon" size="23"></Icon>
        组织机构
      </p>
      <ztree :list='ztreeDataSource' :func='nodeClick1' :is-open='true'></ztree>
      </Col>
      <Col span="20" style="margin-top:100px">
      <div class="wrapper">
        <Row>
          <Col span="8" class="role-item" style="overflow-y: auto; overflow-x: hidden;">
          <p class="title">1、授权角色</p>
          <p>
            <Checkbox-group v-model="roleChecked">
              <Checkbox :label="name" class="role-checkbox" style="margin: 40px 10%;" v-for="name in roleNames"></Checkbox>
            </Checkbox-group>
          </p>
          <span class="diamonds" style="z-index:999"></span>
          </Col>
          <Col span="8" class="role-item" style="background: #F6FBFF;">
          <p class="title">2、角色已授权菜单</p>
          <div class="ztree-content">
            <template v-for="(ztreeMenus,index) in ztreeMenusData">
              <p class="title-p">{{roleNames[index]}}</p>
              <ztree :list='ztreeMenus.list' :func='nodeClick' :param="ztreeMenus.roleId" :is-open='true'></ztree>
            </template>
          </div>
          <span class="diamonds" style="background: rgb(246, 251, 255)"></span>
          </Col>
          <Col span="8" class="role-item" style="overflow-y: auto; overflow-x: hidden;">
          <p class="title">3、授权车场</p>
          <p>
            <Checkbox-group v-model="currentParkNames">
              <Checkbox :label="park.parkName" class="role-checkbox" style=" margin: 20px 10%;" v-for="park in parkList"></Checkbox>
            </Checkbox-group>
          </p>
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
//此页面有bug
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
      parkNames: [],
      result: {
        bmUserId: this.$route.query.bmUserId,
        roleVoList: []
      },
      parkList: [],
      currentParkNames: [],
      currentRoleId: '',
      isInvert: false
    }
  },
  mounted() {
    $("#content").css({ "height": window.innerHeight, "background": '#F0F5FB' })
    $(".left-tree").css({ "height": window.innerHeight })
    this.selectUserOrganizeByUserID()
    this.selectRoleByUserID()
  },
  watch: {
    nodeClick1() {

    },
    roleChecked: function (val) {
      let ids = []
      for (let v of val) {
        let obj = this.roles.find((item) => {
          return item.roleName == v
        })
        if (obj) {
          ids.push(obj.bmRoleId)
        }
        let index = this.result.roleVoList.findIndex(item => {
          return obj.bmRoleId == item.bmRoleId
        })
        if (index == -1) {
          this.result.roleVoList.push({ bmRoleId: obj.bmRoleId })
        }
      }
      this.ids = ids
      //查询右侧树列表
      this.ztreeMenusDataTemp = []
      for (let id of ids) {
        this.selectFunctreeByRoleId(id)
      }
      if (ids.length === 0) {
        this.ztreeMenusData = []
      }

    },
    currentParkNames: function (val) {
      this.packResult(val)
    }
  },
  methods: {
    nodeClick(m, param) {
      this.currentRoleId = param
      this.bmFunctreeId = m.bmFunctreeId

      this.Invert()

    },
    init() {
      this.http.post(`btcauthorize/user/selectUserOrganizeByUserID/${this.$route.query.bmUserId}`, {})
        .then(data => {
          this.resource = data.body
        })
    },
    Invert() {
      let roleVo = {}, funcTreeVo = {}, bmRoleDataList = [], names = [], isLoad = true
      if (!this.result.roleVoList) {
        return
      }
      for (let roleVo of this.result.roleVoList) {
        if (!roleVo.funcTreeVoList) continue
        let index = roleVo.funcTreeVoList.findIndex(item => {
          return item.bmFunctreeId == this.bmFunctreeId
        })
        if (index > -1) {
          isLoad = false
        }
      }
      if (isLoad) {
        this.selectAuthorizeParkData()
      } else {
        roleVo = this.result.roleVoList.find(item => {
          return item.bmRoleId == this.currentRoleId
        })
        if (!roleVo.funcTreeVoList) {
          return
        }
        funcTreeVo = roleVo.funcTreeVoList.find(item => {
          return item.bmFunctreeId == this.bmFunctreeId
        })
        if (!funcTreeVo.bmRoleDataList) {
          return
        }
        bmRoleDataList = funcTreeVo.bmRoleDataList

        for (let bmRoleData of bmRoleDataList) {
          names.push(bmRoleData.dataName)
        }
        this.currentParkNames = names.slice(0)
      }

    },
    packResult(selectNames) {
      let roleVoList = this.result.roleVoList,
        roleVo = [],
        funcTreeVo = {},
        bmRoleData = {},
        bmRoleDataList = []
      if (!this.currentRoleId) return
      for (let selectName of selectNames) {
        let obj = this.parkList.find((item) => {
          return item.parkName == selectName
        })
        if (obj) {
          bmRoleDataList.push({ dataId: obj.pmParkId, dataName: obj.parkName })
        }
      }
      //获取当前角色的树状列表
      roleVo = roleVoList.find((item) => {
        return this.currentRoleId === item.bmRoleId
      })
      if (!roleVo.funcTreeVoList) {
        roleVo.funcTreeVoList = []
      }
      //获取当前列表的 停车场列表
      if (roleVo.funcTreeVoList && roleVo.funcTreeVoList.length === 0) {
        roleVo.funcTreeVoList = []
        if (this.bmFunctreeId) {
          roleVo.funcTreeVoList.push({ bmFunctreeId: this.bmFunctreeId, bmRoleDataList: bmRoleDataList })
        }
      } else {
        let index = roleVo.funcTreeVoList.findIndex((item) => {
          return this.bmFunctreeId === item.bmFunctreeId
        })
        if (index > -1) {
          roleVo.funcTreeVoList = roleVo.funcTreeVoList.delete(index)
        }
        roleVo.funcTreeVoList.push({ bmFunctreeId: this.bmFunctreeId, bmRoleDataList: bmRoleDataList })
      }
      console.log(JSON.stringify(this.result))
    },

    selectRoleByUserID() {
      this.http.post(`btcauthorize/role/selectRoleByUserID/${this.$route.query.bmUserId}`, {})
        .then(data => {
          let roles = [], roleNames = [], roleChecked = [], roleIds = [], bmRoleList = []
          for (let role of data.body) {
            roleNames.push(role.roleName)
            roles.push(role)
            if (role.checked) {
              roleIds.push(role.bmRoleId)
              roleChecked.push(role.roleName)
              bmRoleList.push({ bmRoleId: role.bmRoleId })
            }
          }
          this.roles = roles
          this.roleNames = roleNames
          this.roleIds = roleIds
          this.roleChecked = roleChecked
          this.result.roleVoList = bmRoleList
        })
    },
    selectUserOrganizeByUserID() {
      this.http.post(`btcauthorize/user/selectUserOrganizeByUserID/${this.$route.query.bmUserId}`, {})
        .then(data => {
          this.$nextTick(() => {
            this.ztreeDataSource.push(data.body)
          })
        })
    },

    /**
     *根据角色资源查询停车场数据
     */
    selectAuthorizeParkData() {
      this.http.post('btcauthorize/user/selectAuthorizeParkData', {
        userId: this.$route.query.bmUserId,
        roleId: this.currentRoleId,
        funcTreeId: this.bmFunctreeId
      })
        .then(data => {
          this.parkList = data.body
          this.currentParkNames = []
          for (let park of this.parkList) {
            if (park.checked) {
              this.currentParkNames.push(park.parkName)
            }
          }
        })
    },
    selectFunctreeByRoleId(roleId) {
      this.http.post(`btcauthorize/funcTree/selectFunctreeByRoleId/${roleId}`, {})
        .then(data => {
          debugger
          let body = Object.assign({}, { list: data.body, roleId: roleId })
          this.ztreeMenusDataTemp.push(body)
          if (this.ids.length > 0 && this.ids.length === this.ztreeMenusDataTemp.length) {
            this.$nextTick(() => {
              this.ztreeMenusData = this.ztreeMenusDataTemp
            })
          }
        })
    },
    submit() {
      let params = {}
      this.http.post('btcauthorize/user/authorizeData', {
        params: JSON.stringify(this.result)
      }).then(data => {
        alert(data.msg)
        this.$router.push({ path: '/userlist' })
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
