<template>
  <Row>
    <Col>
    <p>
      <span>
        <slot></slot>
      </span>
    </p>
    </Col>
  </Row>
</template>

<style lang="less" scoped>
@import '../assets/less/variable.less';
p {
  span {
    color: @header-title-color;
    border-left: 3px solid @header-title-color;
    margin-left: 40px;
    font-size: 1.3em;
    padding-left: 0.5rem;
  }
}
</style>
