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
        <blockTitle style="margin-top:30px">{{this.$route.query.bmFunctreeId ? '编辑':'新增'}}人员信息</blockTitle>
        <div class="content">
          <Row type="flex" justify="space-around">
            <Col span="10">
            <p>资源名称:</p>
            <Input size="large" v-model="resource.name" class="input"></Input>
            </Col>
            <Col span="10">
            <p>资源链接:</p>
            <Input size="large" v-model="resource.url" class="input"></Input>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="10">
            <p>资源类型:</p>
            <Select v-model="resourceType" :disabled="type">
              <Option v-for="item in resourceTypes" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col span="10">
            <p>排序编码:</p>
            <Input size="large" v-model="resource.name" class="input"></Input>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="22">
            <p>资源描述:</p>
            <Input type="textarea" v-model="resource.remark" :maxlength=2000 :autosize="{minRows: 6,maxRows: 6}" placeholder="资源描述..."></Input>
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
      ztreeDataSource: []
    }
  },
  mounted() {
    $("#content").css({ "height": window.innerHeight, "background": '#F0F5FB' })
    $(".left-tree").css({ "height": window.innerHeight })
    if (this.$route.query.type == 0) {
      this.init()
    }
    this.selectFunctreeByCurrentUser()
  },
  methods: {
    nodeClick(m) {
      this.levelCode = m.levelCode
    },
    init() {
      //this.$route.query.bmFunctreeId
      this.http.post('funcTree/selectFuncTreeById', {})
        .then(data => {
          this.resource = data.body
        })
    },
    selectFunctreeByCurrentUser() {
      this.http.post('/funcTree/selectFunctreeByCurrentUser', {})
        .then(data => {
          this.$nextTick(() => {
            this.ztreeDataSource = data.body
          })
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
<style lang="less" scoped src="../assets/less/resource.less"></style>
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
