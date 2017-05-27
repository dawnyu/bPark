<template>
  <div id="content">
    <article>
      <div class="wrapper">
        <blockTitle style="margin-top:30px">{{this.$route.query.bmUserId ? '编辑':'新增'}}人员信息{{this.type}}</blockTitle>
        <div class="content">
          <Form ref="formValidate" :model="user" :rules="userValidate" label-position="top">
            <Row>
              <Col span="10" offset="1">
              <Form-item label="用户名：" prop="name">
                <Input size="large" v-model="user.name" placeholder="请输入用户名"></Input>
              </Form-item>
              </Col>
              <Col span="10" offset="2">
              <Form-item label="所属部门：" prop="depart">
                <Select size="large" :disabled="type" v-model="depart">
                  <ztree :list='departList' :func='nodeClick' :is-open='true' select class="initial-height"></ztree>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="10" offset="1">
              <Form-item label="登录账户：" prop="login">
                <Input size="large" v-model="user.login" placeholder="请输入账户名"></Input>
              </Form-item>
              </Col>
              <Col span="10" offset="2">
              <Form-item label="登录密码：" prop="password">
                <Input size="large" v-model="user.password" type="password" placeholder=""></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="10" offset="1"> 人员状态:
              <Radio-group v-model="user.state">
                <Radio label="0">启用</Radio>
                <Radio label="1">禁用</Radio>
              </Radio-group>
              </Col>
              <Col span="10" offset="2">
              <Form-item label="邮件地址：" prop="email">
                <Input size="large" v-model="user.email" placeholder="请输入邮件地址"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="10" offset="1">
              <Form-item label="手机号码：" prop="phone">
                <Input size="large" v-model="user.phone" placeholder="请输入手机号码"></Input>
              </Form-item>
              </Col>
              <Col span="10" offset="2">
              <Form-item label="座机号码：" prop="contact">
                <Input size="large" v-model="user.contact" placeholder="请输入座机号码"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="22" offset="1">
              <Form-item label="人员描述：" prop="remark">
                <Input type="textarea" v-model="user.remark" :maxlength=2000 :autosize="{minRows: 6,maxRows: 6}" placeholder="部门描述..."></Input>
              </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Row style="margin-top:30px">
        <Col span="19" style="text-align:right">
        <Button class="submit-btn" @click="handleSubmit('formValidate')" size="large">确认</Button>
        <Button class="return-btn" @click="$router.go(-1)">取消</Button>
        </Col>
      </Row>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    let type = this.$route.query.type == 1 ? false : true
    return {
      user: {
        name: '',
        login: '',
        password: '',
        email: '',
        remark: '',
        phone: '',
        state: '0',
        contact: ''
      },
      type: type,
      userValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        login: [
          { required: true, message: '登录账户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: !type, message: '账户密码不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        mail: [
          { type: 'email', message: '邮件地址不正确', trigger: 'blur' }
        ]
      },
      departList: [],
      depart: '',
      validate: false
    }
  },
  mounted() {
    $("#content").css({ "height": window.innerHeight, "background": '#F0F5FB' })
    if (this.$route.query.type == 0) {
      this.init()
    }
    this.selectOrganizByCurrentUser()
  },
  methods: {
    init() {
      this.http.post(`btcauthorize/user/selectUserByUserId/${this.$route.query.bmUserId}`, {})
        .then(data => {
          this.user = data.body
          this.depart = data.body.bmOrganizationName
          $(".ivu-select-selected-value").html(data.body.bmOrganizationName)
          this.$nextTick(() => {
            $(".ivu-select-selected-value").show()
            $(".ivu-select-placeholder").hide()
          })
        })
    },
    nodeClick(val) {
      this.depart = val.name
      this.user.bmOrganizationId = val.bmOrganizationId
      $(".ivu-select-selected-value").html(val.name)
    },
    selectOrganizByCurrentUser() {
      this.http.post('btcauthorize/organization/selectOrganizByCurrentUser', {})
        .then(data => {
          this.$nextTick(() => {
            this.departList = data.body
            if (!this.type) {
              $(".ivu-select-selected-value").html(this.departList[0].name)
              this.$nextTick(() => {
                $(".ivu-select-selected-value").show()
                $(".ivu-select-placeholder").hide()
              })
            }
          })
        })
    },
    loginIsExist() {
      this.http.post(`btcauthorize/user/checkLogin/${this.user.login}`, {})
        .then(data => {
          this.validate = data.count || false
        })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let url = 'btcauthorize/user/save', params = {}
          params.name = this.user.name
          params.bmOrganizationId = this.user.bmOrganizationId
          params.login = this.user.login
          params.password = this.user.password
          params.type = 0
          params.bmOrganizationName = this.depart
          params.state = this.user.state
          params.email = this.user.email
          params.phone = this.user.phone
          params.contact = this.user.contact
          params.remark = this.user.remark
          if (this.type) {
            params.bmUserId = this.$route.query.bmUserId
            url = 'btcauthorize/user/update'
          }
          this.http.post(url, params).then(data => {
            this.$Message.success('提交成功')
            this.$router.push({ path: '/userlist' })
          })
        } else {
          this.$Message.error('表单验证失败')
        }
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
