<template>
  <div id="content">
    <article>
      <div class="wrapper">
        <blockTitle style="margin-top:30px">{{this.$route.query.bmOrganizationId ? '编辑':'新增'}}部门信息</blockTitle>
        <div class="content">
          <Row type="flex" justify="space-around" style="margin-bottom:50px">
            <Col span="10">
            <p>上级部门:</p>
            <Input size="large" :disabled="type" v-model="organization.parentName" class="input"></Input>
            </Col>
            <Col span="10">
            <p>部门名称:</p>
            <Input size="large" v-model="organization.name" class="input"></Input>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="22">
            <p>部门描述:</p>
            <Input type="textarea" v-model="organization.remark" :maxlength=2000 :autosize="{minRows: 10,maxRows: 10}" placeholder="部门描述..."></Input>
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
      organization: {},
      type: this.$route.query.type === 1 ? false : true,
      name: '',
      parentName: '',
      parentCode: '',
      remark: ''
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
      //this.$route.query.selectOrganizByOrganizationId
      this.http.post('organization/selectOrganizByOrganizationId', {})
        .then(data => {
          this.organization = data.body
        })
    },
    submit() {
      let url = ''
      this.$route.query.type === 0 ? url = '/organization/save' : url = '/organization/update'
      this.http.post(url, {
        organizationCode: this.$route.query.bmOrganizationId,
        parentCode: this.parentCode,
        name: this.organization.name,
        enableStatus: 0,
        remark: this.organization.remark
      }).then(data => {
        alert(data.msg)
        this.$router.push({ path: '/department' })
      })
    }
  }
}
</script>
<style lang="less" scoped src="../assets/less/part.less"></style>
<style lang="less">
.ivu-input-large {
  font-size: 16px;
  padding: 6px 7px;
  height: 50px;
}
</style>
