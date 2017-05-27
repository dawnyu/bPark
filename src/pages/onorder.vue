<template>
  <div>
    <Row class="title border-bottom">
      <Col span="8">
      <blockTitle>{{orderInfo.pmParkName}}</blockTitle>
      </Col>
      <Col span="2">
      <car-num class="title-car-num" :value="orderInfo.carNum" :color="orderInfo.color" size="16" />
      </Col>
      <Col span="2" class="label">车牌颜色：
      <em>{{orderInfo.color | parseCarNumColorName}}</em>
      </Col>
      <Col span="9" class="label">车牌类型：
      <em>{{orderInfo.carType}}</em>
      </Col>
    </Row>
    <Row>
      <Col span='11' class="border-right">
      <p class="title">
        <span>
          进场基本信息
        </span>
      </p>
      <Row>
        <Col>
        <div class="left-content">
          <div class="in-come">
            <div class="in-come-title">
              <p>
                <Icon type="person" size="16"></Icon>{{orderInfo.inGmUser}}
              </p>
              <p>
                <span>进场时间</span>
                <span>
                  <em>{{orderInfo.inParkDate+orderInfo.inParkTime|dateFormatter(1,8)}}</em>{{orderInfo.inParkDate+orderInfo.inParkTime|dateFormatter(1,5)}}
                </span>
              </p>
              <p>
                <span>进场岗亭</span>
                <span>
                  {{orderInfo.inParkExit}}
                </span>
              </p>
            </div>
            <div class="left-content-img-top">
              <div v-for="img in inComeimgs">
                <img :src="img.url" alt="" onerror="this.src='../static/loading-error.png'">
              </div>
            </div>
            <p class="seg-line">
              <span>
                <Icon type="ios-camera" size="20"></Icon>进场全景照片</span>
            </p>
            <div class="left-content-img-bottom">
              <div>
                <img src="../assets/images/todo.png" alt="">
              </div>
            </div>
          </div>
        </div>
        </Col>
      </Row>
      </Col>
      <Col span='12'>
      <p class="title">
        <span style="margin-left:20px">
          车主泊位租赁信息
        </span>
      </p>
      <Row>
        <template v-if="~~carCardList.length>0">
          <Col span="12" style="margin-top:20px" v-for="carCard in carCardList">
          <car-card :list="carCard.relevanceCar" :validDate="carCard.validityStart + '——' + carCard.validityEnd" :residue="carCard.residueDays" :title="carCard.cardType "></car-card>
          </Col>
        </template>
        <Col span="12" style="margin-top:20px" v-else>
        <car-card></car-card>
        </Col>
      </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
import { SUBINTERFACE, CARCOLOR, CARCOLORNAME } from '../assets/js/constants'
export default {
  data() {
    return {
      defaultImg: require('../assets/images/list_moren2.png'),
      orderInfo: {},
      inComeimgs: [],
      carCardList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.http.post('tcbstats/orderRest/inParkOrderDetails', {
        omParkStrandrdId: this.$route.query.omParkStrandrdId,
      }).then(data => {
        this.orderInfo = data.resultData[0]
        this.http.post('tcbstats/orderRest/berthMessage', {
          pmParkId: this.orderInfo.pmParkId,
          carNum: this.orderInfo.carNum
        }).then(data => {
          this.carCardList = data.resultData
        })
      })
      this.http.post('tcbstats/orderRest/orderImgs', {
        omParkStrandrdId: this.$route.query.omParkStrandrdId,
        type: 1
      }).then(data => {
        this.inComeimgs = data.resultData
      })
    }
  }
}
</script>

<style lang="less" scoped  src="../assets/less/onorder.less"></style>
