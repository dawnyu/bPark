<template>
  <div id="content">
    <article>
      <div class="wrapper">
        <blockTitle style="margin-top:30px">{{this.$route.query.bmOrganizationId ? '编辑':'新增'}}人员信息</blockTitle>
        <div class="content">
          <Row type="flex" justify="space-around">
            <Col span="10">
            <p>人员名称:</p>
            <Input size="large" v-model="user.name" class="input"></Input>
            </Col>
            <Col span="10">
            <p>所属部门:</p>
            <Input size="large" :disabled="type" v-model="user.bmOrganizationName" class="input"></Input>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="10">
            <p>登录账户:</p>
            <Input size="large" :disabled="type" v-model="user.login" class="input"></Input>
            </Col>
            <Col span="10">
            <p>登录密码:</p>
            <Input size="large" v-model="user.name" class="input"></Input>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="10" style="line-height: 100px"> 人员状态:
            <Radio-group v-model="status" style="margin-left:20px">
              <Radio label="启用"></Radio>
              <Radio label="禁用"></Radio>
            </Radio-group>
            </Col>
            <Col span="10">
            <p>邮件地址:</p>
            <Input size="large" v-model="user.email" class="input"></Input>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="10">
            <p>手机号码:</p>
            <Input size="large" v-model="user.phone" class="input"></Input>
            </Col>
            <Col span="10">
            <p>座机号码:</p>
            <Input size="large" v-model="user.contact" class="input"></Input>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="22">
            <p>部门描述:</p>
            <Input type="textarea" v-model="user.remark" :maxlength=2000 :autosize="{minRows: 6,maxRows: 6}" placeholder="部门描述..."></Input>
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
      user: {},
      status: '启用',
      type: this.$route.query.type === 1 ? false : true
    }
  },
  mounted() {
    $("#content").css({ "height": window.innerHeight, "background": '#F0F5FB' })
    if (this.$route.query.type == 0) {
      this.init()
    }
  },
  methods: {
    init() {
      //this.$route.query.userId
      this.http.post('user/selectUserByUserId', {})
        .then(data => {
          this.user = data.body
        })
    },
    submit() {
      let url = ''
      this.$route.query.type === 0 ? url = '/organization/save' : url = '/organization/update'
      this.http.post(url, {
        organizationCode: this.user.organizationCode,
        parentCode: this.$route.query.parentCode,
        name: this.user.name,
        enableStatus: 0,
        remark: this.user.remark
      }).then(data => {
        debugger
        alert(data.msg)
        this.$router.push({ path: '/department' })
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
</style>
