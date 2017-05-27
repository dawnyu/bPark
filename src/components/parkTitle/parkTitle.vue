<template>
  <Row class="title-bar">
    <Col span="1" style="text-align: center;">车场选择</Col>
    <Col span="4" class="select">
    <Select v-model="curPark" ref='select' multiple filterable noSelection type="search" :fillCurPark="fillCurPark" placeholder="" @on-hide="onHide">
      <Option v-for="park in parkList" :value="park.pmParkId">{{ park.parkName }}</Option>
    </Select>
    </Col>
    <Col span="4" v-clickoutside="handleClose">
    <p style="text-align:center;" @click="curShow = !curShow"> 已选择车场数量:
      <em>{{curPark.length}}</em>
      <Icon :class="{'ivu-icon-arrow-down-b':!curShow,'ivu-icon-arrow-up-b':curShow}"></Icon>
    </p>
    <transition name="slide-up">
      <div class="ivu-select-dropdown" v-show="curShow && Array.of(curParkObj.length)>0" style="width: 319px; transform-origin: center top 0px; position: absolute; left: 0px; top: 41px;" x-placement="bottom-start">
        <p class="select-close">
          <Button class="select-close-btn" size="small" @click.stop="curPark = []">清空</Button>
        </p>
        <ul class="ivu-select-dropdown-list">
          <li class="select-item" style="line-height:25px;" @click="deleteCur(parkSelected.pmParkId)" v-for="parkSelected in curParkObj">{{parkSelected.parkName}}</li>
        </ul>
      </div>
    </transition>
    </Col>
    <Col span="12">
    <Button icon="ios-search" class="select-btn" @click.stop="reload">查询</Button>
    </Col>
    <slot></slot>
    <Col span="2">
    <Button class="flag-button">
      <Icon type="ios-flag" size="20" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;指挥中心
    </Button>
    </Col>
  </Row>
</template>

<script>
import Emitter from '../../ui/mixins/emitter';
import clickoutside from '../../ui/directives/clickoutside';
export default {
  name: 'ParkTitle',
  mixins: [Emitter],
  directives: { clickoutside },
  data() {
    return {
      selectParks: [],
      parkList: [],
      curPark: [],
      curParkObj: [],
      curShow: false,
      fillCurPark: []
    }
  },
  mounted() {
    this.fetchParkList()
  },
  watch: {
    curPark: function (val) {
      this.curParkObj = []
      for (let parkId of this.curPark) {
        let park = this.parkList.find(item => { return item.pmParkId == parkId })
        this.curParkObj.push(park)
      }
      this.$emit("transmit", this.curPark, this.curParkObj)
    }
  },
  methods: {
    reload() {
      this.$emit("reload", this.curPark, this.curParkObj)
      this.$refs.select.handleClose()
    },
    onHide() {
      var temp = this.parkList.slice(0)
      for (let pmparkId of this.curPark) {
        let index = temp.findIndex(item => { return item.pmParkId == pmparkId })
        if (index > 0) {
          temp = temp.delete(index)
          temp.unshift(this.parkList.find(item => { return item.pmParkId == pmparkId }))
        }
      }
      this.parkList = temp.slice(0)
    },
    deleteCur(id) {
      let index = this.curPark.findIndex(item => { return item == id })
      this.curPark = this.curPark.delete(index)
    },
    fetchParkList() {
      this.http.post('parkList', {})
        .then(data => {
          this.parkList = data.parkListInfo
          this.parseParkList(data.parkListInfo)
          this.getAllOptionVal(data.parkListInfo)
        })
    },
    parseParkList(list) {
      let local = {}, curPark = []
      if (sessionStorage.getItem("parkList")) {
        local = Object.assign({}, JSON.parse(sessionStorage.getItem("parkList")))
        for (let park of local) {
          let index = list.findIndex(item => { return item.pmParkId == park.pmparkId })
          if (index > -1) {
            curPark.push(park)
          }
        }
        sessionStorage.setItem("parkList", JSON.stringify(curPark))
      }
    },
    getAllOptionVal(list) {
      let curPark = []
      for (let park of list) {
        curPark.push(park.pmParkId)
      }
      this.fillCurPark = curPark
      this.curPark = curPark
    },
    handleClose() {
      this.curShow = false
    }
  }
}
</script>
<style lang="less">
@import '../../assets/less/reset.less';
.title-bar {
  line-height: 3rem;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 1px 4px 7px #d0d0d0;
  .select {
    margin-right: 2%;
  }
  em {
    font-family: @num-font-family;
    font-size: 22px;
    margin: 0 .4rem;
    font-weight: normal;
    font-style: normal;
  }
}

.flag-button {
  background: @flag-button-color;
  color: #fff;
  &:hover {
    color: #fff;
    background-color: @flag-button-color;
    border-color: @flag-button-color;
  }

  i {
    position: absolute;
    transform: rotate(-10deg);
  }
}

.select-item {
  cursor: pointer;
  &:before {
    display: inline-block;
    font-family: "Ionicons";
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    text-rendering: auto;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    margin: 0 10px;
    content: '\F374' !important;
    color: rgba(51, 153, 255, 0.9);
  }
  &:hover {
    background: @background-color-select-hover;
  }
  &focus {
    color: shade(@selected-color, 10%);
    background: #fff;
  }
}

.select-close {
  border-bottom: 1px solid #f1eded;
  line-height: 2rem;
  &-btn {
    color: #fff;
    background: #b7b6b6;
    padding: 1px 7px;
    margin-left: 10px;
  }
  &-btn:hover {
    color: #fff;
    border: 1px solid darken(#a0a0a0, 10%);
    background: darken(#a0a0a0, 10%);
  }
  &:before {
    color: #46596B!important;
  }
}

.select-full {
  border-bottom: 1px solid #e4e4e4;
  height: 26px;
  cursor: pointer;
  &-btn {
    padding: 7px 16px;
    &:before {
      display: inline-block;
      font-family: "Ionicons";
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      text-rendering: auto;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: 16px;
      margin-right: 20px;
      content: '\F372';
    }
  }
  &-btn-selected {
    padding: 7px 16px;
    &:before {
      display: inline-block;
      font-family: "Ionicons";
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      text-rendering: auto;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: 16px;
      margin-right: 20px;
      content: '\F374';
    }
  }
}

.select-item:before {
  color: #46596B!important;
}

.ivu-select-multiple .ivu-select-item {
  color: #b4bbc3;
}

.ivu-select-multiple .ivu-select-item-selected {
  color: #46596B!important;
  &:before {
    color: #46596B!important;
  }
}

.select-btn {
  font-size: 14px;
  padding: 2px 15px;
  background: #00ceec;
  border-color: #00ceec;
  color: #fff;
  &:hover {
    color: #fff;
    background: darken(#00ceec, 5%);
    border-color: darken(#00ceec, 5%);
    ;
  }
  &:active {
    color: #fff;
    background: darken(#00ceec, 10%);
    border-color: darken(#00ceec, 10%);
  }
}
</style>
