<template>
  <div>
    <Select v-model="model" style="width:300px">
         <ztree :list='data' :func='nodeClick' :is-open='true' select class="test"></ztree>
    </Select>
     <Checkbox id="12" @on-change="abc"> </Checkbox>

  </div>
</template>

<script>
export default {
    data(){
    return {
      data:[],
      model:'',
       checkAllGroup: ['香蕉', '西瓜']
    }
  },
  mounted(){
    this.selectOrganizByFathorCode()
  },
  methods:{
    nodeClick(val){
      this.model = val.name
      $(".ivu-select-selected-value").html(val.name)
    },
     selectOrganizByFathorCode() {
      this.http.post('/organizatoin/selectOrganizByFathorCode', {})
        .then(data => {
          this.$nextTick(() => {
            this.data = data.body
          })
        })
    },
    abc(e){
      debugger
      console.dir(e)
    }
  }
}
</script>

<style lang="less" scoped>
  .test{
      height:initial;
  }
 
</style>

<style>

  
</style>