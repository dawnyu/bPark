<template>
  <div id="content">
    <article>
      <div class="wrapper">
        <blockTitle style="margin-top:30px">{{type ? '编辑':'新增'}}角色信息</blockTitle>
        <div class="content">
          <Row type="flex" justify="start">
            <Col span="11" offset="1" v-if="current.type == '0' && !type">
            <p>角色类型:</p>
            <Select v-model="roleType">
              <Option v-for="item in roleTypeData" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col offset="1" :span="(current.type == '0' && type) ? '22':'10'">
            <p>角色名称:</p>
            <Input size="large" v-model="role.roleName" class="input"></Input>
            </Col>
            <Col span="11" offset="1" v-if="roleType == '1' && !type">
            <p>所属部门:</p>
            <Select size="large" :disabled="type" class="depart" v-model="depart">
              <ztree :list='departList' :func='nodeClick' :is-open='true' select class="initial-height"></ztree>
            </Select>
            </Col>
            <Col span="10" offset="1" style="line-height: 120px"> 角色状态:
            <Radio-group v-model="status" style="margin-left:30px">
              <Radio size="large" label="启用" style="margin-right:20px"></Radio>
              <Radio size="large" label="禁用"></Radio>
            </Radio-group>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="22">
            <p>部门描述:</p>
            <Input type="textarea" v-model="role.remark" :maxlength=2000 :autosize="{minRows: 10,maxRows: 10}" placeholder="部门描述..."></Input>
            </Col>
          </Row>
        </div>
      </div>
      <Row style="margin-top:30px">
        <Col span="19" style="text-align:right">
        <Button class="submit-btn" @click="submit" size="large">确认</Button>
        <Button class="return-btn" @click="$router.go(-1)">取消</Button>
        </Col>
      </Row>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: {
        remark: ''
      },
      status: '启用',
      roleType: '1',
      current: {},
      roleTypeData: [{
        value: '0',
        label: '公有角色'
      }, {
        value: '1',
        label: '私有角色'
      }],
      type: this.$route.query.type == 1 ? false : true,
      departList: [],
      depart: ''
    }
  },
  mounted() {
    $("#content").css({ "height": window.innerHeight, "background": '#F0F5FB' })

    this.http.post('btcauthorize/user/getCurrentUserInfo', {})
      .then(data => {
        this.current = data.body
        if (this.$route.query.type == 0) {
          this.init()
        }
      })
    this.selectOrganizByCurrentUser()
  },
  methods: {
    init() {
      this.http.post(`btcauthorize/role/selectRoleByRoleId/${this.$route.query.roleId}`, {})
        .then(data => {
          this.role = data.body
          debugger
          this.depart = data.body.bmOrganizationName
          // $(".ivu-select-selected-value").html(data.body.bmOrganizationName)
        })
    },
    nodeClick(val) {
      this.depart = val.name
      this.role.bmOrganizationId = val.bmOrganizationId
      $(".depart .ivu-select-selected-value").html(val.name)
    },
    selectOrganizByCurrentUser() {
      this.http.post('btcauthorize/organization/selectOrganizByCurrentUser', {})
        .then(data => {
          this.$nextTick(() => {
            this.departList = data.body
          })
        })
    },
    submit() {
      let url = 'btcauthorize/role/save', params = {}
      debugger
      params.roleName = this.role.roleName
      params.bmOrganizationId = this.role.bmOrganizationId
      params.roleType = this.roleType
      params.enableStatus = this.status == '启用' ? '0' : '1'
      params.remark = this.role.remark
      if (this.type === 0) {
        url = 'btcauthorize/role/update'
        params.bmRoleId = this.role.bmRoleId
      }
      this.http.post(url, params).then(data => {
        this.$router.push({ path: '/rolelist' })
      })
    }
  }
}
</script>
<style lang="less" scoped src="../assets/less/user.less"></style>
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

.ivu-radio-wrapper {
  font-size: 16px;
}

.ivu-radio-inner:after {
  background-color: #00ceec;
}

.ivu-radio-checked .ivu-radio-inner {
  border-color: #00ceec;
}

.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  height: 50px!important;
  font-size: 16px!important;
  line-height: 50px!important;
}

.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: 50px;
  font-size: 16px;
  line-height: 50px;
}

.ivu-select-single .ivu-select-selection {
  font-size: 16px!important;
  height: 50px!important;
  .ivu-select-selected-value {
    height: 50px!important;
    font-size: 16px!important;
    line-height: 50px!important;
  }
}

.initial-height {
  height: initial!important;
}
</style>
