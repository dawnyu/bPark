<template>
  <div id="content">
    <article>
      <div class="wrapper">
        <blockTitle style="margin-top:30px">{{this.$route.query.bmOrganizationId ? '编辑':'新增'}}部门信息</blockTitle>
        <div class="content">
          <Row type="flex" justify="space-around" style="margin-bottom:50px">
            <Col span="10">
            <p>上级部门:</p>
            <!--<Input size="large" :disabled="type" v-model="organization.parentName" class="input"></Input>-->
            <Select size="large" :disabled="type" v-model="superior" style="width:300px">
              <ztree :list='superiorList' :func='nodeClick' :is-open='true' select class="initial-height"></ztree>
            </Select>
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
      organization: {
        remark: ''
      },
      type: this.$route.query.type === 1 ? false : true,
      name: '',
      parentName: '',
      superior: '',
      parentCode: '',
      remark: '',
      superiorList: []
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
      this.http.post(`btcauthorize/organization/selectOrganizByOrganizationId/${this.$route.query.bmOrganizationId}`, {})
        .then(data => {
          this.organization = data.body
          this.superior = data.body.parentName
          $(".ivu-select-placeholder").hide()
          $(".ivu-select-selected-value").html(data.body.parentName).show()
        })
    },
    nodeClick(val) {
      this.superior = val.name
      this.parentCode = val.bmOrganizationId
      $(".ivu-select-selected-value").html(val.name)
    },
    selectOrganizByCurrentUser() {
      this.http.post('btcauthorize/organization/selectOrganizByCurrentUser', {})
        .then(data => {
          this.$nextTick(() => {
            this.superiorList = data.body
          })
        })
    },
    submit() {
      let url = '',
        params = {
          name: this.organization.name,
          enableStatus: 0,
          remark: this.organization.remark,
          parentCode: this.parentCode
        }
      if (this.$route.query.type === 0) {
        url = 'btcauthorize/organization/update'
        params.bmOrganizationId = this.$route.query.bmOrganizationId
      } else {
        url = 'btcauthorize/organization/save'
      }
      this.http.post(url, params).then(data => {
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

.initial-height {
  height: initial!important;
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
</style>
