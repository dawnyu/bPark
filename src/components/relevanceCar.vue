<template>
  <div class="relevance-wrapper">
    <p class="title">
      <span>
        关联车辆信息
      </span>
    </p>
    <div class="car-box">
      <div v-for="obj in list" class="car-box-item">
        <car-num :value="obj.carNum" :color="obj.color" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/less/variable.less';
.relevance-wrapper {
  margin-top: 10px;
  border: 1px dashed #ccc;
  background: #F0F5FB;
  position: relative;
  &::before {
    content: '';
    padding: 4px 4px;
    background: #f0f5fb;
    position: absolute;
    top: -6px;
    left: 110px;
    z-index: 2;
    border-top: 1px dashed #ccc;
    border-right: 1px dashed #ccc;
    transform: rotate(-45deg);
  }
  .title {
    margin: 10px 0;
    text-align: left;
    span {
      color: @header-title-color;
      border-left: 3px solid @header-title-color;
      margin-left: 10px;
      font-size: 1.1em;
      padding-left: 0.5rem;
    }
  }

  .car-box {
    width: 240px;
    display: flex;
    flex-wrap: wrap;
    &-item {
      margin: 8px 15px;
    }
  }
}
</style>
