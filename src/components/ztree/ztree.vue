<template>
  <div class="zTreeDemoBackground left" v-if='data.length>0'>
    <ul class="ztree" :class="{'select-ztree':select}">
      <ztree-item v-for='(m,i) in data' :key='i' :model.sync="m" :num.sync='i' root='0' :nodes.sync='data.length' :callback='func' :trees.sync='data'></ztree-item>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  props: {
    // 树数据
    list: {
      type: Array,
      twoWay: true
    },
    // 点击回调
    func: {
      type: Function,
      twoWay: true
    },
    // 是否展开
    isOpen: {
      type: Boolean,
      twoWay: true,
      default: false
    },
    select:{
       type: Boolean,
       default: false
    }
  },
  watch: {
    list: function (val) {
      this.initTreeData()
    }
  },
  mounted() {
    this.initTreeData()
  },
  methods: {
    initTreeData() {
      var vm = this;
      var tempList = JSON.parse(JSON.stringify(this.list));

      // 递归操作，增加删除一些属性。比如: 展开/收起
      var recurrenceFunc = function (data) {
        data.forEach((m) => {
          m.clickNode = false;
          m.nodeList = m.nodeList || [];
          if (m.nodeList.length > 0) {
            m.isFolder = vm.isOpen;
            recurrenceFunc(m.nodeList);
          } else {
            delete m.nodeList;
          }
        })
      };
      recurrenceFunc(tempList);
      this.data = tempList;
      // console.log(JSON.stringify(this.data));
    }
  },
  components: {
    // 组件
    ztreeItem: {
      name: 'ztreeItem',
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
              if (i.code == m.code) {
                i.clickNode = true;
              } else {
                i.clickNode = false;
              }
              if (i.nodeList) {
                recurFunc(i.nodeList);
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
            strRootClass = (this.num == 0 && !this.model.nodeList) ? "roots_docu" : (this.nodes == 1) || (this.num == 0 && this.nodes != this.num + 1) ?
              "root_" : (this.nodes == this.num + 1) ? "bottom_" : "center_"

            // 子树判断
          } else if (this.root == '1') {
            strRootClass = this.nodes > 1 && this.model.nodeList && this.nodes != this.num + 1
              ? "center_" :
              (this.num == 0 && this.nodes > 1) || (this.nodes != this.num + 1) ? "center_docu" :
                this.nodes == 1 && this.num != 0 || (this.nodes == this.num + 1 && this.model.nodeList) ? "bottom_" : "bottom_docu";
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
          if (!this.model.nodeList && this.rootClass.indexOf("docu") == -1) {
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
          return this.isnodeList && this.model.nodeList ? "level" + this.num + ' line' : "level" + this.num;
        }
      },
      template:
      `<li :class="liClassVal">
      <i class="iconfont icon-biaotou-daoxu" v-if="model.nodeList && model.nodeList.length>0" @click='open(model)' style="font-size:20px"></i>
				<a :class="aClassVal" @click='Func(model)'>
				    <span><img v-if='model.iconPath' :src='model.iconPath' :style='model.iconStyle'></span>
					<span class="node_name" v-if="model.nodeList && model.nodeList.length>0"  @click='open(model)'>{{model.name}}</span>
          <span class="node_name" v-else>{{model.name}}</span>
				</a>
				<ul :class="ulClassVal" v-show='model.isFolder'>
					<ztree-item v-for="(item,i) in model.nodeList" :key='i' :callback.sync='callback' :model.sync="item" :num.sync='i' root='1' :nodes.sync='model.nodeList.length' :trees.sync='trees'></ztree-item>
				</ul>
			</li>`
    }
  },
  created() {
    this.initTreeData();
  }
}
</script>

<style lang="less">
@import '../../assets/less/variable.less';

div.ztree_content_wrap div.left {
  float: left;
  width: 100%;
}

div.zTreeDemoBackground {
  width: 100%;
  height: 500px;
  text-align: left;
  color:#657180;
}

.expendIcon {
  background-position: -74px -36px;
  line-height: 0;
  margin: 0;
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 4px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
}

ul.ztree {
  // border: 1px solid #ddd;
  background: #ffffff;
  width: 80%;
  margin: 20px auto;
  height: auto;
  overflow-x: auto;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.select-ztree{
  margin:0!important;
}
.ztree * {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif
}

.ztree {
  margin: 0;
  padding: 5px;
  color: #657180;
  li {
    position: relative;
    padding: 0;
    margin: 0;
    list-style: none;
    line-height: 24px;
    text-align: left;
    white-space: nowrap;
    outline: 0;
    ul {
      margin: 0;
      padding: 0 0 0 25px
    }
    a {
      padding: 1px 3px 0 0;
      margin: 0;
      cursor: pointer;
      height: 17px;
      color: #657180;
      background-color: transparent;
      text-decoration: none;
      vertical-align: top;
      display: inline-block;
      &:hover {
        text-decoration: underline;
        color: @select-btn-color;
      }
      input.rename {
        height: 14px;
        width: 80px;
        padding: 0;
        margin: 0;
        font-size: 12px;
        border: 1px #7EC4CC solid;
        *border: 0px
      }
    }
    a.curSelectedNode {
      padding-top: 0px;
      background-color: @select-btn-color;
      color: #fff;
      height: 24px;
      border: 1px @select-btn-color solid;
      opacity: 0.8;
    }
    a.curSelectedNode_Edit {
      padding-top: 0px;
      background-color: @select-btn-color;
      color: black;
      height: 16px;
      border: 1px @select-btn-color solid;
      opacity: 0.8;
    }
    a.tmpTargetNode_inner {
      padding-top: 0px;
      background-color: @select-btn-color;
      color: white;
      height: 16px;
      border: 1px @select-btn-color solid;
      opacity: 0.8;
      filter: alpha(opacity=80)
    }
  }
}

.ztree li span {
  line-height: 16px;
  margin-right: 2px
}

.ztree li span.button {
  line-height: 0;
  margin: 0;
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  .chk {
    width: 13px;
    height: 13px;
    margin: 0 3px 0 0;
    cursor: auto;
    .checkbox_false_full {
      background-position: 0 0
    }

    .checkbox_false_full_focus {
      background-position: 0 -14px
    }

    .checkbox_false_part {
      background-position: 0 -28px
    }

    .checkbox_false_part_focus {
      background-position: 0 -42px
    }

    .checkbox_false_disable {
      background-position: 0 -56px
    }

    .checkbox_true_full {
      background-position: -14px 0
    }

    .checkbox_true_full_focus {
      background-position: -14px -14px
    }

    .checkbox_true_part {
      background-position: -14px -28px
    }

    .checkbox_true_part_focus {
      background-position: -14px -42px
    }

    .checkbox_true_disable {
      background-position: -14px -56px
    }

    .radio_false_full {
      background-position: -28px 0
    }

    .radio_false_full_focus {
      background-position: -28px -14px
    }

    .radio_false_part {
      background-position: -28px -28px
    }

    .radio_false_part_focus {
      background-position: -28px -42px
    }

    .radio_false_disable {
      background-position: -28px -56px
    }

    .radio_true_full {
      background-position: -42px 0
    }

    .radio_true_full_focus {
      background-position: -42px -14px
    }

    .radio_true_part {
      background-position: -42px -28px
    }

    .radio_true_part_focus {
      background-position: -42px -42px
    }

    .radio_true_disable {
      background-position: -42px -56px
    }
  }
  .switch {
    width: 18px;
    height: 18px
  }

  .root_open {
    background-position: -92px -54px
  }

  .root_close {
    background-position: -74px -54px
  }

  .roots_open {
    background-position: -92px 0
  }

  .roots_close {
    background-position: -74px 0
  }

  .center_open {
    background-position: -92px -18px
  }

  .center_close {
    background-position: -74px -18px
  }

  .bottom_open {
    background-position: -92px -36px
  }

  .bottom_close {
    background-position: -74px -36px
  }

  .noline_open {
    background-position: -92px -72px
  }

  .noline_close {
    background-position: -74px -72px
  }

  .root_docu {
    background: none;
  }

  .roots_docu {
    background-position: -56px 0
  }

  .center_docu {
    background-position: -56px -18px
  }

  .bottom_docu {
    background-position: -56px -36px
  }

  .noline_docu {
    background: none;
  }

  .ico_open {
    margin-right: 2px;
    background-position: -110px -16px;
    vertical-align: top;
    *vertical-align: middle
  }

  .ico_close {
    margin-right: 2px;
    background-position: -110px 0;
    vertical-align: top;
    *vertical-align: middle
  }

  .ico_docu {
    margin-right: 2px;
    background-position: -110px -32px;
    vertical-align: top;
    *vertical-align: middle
  }

  .edit {
    margin-right: 2px;
    background-position: -110px -48px;
    vertical-align: top;
    *vertical-align: middle
  }

  .remove {
    margin-right: 2px;
    background-position: -110px -64px;
    vertical-align: top;
    *vertical-align: middle
  }
}

ul.tmpTargetzTree {
  background-color: #FFE6B0;
  opacity: 0.8;
  filter: alpha(opacity=80)
}

span.tmpzTreeMove_arrow {
  width: 16px;
  height: 16px;
  display: inline-block;
  padding: 0;
  margin: 2px 0 0 1px;
  border: 0 none;
  position: absolute;
  background-color: white;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: -110px -80px;
}

ul.ztree.zTreeDragUL {
  margin: 0;
  padding: 0;
  position: absolute;
  width: auto;
  height: auto;
  overflow: hidden;
  background-color: #cfcfcf;
  border: 1px #00B83F dotted;
  opacity: 0.8;
  filter: alpha(opacity=80)
}

.zTreeMask {
  z-index: 10000;
  background-color: #cfcfcf;
  opacity: 0.0;
  filter: alpha(opacity=0);
  position: absolute
}
</style>
