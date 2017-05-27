<template>
  <Row>
    <Col span='10'>2</Col>
    <Col span='6'>
    <Radio-group v-model="user.gender">
      <Radio label="male">男</Radio>
      <Radio label="female">女</Radio>
    </Radio-group>
    </Col>
  </Row>
</template>

<script>
export default {
  data() {
    return {
      user: {
        gender: 'male'
      }
    }
  }
}
</script>
