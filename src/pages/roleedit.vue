<template>
  <div id="content">
    <article>
      <div class="wrapper">
        <blockTitle style="margin-top:30px">{{type == 0 ? '编辑':'新增'}}人员信息</blockTitle>
        <div class="content">
          <Row type="flex" justify="space-around">
            <Col span="10" v-if="current.type == '0' && type == 1">
            <p>角色类型:</p>
            <Select v-model="roleType">
              <Option v-for="item in roleTypeData" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col :span="(current.type == '1' && type == 0) ? '22':'10'">
            <p>角色名称:</p>
            <Input size="large" v-model="role.roleName" class="input"></Input>
            </Col>

            <Col span="10" v-if="current.type == '1' && type == 1">
            <p>所属部门:</p>
            <Select v-model="role.bmOrganizationName">
              <Option v-for="item in roleTypeData" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col span="10" v-if="current.type == '0' && type == 0">
            <p>所属部门:</p>
            <Select disabled v-model="role.bmOrganizationName">
              <Option v-for="item in roleTypeData" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row v-if="roleType == '0'">
            <Col span="9" offset="1" style="line-height: 120px"> 角色状态:
            <Radio-group v-model="status" style="margin-left:30px">
              <Radio size="large" label="启用" style="margin-right:20px"></Radio>
              <Radio size="large" label="禁用"></Radio>
            </Radio-group>
            </Col>
          </Row>
          <template v-else>
            <Row type="flex" justify="space-around">
              <Col span="10">
              <p>所属部门:</p>
              <Select v-model="role.bmOrganizationName">
                <Option v-for="item in roleTypeData" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
              </Col>
              <Col span="10" style="line-height: 120px"> 角色状态:
              <Radio-group v-model="status" style="margin-left:30px">
                <Radio size="large" label="启用" style="margin-right:20px"></Radio>
                <Radio size="large" label="禁用"></Radio>
              </Radio-group>
              </Col>
            </Row>
          </template>
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
      roleType: '0',
      current: {},
      roleTypeData: [{
        value: '0',
        label: '公有角色'
      }, {
        value: '1',
        label: '私有角色'
      }],
      type: this.$route.query.type,
    }
  },
  mounted() {
    $("#content").css({ "height": window.innerHeight, "background": '#F0F5FB' })

    this.http.post('user/getCurrentUserInfo', {})
      .then(data => {
        this.current = data.body
        if (this.$route.query.type == 0) {
          this.init()
        }
      })
  },
  methods: {
    init() {
      //this.$route.query.roleId
      this.http.post('user/selectRoleByRoleId', {})
        .then(data => {
          this.role = data.body
        })
    },
    submit() {
      let url = '/organization/save', params = {}
      params.roleName = this.role.roleName
      params.bmOrganizationId = this.role.bmOrganizationId
      params.roleType = this.role.roleType
      params.enableStatus = this.status == ' 启用' ? '0' : '1'
      params.remark = this.role.remark
      if (this.type) {
        url = '/organization/update'
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

.ivu-radio-checked .ivu-radio-inner {
  border-color: #00ceec;
}
</style>
