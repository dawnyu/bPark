<template>
  <div class="wrapper" :class="{'no-message':list == null}">
    <template v-if="list != null">
      <span class="title">{{title}}</span>
      <div class="car-card-head">
        <img src="../assets/images/car_bg.png" alt="">
        <p>剩余可用天数</p>
        <span class="day-num">
          <em>{{residue}}</em>天</span>
      </div>
      <Row style="margin:20px 0">
        <Col span="8" class="row-left">
        <span>关联车辆信息</span>
        </Col>
        <Col span="15">
        <Row>
          <Col span="12" v-for="obj in tempList" style="margin:10px 0">
          <car-num :value="obj.carNum" :color="obj.color"></car-num>
          </Col>
          <Col span="12" v-if="~~list.length > 3" style="margin:10px 0">
          <span class="more" @mouseover="showRelevance = true" @mouseout="showRelevance = false">
            <i class="iconfont icon-more2"></i>查看更多
          </span>
          <div class="relevance-car" v-show="showRelevance">
            <relevance-car :list="list"></relevance-car>
          </div>
          </Col>
        </Row>
        </Col>
      </Row>
      <Row class="valid">
        <Col span="8" class="row-left">
        <span>有效期限</span>
        </Col>
        <Col span="12">
        <em>{{validDate}}</em>
        </Col>
      </Row>
    </template>
    <template v-else>
      <span class="title">租赁卡</span>
      <div style="margin-top:100px">
        <img src="../assets/images/list_moren1.png" alt="">
        <p>暂无租赁信息</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempList: this.list.slice(0, 3),
      showRelevance: false
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    validDate: {
      type: String,
      default: ''
    },
    residue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  }
}
</script>

<style scoped lang="less">
@import '../assets/less/variable.less';
.wrapper {
  width: 80%;
  height: 360px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  border: 1px solid @border-color-base;
  .title {
    position: absolute;
    left: -11px;
    padding: 3px 20px;
    color: #fff;
    top: 18px;
    border-radius: 20px;
    background: @select-btn-color;
  }
  .day-num {
    color: @normal-font-color;
    font-size: 14px;
    position: absolute;
    top: 61px;
    left: 44%;
    em {
      font-size: 2rem;
      font-family: @num-font-family;
      font-style: normal;
    }
  }
}

.car-card-head {
  height: 150px;
  margin-top: 30px;
}

.more {
  border: 1px solid @border-color-base;
  background: #EEF5FD;
  padding: 0px 12px;
  float: left;
  cursor: pointer;
  i {
    position: relative;
    top: 1px;
    left: -5;
  }
}

.row-left {
  margin-top: 3px;
  text-align: left;
  span {
    margin-left: 20px;
  }
}

.valid {
  margin: 20px 0;
  em {
    font-size: 1rem;
    font-family: @num-font-family;
    font-style: normal;
  }
}

.relevance-car {
  position: absolute;
  z-index: 10;
  left: -56%;
  top: 24px;
}

.no-message {
  background: #F0F5FB;
  .title {
    background: #AAB2BC!important;
  }
}
</style>
