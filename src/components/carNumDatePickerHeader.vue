<template>
  <Row class="title">
    <Col span="1" style="text-align: center;"> 车牌号
    </Col>
    <Col span="2"> 
    <Input v-model="carNum" size="small" placeholder="请输入车牌号" style="max-width: 200px" ></Input>
    </Col>
    <Col span="1" style="text-align: center; margin-left: 20px;"> 进场时间
    </Col>
    <Col span="2">
    <Date-picker type="date" size="small" @on-change="onChangeDateStart" v-model="inParkStartDateTime" format="yyyy-MM-dd" placeholder="选择日期" style="max-width: 200px"></Date-picker>
    </Col>
    <Col span="1" style="width: initial;margin:0 10px;">—
    </Col>
    <Col span="2">
    <Date-picker type="date" size="small" @on-change="onChangeDateEnd" v-model="inParkEndDateTime" format="yyyy-MM-dd" placeholder="选择日期" style="max-width: 200px"></Date-picker>
    <!--<Time-picker v-model="inParkEndDateTime"  @on-change="onChangeTimeStart" size="small" format="HH:mm:ss" placeholder="选择时间" style="max-width: 200px"></Time-picker>-->
    </Col>
    <template v-if="isShowEndPicker">
      <Col span="1" style="text-align: center; margin-left: 20px;"> 出场时间
      </Col>
      <Col span="2">
      <Date-picker type="date" size="small" v-model="outParkStartDateTime" format="yyyy-MM-dd" placeholder="选择日期" style="max-width: 200px"></Date-picker>
      </Col>
      <Col span="1" style="width: initial;margin:0 10px;">—
      </Col>
      <Col span="2">
      <Date-picker type="date" size="small" v-model="outParkEndDateTime" format="yyyy-MM-dd" placeholder="选择日期" style="max-width: 200px"></Date-picker>
      <!--<Time-picker v-model="outParkEndDateTime"  @on-change="" size="small" format="HH:mm:ss" placeholder="选择时间" style="max-width: 200px"></Time-picker>-->
      </Col>
    </template>
    <Col span='1' offset="1" >
    <Button icon="ios-search" size="small" class="select-btn" @click="select">查询</Button>
    </Col>
    <Col span='1' style="margin-left:10px">
        <Button size="small" class="clean-btn" @click="clean">
          <i class="icon-clean iconfont icon-clean"></i>清空
        </Button>
    </Col>
  </Row>
</template>
<script>
import {  getLastday,dateFormatter } from '../assets/js/date.js'
export default {
  props:{
    isShowEndPicker: {
      type: Boolean,
      default: false
      }
  },
  data() {
    return {
      carNum:'',
      inParkStartDateTime: getLastday(),
      inParkEndDateTime:getLastday(),
      outParkStartDateTime: getLastday(),
      outParkEndDateTime:getLastday(),
    }
  },
  computed: {
  },
  watch: {
    // inParkStartDateTime:function () {
    //   this.curDate =  this.inParkStartDateTime.replace(/-/g,'/')
    //   this.$set(this.rangeDate,'disabledDate',(date) => {
    //     return date && date.valueOf() < Date.parse(this.curDate)
    //   })
    // }
  },
  methods: {
    clean(){
      this.carNum=''
      this.inParkStartDateTime = ''
      this.outParkStartDateTime = ''
      this.inParkEndDateTime = ''
      this.outParkEndDateTime = ''
    },
    select() {
      this.$emit("selectDate", {
        carNum: this.carNum,
        inParkStartDateTime: dateFormatter(this.inParkStartDateTime,9),
        inParkEndDateTime: dateFormatter(this.inParkEndDateTime,9),
        outParkStartDateTime: dateFormatter(this.outParkStartDateTime,9),
        outParkEndDateTime: dateFormatter(this.outParkEndDateTime,9)
      })
    },
    onChangeDateStart(date) {
      this.inParkStartDateTime = date
      this.outParkStartDateTime = date
    },
    onChangeDateEnd(date) {
      this.inParkEndDateTime = date
      this.outParkEndDateTime = date
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/less/variable.less';
.title {
  height: 24px;
  line-height: 24px;
}

.ivu-btn:hover {
  color: @header-title-color;
  border-color: @header-title-color;
}

.ivu-btn-small {
  padding: 2px 15px;
}

.select-btn:hover {
  color: #fff;
}
.clean-btn{
  color: #fff;
  background: #aab3bc;
}
.clean-btn:hover{
  color: @alert-font-color;
}
.icon-clean{
  margin-right: 8px;
}

.selected {
  color: #fff;
  background-color: @header-title-color;
  border-color: @header-title-color;
  &:hover {
    color: #fff;
  }
}
</style>
