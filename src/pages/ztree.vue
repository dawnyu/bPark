<template>
  <div>
    <h1>{{ msg }}</h1>
    <div style='width:280px;'>
      <ztree :list.sync='ztreeDataSource' :func.sync='nodeClick' :is-open='true'></ztree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue-Ztree-2.0!',
      ztreeDataSource: [{
        id: 1,
        name: "音乐",
        nodeList: [],
        path: "http://www.baidu.com"
      }, {
        id: 220,
        name: "游戏",
        nodeList: [],
        path: "http://www.baidu.com"
      }, {
        id: 2344344334,
        name: "视频",
        nodeList: [{
          id: 34343434334,
          name: "电影",
          nodeList: [{
            id: 443433434,
            name: "国产电影",
            path: ""
          }, {
            id: 5434343,
            name: "好莱坞电影",
            path: ""
          }, {
            id: 643344334,
            name: "小语种电影",
            path: ""
          }]
        }, {
          id: 7,
          name: "短片",
          nodeList: [{
            id: 9,
            name: "电视剧",
            path: ""
          }, {
            id: 10,
            name: "短片",
            path: ""
          }]
        }],
        path: ""
      }]
    }
  },
  methods: {
    nodeClick: function (m) {
      // console.log(JSON.parse(JSON.stringify(m)));
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
