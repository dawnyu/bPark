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
      <Col span='5'>
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
                <img :src="img.url" alt="">
              </div>
            </div>
            <p class="seg-line">
              <span>
                <img src="../assets/images/list_photo.png" alt="">进场全景照片</span>
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
      <Col span='5' class="border-right">
      <p class="title">
        <span>
          出场基本信息
        </span>
      </p>
      <Row>
        <Col>
        <div class="left-content">
          <div class="in-come">
            <div class="in-come-title">
              <p>
                <Icon type="person" size="16"></Icon>{{orderInfo.outGmUser}}
              </p>
              <p>
                <span>出场时间</span>
                <span>
                  <em>{{orderInfo.outParkDate+orderInfo.outParkTime|dateFormatter(1,8)}}</em>{{orderInfo.outParkDate+orderInfo.outParkTime|dateFormatter(1,5)}}
                </span>
              </p>
              <p>
                <span>出场岗亭</span>
                <span>
                  {{orderInfo.outParkExit}}
                </span>
              </p>
            </div>
            <div class="left-content-img-top">
              <div v-for="img in outComeimgs">
                <img :src="img.url" alt="">
              </div>
            </div>
            <p class="seg-line">
              <span class="seg-open">
                <img src="../assets/images/list_image.png" alt="">进场全景照片</span>
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
      <Col span="7" class="border-right">
      <p class="title">
        <span>
          收费信息
        </span>
      </p>
      <Row>
        <Col>
        <div class="left-content">
          <div class="charge-message">
            <div class="charge-message-title">
              <Row class="charge-message-title-row" style="top:40px">
                <Col span="4" class="icon-left">
                <p class="icon-round" style="border: 2px solid #00ceec"></p>
                </Col>
                <Col span="6" class="charge-message-title-row-center">
                <span>
                  停放时长</span>
                </Col>
                <Col span="10">
                <span style="font-size:25px">{{orderInfo.parkTime|parseParkingTimeStr}}</span>
                </Col>
              </Row>
              <Row class="charge-message-title-row" style="top:50px">
                <Col span="4" class="icon-left">
                <Icon type="android-more-vertical" size="28"></Icon>
                </Col>
              </Row>
              <Row class="charge-message-title-row" style="top:60px">
                <Col span="4" class="icon-left">
                <p class="icon-round"></p>
                </Col>
                <Col span="6" class="charge-message-title-row-center">
                <span>停车费用</span>
                </Col>
                <Col span="10">
                <em>{{orderInfo.payAmount|parseMoney}}</em>元</Col>
              </Row>
            </div>
            <div>
              <Row class="charge-message-row charge-message-row-info">
                <Col span="15" offset="3">已支付</Col>
                <Col span="5" class="charge-message-row-val">{{orderInfo.paid|parseMoney}}</Col>
              </Row>
              <p class="hr"></p>
              <Row class="charge-message-row" v-if="orderInfo.generalizedPay !== '0'">
                <Col span="16" offset="2">一般性支付</Col>
                <Col span="6" class="charge-message-row-val">{{orderInfo.generalizedPay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row" v-if="orderInfo.servicePay !== '0'">
                <Col span="16" offset="2">场内服务台支付</Col>
                <Col span="6" class="charge-message-row-val">{{orderInfo.servicePay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row" v-if="orderInfo.paymentPay !== '0'">
                <Col span="16" offset="2">自助缴费机支付</Col>
                <Col span="6" class="charge-message-row-val">{{orderInfo.paymentPay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row" v-if="orderInfo.phonePay !== '0'">
                <Col span="16" offset="2">场内手机要码支付</Col>
                <Col span="6" class="charge-message-row-val">{{orderInfo.phonePay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row" v-if="orderInfo.thirdpartyPay !== '0'">
                <Col span="16" offset="2">第三方平台支付</Col>
                <Col span="6" class="charge-message-row-val">{{orderInfo.thirdpartyPay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row charge-message-row-alert">
                <Col span="15" offset="3">减免费用</Col>
                <Col span="5" class="charge-message-row-val">{{orderInfo.punishment|parseMoney}}</Col>
              </Row>
              <p class="hr"></p>
              <Row class="charge-message-row" v-if="orderInfo.paymentMemberPay !== '0'">
                <Col span="16" offset="2">自助缴费机会员积分支付</Col>
                <Col span="6" class="charge-message-row-val">-{{orderInfo.paymentMemberPay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row" v-if="orderInfo.phoneCouponPay !== '0'">
                <Col span="16" offset="2">场内手机扫码会员卡券支付</Col>
                <Col span="6" class="charge-message-row-val">-{{orderInfo.phoneCouponPay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row" v-if="orderInfo.thirdpartySubsidyPay !== '0'">
                <Col span="16" offset="2">第三方平台会员补贴支付</Col>
                <Col span="6" class="charge-message-row-val">-{{orderInfo.thirdpartySubsidyPay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row" v-if="orderInfo.thirdpartyEquityPay !== '0'">
                <Col span="16" offset="2">第三方平台权益支付</Col>
                <Col span="6" class="charge-message-row-val">-{{orderInfo.thirdpartyEquityPay|parseMoney}}</Col>
              </Row>
              <Row class="charge-message-row" v-if="orderInfo.generalizedPaperCouponPay !== '0'">
                <Col span="16" offset="2">一般性支付纸质优惠券减免</Col>
                <Col span="6" class="charge-message-row-val">-{{orderInfo.generalizedPaperCouponPay|parseMoney}}</Col>
              </Row>
            </div>
          </div>
        </div>
        </Col>
      </Row>
      </Col>
      <Col span='7'>
      <p class="title">
        <span style="margin-left:20px">
          车主泊位租赁信息
        </span>
      </p>
      <Row>
        <template v-if="~~carCardList.length>0">
          <Col span="23" style="margin-top:20px" v-for="carCard in carCardList">
          <car-card :list="carCard.relevanceCar" :validDate="carCard.validityStart + '——' + carCard.validityEnd" :residue="carCard.residueDays" :title="carCard.cardType "></car-card>
          </Col>
        </template>
        <car-card v-else></car-card>
      </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
import { SUBINTERFACE, CARCOLOR, CARCOLORNAME } from '../assets/js/constants.js'
export default {
  data() {
    return {
      defaultImg: require('../assets/images/list_moren2.png'),
      orderInfo: {},
      inComeimgs: [],
      outComeimgs: [],
      carCardList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.http.post('tcbstats/orderRest/outParkOrderDetails', {
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
      this.http.post('tcbstats/orderRest/orderImgs', {
        omParkStrandrdId: this.$route.query.omParkStrandrdId,
        type: 0
      }).then(data => {
        this.outComeimgs = data.resultData
      })
    }
  }
}
</script>

<style lang="less" scoped  src="../assets/less/outorder.less"></style>
