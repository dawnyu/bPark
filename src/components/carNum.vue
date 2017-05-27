<template>
  <div style="line-height: 1">
    <Row :style="styles">
      <Col span="7" :style="lastStyles" v-text="province" />
      <Col span="17" :style="nextStyles" v-text="number" />
    </Row>
  </div>
</template>
<script>
import { CARCOLOR } from '../assets/js/constants.js'
export default {
  props: {
    value: {
      type: String,
      default: '0000000'
    },
    size: {
      type: [String, Number],
      default: 13
    },
    color: {
      type: String,
      default: '#1A6DDD'
    }
  },
  computed: {
    province() {
      return this.value.slice(0, 1)
    },
    number() {
      return this.value.slice(1, this.value.length)
    },
    styles() {
      return {
        'text-align': 'center',
        'width': `${this.size / 13 * 90}px`,
        'font-size': `${this.size}px`,
        'border': `1px solid ${CARCOLOR[this.color]}`
      }
    },
    lastStyles() {
      return {
        'color': '#ffffff',
        'padding': '5px',
        'background': `${CARCOLOR[this.color]}`
      }
    },
    nextStyles() {
      return {
        'padding': '5px'
      }
    }
  }
}
</script>
