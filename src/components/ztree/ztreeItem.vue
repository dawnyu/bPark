<template>
  <li :class="liClassVal">
    <span :class="spanClassVal" @click='open(model)'></span>
    <a :class="aClassVal" @click='Func(model)'>
      <span>
        <img v-if='model.iconPath' :src='model.iconPath' :style='model.iconStyle'>
      </span>
      <span class="node_name">{{model.name}}</span>
    </a>
    <ul :class="ulClassVal" v-show='model.isFolder'>
      <ztree-item v-for="(item,i) in model.children" :key='i' :callback.sync='callback' :model.sync="item" :num.sync='i' root='1' :nodes.sync='model.children.length' :trees.sync='trees'></ztree-item>
    </ul>
  </li>
</template>

<script>
import ZtreeItem from 'ztreeItem'
export default {
  components: {
    ZtreeItem
  }
props: {
    model: {
      type: Object,
      twoWay: true
    },
    num: {
      type: Number,
      twoWay: true
    },
    nodes: {
      type: Number,
      twoWay: true,
      default: 0
    },
    trees: {
      type: Array,
      twoWay: true,
      default: []
    },
    root: {
      type: String,
      twoWay: true
    },
    callback: {
      type: Function,
      twoWay: true
    }
  },
  methods: {
    Func(m) {
      this.callback.call(null, m);

      // 查找点击的子节点
      var recurFunc = function (data) {
        data.forEach(function (i) {
          if (i.id == m.id) {
            i.clickNode = true;
          } else {
            i.clickNode = false;
          }
          if (i.children) {
            recurFunc(i.children);
          }
        })
      }
      recurFunc(this.trees);
    },
    open(m) {
      m.isFolder = !m.isFolder;
    }
  },
  computed: {
    // 给（根 和 子树）赋值不同的样式
    rootClass: function () {
      var strRootClass = '';

      // 根判断
      if (this.root == '0') {
        strRootClass = (this.num == 0 && !this.model.children) ? "roots_docu" : (this.nodes == 1) || (this.num == 0 && this.nodes != this.num + 1) ?
          "root_" : (this.nodes == this.num + 1) ? "bottom_" : "center_"

        // 子树判断
      } else if (this.root == '1') {
        strRootClass = this.nodes > 1 && this.model.children && this.nodes != this.num + 1
          ? "center_" :
          (this.num == 0 && this.nodes > 1) || (this.nodes != this.num + 1) ? "center_docu" :
            this.nodes == 1 && this.num != 0 || (this.nodes == this.num + 1 && this.model.children) ? "bottom_" : "bottom_docu";
      }
      return strRootClass
    },
    // 是否有儿子节点
    isChildren: function () {
      return this.num + 1 != this.nodes;
    },
    // 展开/收起
    prefixClass: function () {
      var returnChar = "";
      if (this.rootClass.indexOf("docu") == -1) {
        if (this.model.isFolder) {
          returnChar = "open";
        } else {
          returnChar = 'close'
        }
      }
      if (!this.model.children && this.rootClass.indexOf("docu") == -1) {
        returnChar = 'docu'
      }

      return returnChar;
    },
    liClassVal: function () {
      return "level" + this.num;
    },
    spanClassVal: function () {
      return "button level" + this.num + " switch " + this.rootClass + this.prefixClass;
    },
    aClassVal: function () {
      return this.model.clickNode ? "level" + this.num + ' curSelectedNode' : "level" + this.num;
    },
    ulClassVal: function () {
      return this.isChildren && this.model.children ? "level" + this.num + ' line' : "level" + this.num;
    }
  }
}
</script>

