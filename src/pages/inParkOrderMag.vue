<template>
  <div>
    <parkTitle @reload="reloadPage" />
    <article>
      <Row class="border-bottom">
        <Col>
        <carNumDatePickerHeader @selectDate="fetchDate" :isShowEndPicker='false' class="date-picker-wrapper" />
        </Col>
      </Row>
      <Row type="flex" justify="end" class="export-excel-row">
        <Col span="4">
        <span class="export-excel-row-btn" @click="downLoadExcel">
          <i class="icon-excel iconfont icon-x-xlsx"></i>导出excel
        </span>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="22">
        <table cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td>编号</td>
            <td>停车场</td>
            <td>车牌号</td>
            <td>进场时间</td>
            <td>进场岗亭</td>
            <td>进场收费员</td>
            <td>车辆类型</td>
            <td>订单操作</td>
          </tr>
          <tr v-for="(inParkOrder,index) in inParkOrderList">
            <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
            <td>{{inParkOrder.pmParkName}}</td>
            <!--<td><car-num :value="inParkOrder.carNum" size="12" /></td>-->
            <td> <span class="bd" :class="inParkOrder.color"><span class="carNumFir" :class="inParkOrder.color">{{inParkOrder.carNum.substr(0,1)}}</span> <span>{{inParkOrder.carNum.substr(1)}}</span></span> </td>
            <td>{{inParkOrder.inParkDate+inParkOrder.inParkTime | dateFormatter(1,5)}}&nbsp;&nbsp;{{inParkOrder.inParkDate+inParkOrder.inParkTime | dateFormatter(1,8)}}</td>
            <td>{{inParkOrder.inParkExit}}</td>
            <td>{{inParkOrder.inGmUser}}</td>
            <td>{{inParkOrder.carType}}</td>
            <td>
              <Button size="small" class="info-btn" @click.stop="checkInfo(inParkOrder)">查看详情</Button>
            </td>
          </tr>
        </table>
        </Col>
      </Row>
      <Row type="flex" justify="center" style="margin:50px;">
        <Col>
        <Page :total="~~totalCount" :pageSize='pageSize' @on-change="toPage" v-if="totalCount > pageSize"></Page>
        </Col>
      </Row>
    </article>
  </div>
</template>
<script>
export default {
  data(){
    return{
      carNum:'',
      inParkStartDateTime:'',
      inParkEndDateTime: '',
      pmParkIds:'',
      totalCount: 0,
      page:1,
      pageSize:10,
      inParkOrderList:[]
    }
  },
  computed:{
  },
  methods:{
    reloadPage(pmParkId) {
      this.pmParkId = pmParkId
       if(!this.pmParkId || pmParkId.length == 0){
        alert("请选择停车场")
        return 
      }
      this.init()
    },
    fetchDate(obj = {}) {
      this.carNum = obj.carNum
      this.inParkStartDateTime = obj.inParkStartDateTime
      this.inParkEndDateTime = obj.inParkEndDateTime
      this.init()
    },
    init(){
      this.getInParkOrderPage()
    },
     /**
     * 查询已出场订单列表
     */
     getInParkOrderPage(){
       this.http.post('tcbstats/orderRest/inParkOrderList', {
         pmParkIds:JSON.stringify(this.pmParkId),
         inParkStartDateTime:this.inParkStartDateTime,
         inParkEndDateTime:this.inParkEndDateTime,
         carNum: this.carNum,
         start:(this.page-1) * this.pageSize,
         limit: this.pageSize
       }).then((data)=>{
        this.inParkOrderList = data.resultData[0].message
        this.totalCount = data.resultData[0].totalCount
       })
    },
    downLoadExcel(){
      this.http.post('getInParkOrderExcel', {
        pmParkIds:JSON.stringify(this.pmParkId),
        inParkStartDateTime:this.inParkStartDateTime,
        inParkEndDateTime:this.inParkEndDateTime,
        outParkStartDateTime:this.outParkStartDateTime,
        outParkEndDateTime: this.outParkEndDateTime,
        carNum: this.carNum
      }).then((data)=>{
      
      })
    },
    checkInfo(inParkOrder){
       this.$router.push({path:"/onorder", query: {omParkStrandrdId:inParkOrder.omParkStrandrdId}})
    },
    toPage(page) {
      this.page = page
    }
  }
}
</script>

<style lang="less" scoped src="../assets/less/parkOrderMag.less"></style>

