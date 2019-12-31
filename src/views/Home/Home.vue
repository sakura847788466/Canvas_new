<template>
  <div class="home">
    <Header :name="templateInfo.name"
            :size="size"
            @roofPlacement="roofPlacement"
            @bottomSetting="bottomSetting"
            @locking="locking"
            @plus="plus"
            @reduce="reduce"
            @adaption="adaption"
            @revoke="revoke"
            @recovery="recovery" />
    <main class="warp">
      <Left />
      <section class="scrollBox">
        <vuescroll ref="vs"
                   :ops="ops"
                   @handle-scroll="handleScroll">
          <div id="zoom"
               :style="{width: zoomW+'px',height: zoomH+'px'}">
            <div class="rulers"
                 :style="{width: zoomW+'px',height: zoomH+'px'}">
              <div class="origin"
                   :style="{top:origin.top+'px',left:origin.left+'px'}"></div>

              <nav @mousemove="navH($event,true)"
                   @mouseout="navH($event,false)"
                   @click="clickNavH"
                   class="nav-h"
                   :style="{top:origin.top+'px',backgroundPositionX:ruler.h%50+'px'}"
                   v-if="rulersSize">

                <span class="h-point"
                      v-for="(item,index) in rulersSize.hRulers "
                      :key="-index+'hpx'"
                      :style="{left:ruler.h-index*50+'px'}">{{index*-50}} </span>

                <span class="h-point"
                      v-for="(item,index) in rulersSize.loseHRulers "
                      :key="index+'h'"
                      :style="{left:ruler.h+index*50+'px'}"
                      :id="index===0?'pointh':null">{{index*50}}</span>
              </nav>

              <nav @mousemove="navV($event,true)"
                   @mouseout="navV($event,false)"
                   @click="clickNavV"
                   class="nav-v"
                   :style="{left:origin.left+'px',backgroundPositionY:ruler.v%50+'px'}"
                   v-if="rulersSize">

                <span class="v-point"
                      v-for="(item,index) in rulersSize.vRulers"
                      :key="index+'vpx'"
                      :style="{top:ruler.v-index*50-18+'px'}">{{index*-50}}</span>

                <span class="v-point"
                      v-for="(item,index) in rulersSize.loseVRulers"
                      :key="index+'v'"
                      :style="{top:ruler.v+index*50-18+'px'}"
                      :id="index===0?'pointv':null">{{index*50}}</span>
              </nav>

              <div class="h-move-line"
                   :style="isShowNavH"></div>
              <div class="v-move-line"
                   :style="isShowNavV"></div>

              <div class="h-line"
                   v-for="(item,index) in hLine"
                   :style="item.style"
                   :ref="item.id"
                   :key="item.id"
                   @mousedown="clickLine($event,index,'x')"
                   @mousemove="moveLine(index,'x')"
                   @mouseout="outLine(index,'x')"
                   :title="parseInt(item.style.left)-ruler.h-14+'px'">
                <i v-if="item.close"
                   class="el-icon-error h-line-close"
                   title="删除"
                   @mousemove="moveLine(index,'x')"
                   @click="deleteLine(index,'x')"
                   :style="{top:origin.top+36+'px'}"></i>
              </div>

              <div class="v-line"
                   v-for="(item,index) in vLine"
                   :style="item.style"
                   :ref="item.id"
                   :key="item.id"
                   @mousedown="clickLine($event,index,'y')"
                   @mousemove="moveLine(index,'y')"
                   @mouseout="outLine(index,'y')"
                   :title="parseInt(item.style.top)-ruler.v-14+'px'">
                <i v-if="item.close"
                   class="el-icon-error h-line-close"
                   title="删除"
                   @mousemove="moveLine(index,'y')"
                   @click="deleteLine(index,'y')"
                   :style="{left:origin.left+36+'px'}"></i>
              </div>
            </div>
            <div id="container">
              <div class="canvas-box"
                   :style="matrixStyle">
                <div ref="canvas"
                     :style="canvasStyle"
                     id="canvas"
                     @drop="drop"
                     @dragover="dragover"
                     @click.self="closeIsActive">
                  <vue-drag-resize :isActive="item.isActive"
                                   :ref="item.ref"
                                   :x="item.x"
                                   :y="item.y"
                                   :w="item.w"
                                   :h="item.h"
                                   :isDraggable="item.isDraggable"
                                   :isResizable="item.isResizable "
                                   @clicked="clicked($event,index)"
                                   @resizing="resizing($event,index)"
                                   @dragging="dragging($event,index)"
                                   :minh="minhMinw"
                                   :minw="minhMinw"
                                   :parentLimitation="true"
                                   v-for="(item,index) in canvasData"
                                   :key="index"
                                   :style="item.style">
                    <input v-if="item.text"
                           type="text"
                           v-model="item.message"
                           class="text-info" />
                    <table v-if="item.isTable"
                           class="table">
                      <tr v-for="table in item.table">
                        <td v-for="(val,i) in table.value"
                            :key="i">
                          <input type="text"
                                 v-model.trim="val.msg"
                                 @mousedown.stop="handleTdInput"
                                 style="width: 100%;height: 100%;border: none;text-align: center">
                        </td>
                      </tr>
                    </table>
                    <img v-if="item.isPhoto"
                         :src="item.img"
                         width="100%"
                         height="100%">
                  </vue-drag-resize>
                </div>
              </div>
            </div>
          </div>
        </vuescroll>
      </section>
      <ReightSet :message="message"
                 :templateInfo="templateInfo" />
      <el-dialog title="请输入生成表格的行和列"
                 :before-close="closeTable"
                 :visible.sync="isRenderTable"
                 top="25%"
                 width="400px">
        <div>
          行：
          <el-input-number size="mini"
                           v-model.trim="tableInfo.rows"
                           :min="1" />
          列：
          <el-input-number size="mini"
                           v-model.trim="tableInfo.lines"
                           :min="1" />
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="closeTable"
                     size="mini">取 消</el-button>
          <el-button type="primary"
                     @click="renderTable"
                     size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </main>

  </div>
</template>

<script>
import vuescroll from 'vuescroll';

import img from '../../assets/img'

import Left from "../Left/Left";
import ReightSet from "../ReightSet/ReightSet";
import Header from "../../components/Header/Header";

import { messageMinxins } from '../../mixins'

export default {
  name: "Home",
  mounted () {
    this.$nextTick(() => {
      this.getContainer()
      this.createDiploid
    })

    this.delElement()
    this.templateInfo = this.$route.params.templateInfo
  },
  data () {
    return {
      //尺子组件开始
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true
        },
        scrollPanel: {
          initialScrollY: '50%',
          initialScrollX: '50%',
          scrollingX: true,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right'
        },
        rail: {
          background: '#c1c1c1',
          opacity: 1,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: '#FF8080',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        }
      },
      origin: {
        top: '',
        left: ''
      },
      ruler: {
        h: '',
        v: ''
      },
      isShowNavV: {},//显示尺子横线
      isShowNavH: {},//显示尺子竖线
      vLine: [],
      hLine: [],
      //尺子组件结束
      canvasData: [],//canvas内的组件
      //表格生成
      isRenderTable: false,
      tableInfo: {
        rows: 2,
        lines: 3
      },
      id: '',
      templateInfo: {},
      message: {},

      size: 100,//放大倍数
      changeCanvas: [],//撤销数组
    }
  },
  methods: {
    //初始化container
    getContainer () {
      const c = document.getElementById('container')
      this.ruler.h = c.offsetLeft
      this.ruler.v = c.offsetTop
    },
    //拖拽松开事件
    drop (event) {

      //1.禁止默认事件
      event.preventDefault();
      //2.拿到不同的组件类型
      const type = event.dataTransfer.getData("Text");
      if (/^D/.test(type)) {
        //3.执行生成组件的方法
        this.renderElement(event, type)
      }


    },

    //拖拽经过事件
    dragover (event) {
      event.preventDefault();
    },
    //渲染组件
    renderElement (event, type) {
      //1.拿到canvas的偏移量
      // const {offsetLeft, offsetTop} = this.$refs.canvas
      const position = this.$refs.canvas.getBoundingClientRect()

      // console.log(this.size / 100)
      //2.生成初始化的组件数据样式
      // console.log(position);
      // console.log(this.createDiploid.width);
      // console.log(event.pageY);
      // console.log(event.pageY - position.y);
      let data = {
        isActive: true,
        // x: event.pageX - position.x - this.createDiploid.width ,
        // y: event.pageY - position.y - this.createDiploid.height ,
        x: event.pageX - position.x,
        y: event.pageY - position.y,
        text: false,
        isDraggable: true,
        isResizable: true,
        type
      }
      //2.1.根据type生成不同类型的数据
      const componentsType = this.renderTypeComponents(type, event)
      //2.2 合拼两组数据，data在前
      data = { ...data, ...componentsType }

      //3.把数据插入canvasData里
      this.$nextTick(() => {
        //3.1每次进来时只能有一个组件是激活状态
        this.canvasData.forEach(item => {
          item.isActive = false
        })
        //3.2把拖拽的组件数据传递给ReightSet组件
        this.message = data
        this.canvasData.push(data)
      })
    },

    //根据type生成组件样式
    renderTypeComponents (type, event) {
      //1.根据时间戳和type生成唯一的ID
      const id = Date.now() + type
      this.id = id
      //2.根据type生成不同的数据返回出去
      switch (type) {
        case 'DLine':
          return {
            w: 100,
            h: 2,
            style: {
              position: 'absolute',
              borderTopColor: '#000',
              borderTopWidth: '2px',
              borderTopStyle: 'solid',
              borderRadius: '0',
              cursor: 'move',
              transform: ''
            },
            rote: 0,
            ref: id,
            radius: 0,
          }
        case 'DRectangle':
          return {
            w: 100,
            h: 50,
            style: {
              position: 'absolute',
              borderColor: '#000',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: '0',
              cursor: 'move',
              transform: ''
            },
            rote: 0,
            ref: id,
            radius: 0
          }
        case 'DCircular':
          return {
            w: 50,
            h: 50,
            style: {
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: '#000',
              borderRadius: '50%',
              cursor: 'move'
            },
            ref: id,
            radius: 50
          }
        case 'DTextBox':
          return {
            w: 100,
            h: 30,
            style: {
              cursor: 'move',
              transform: '',
              borderRadius: '0',
              lineHeight: '30px',

            },
            text: true,
            message: '文字信息',
            ref: id,
            rote: 0,
            radius: 0,
            size: 12,
            ele: event,
            lh: 30,
            ls: 2

          }
        case 'DTableBox':
          this.isRenderTable = true
          return {
            w: 300,
            h: 100,
            style: {
              cursor: 'move',
              padding: '10px'
            },
            isTable: true,
            table: null,
            ref: id
          }
        case 'DPhoto':
          return {
            w: 200,
            h: 100,
            style: {
              position: 'absolute',
              cursor: 'move',
              transform: ''
            },
            img: img.photo,
            isPhoto: true,
            rote: 0,
            ref: id,
            radius: 0,
            ele: event

          }
        case 'DQrcode':
          return {
            w: 100,
            h: 100,
            style: {
              cursor: 'move',
              transform: 'rotate(0)',
              borderRadius: 0,
            },
            img: img.qrcode,
            isPhoto: true,
            ref: id,
            rote: 0,
            radius: 0,
          }
        case 'DBarcode':
          return {
            w: 100,
            h: 60,
            style: {
              cursor: 'move',
              transform: 'rotate(0)',
              borderRadius: 0,
            },
            img: img.barcode,
            isPhoto: true,
            ref: id,
            rote: 0,
            radius: 0,
          }
        default:
          return false
      }

    },

    //渲染表格
    renderTable () {
      //1.点击确认渲染表格，并隐藏dialog
      this.isRenderTable = false
      //1.1取出初始化的行和列，并初始化存储table的数组
      const { rows, lines } = this.tableInfo
      const table = []
      //2.根据取出来的行和列生成一个二维数组
      for (let i = 0; i < rows; i++) {
        table.push({ key: '', value: [] })
        console.log(table);
        for (let j = 0; j < lines; j++) {
          table[i].value.push({ name: '', msg: '' })
        }
      }
      //3.根据当前的ID找到this.canvasData里的一项数据，并把二维数组赋值给它
      for (let item of this.canvasData) {
        if (this.id === item.ref) {
          item.table = table
        }
      }
    },

    //关闭渲染表格方法
    closeTable () {
      //1.隐藏dialog
      this.isRenderTable = false
      //2.循环出当前ID和this.canvasData[i].ref相同的数据，然后删除
      for (let i = 0; i < this.canvasData.length; i++) {
        if (this.canvasData[i].ref === this.id) {
          this.canvasData.splice(i, 1)
        }
      }
    },

    handleTdInput () {
      console.log(1);
    },
    //删除元素
    delElement () {
      document.addEventListener('keydown', event => {
        if (event.keyCode === 46) {
          for (let i = 0; i < this.canvasData.length; i++) {
            if (this.canvasData[i].isActive) {
              this.canvasData.splice(i, 1)
            }
          }
        }
      })
    },

    //点击拖拽组件
    clicked ($event, index) {
      for (let item of this.canvasData) {
        item.isActive = false;
      }
      this.canvasData[index].isActive = true;
      this.message = this.canvasData[index]
      if (this.canvasData[index].text) {
        const ref = this.canvasData[index].ref
        this.$refs[ref][0].$el.childNodes[0].focus()
      }

    },

    //拖伸组件
    resizing (newRect, index) {
      this.canvasData[index].x = newRect.left
      this.canvasData[index].y = newRect.top
      this.canvasData[index].w = newRect.width
      this.canvasData[index].h = newRect.height
    },
    //拖拽组件，更改x和y
    dragging (newRect, index) {
      this.canvasData[index].x = newRect.left
      this.canvasData[index].y = newRect.top
    },

    //点击取消选中组件
    closeIsActive () {
      for (let item of this.canvasData) {
        item.isActive = false;
      }
    },
    //置顶
    roofPlacement () {
      for (let i = 0; i < this.canvasData.length; i++) {
        if (this.canvasData[i].isActive) {
          this.canvasData[i].style.zIndex = 0
          this.canvasData[i].style.zIndex++
          console.log(this.canvasData[i])
        }
      }
    },
    //置底
    bottomSetting () {
      for (let i = 0; i < this.canvasData.length; i++) {
        if (this.canvasData[i].isActive) {
          this.canvasData[i].style.zIndex = 0
          this.canvasData[i].style.zIndex--
          console.log(this.canvasData[i])
        }
      }
    },
    //锁定
    locking () {
      for (let i = 0; i < this.canvasData.length; i++) {
        if (this.canvasData[i].isActive) {
          this.canvasData[i].isDraggable = !this.canvasData[i].isDraggable
          this.canvasData[i].isResizable = !this.canvasData[i].isResizable

        }
      }
    },

    //滚动时的钩子函数
    handleScroll (vertical, horizontal, nativeEvent) {
      this.origin.left = horizontal.scrollLeft
      this.origin.top = vertical.scrollTop
    },

    //显示尺子的线条
    //显示竖线
    navH ($event, type) {
      const style = {
        left: $event.offsetX + 18 + 'px',
        backgroundColor: 'blue'
      }
      if (type) {
        style.display = 'block'
        this.isShowNavH = style
      } else {
        style.display = 'none'
        this.isShowNavH = style
      }
    },
    //显示横线
    navV ($event, type) {
      const style = {
        top: $event.offsetY + 18 + 'px',
        backgroundColor: 'blue'
      }
      if (type) {
        style.display = 'block'
        this.isShowNavV = style
      } else {
        style.display = 'none'
        this.isShowNavV = style
      }
    },

    //点击显示竖线
    clickNavH ($event) {
      const el = {
        id: 'hLine' + Date.now(),
        style: {
          display: 'block',
          left: $event.offsetX + 18 + 'px',
          cursor: 'e-resize',
          padding: '0 2px',
          backgroundColor: 'blue'
        },
        close: false
      }
      this.hLine.push(el)
    },
    //点击显示横线
    clickNavV ($event) {
      const el = {
        id: 'vLine' + Date.now(),
        style: {
          display: 'block',
          top: $event.offsetY + 18 + 'px',
          cursor: 'n-resize',
          padding: '2px 0',
          backgroundColor: 'blue'
        },
        close: false
      }
      this.vLine.push(el)
    },

    //拖拽竖线位置
    clickLine ($event, index, type) {
      let line = null
      if (type === 'x') {
        line = this.hLine[index].id
      } else {
        line = this.vLine[index].id
      }
      const element = this.$refs[line][0]
      let x = $event.clientX;
      let y = $event.clientY;
      let px = element.offsetLeft;
      let py = element.offsetTop;
      let onDrag = true;
      window.onmousemove = (e) => {
        if (onDrag && type === 'x') {
          let nx = e.clientX + px - x;
          this.hLine[index].style.left = nx + 'px'
        } else if (onDrag && type === 'y') {
          let ny = e.clientY + py - y;
          this.vLine[index].style.top = ny + 'px'
        }
      }
      element.onmouseup = () => {
        if (onDrag) {
          onDrag = false;
        }
      }

    },

    //经过Line显示关闭按钮
    moveLine (index, type) {
      if (type === 'x') {
        this.hLine[index].close = true
      } else {
        this.vLine[index].close = true
      }
    },
    //离开Line关闭按钮
    outLine (index, type) {
      if (type === 'x') {
        this.hLine[index].close = false
      } else {
        this.vLine[index].close = false
      }
    },
    //删除线
    deleteLine (index, type) {
      if (type === 'x') {
        this.hLine.splice(index, 1)
      } else {
        this.vLine.splice(index, 1)
      }
    },

    //+
    plus () {
      if (this.size < 300) {
        this.size += 10
        this.$refs.canvas.style.transform = 'scale(+' + this.size / 100 + ')'
        this.ruler.v -= this.templateInfo.h * 0.1
        this.ruler.h -= this.templateInfo.w * 0.1
      } else {
        this.myMessage('warning', '已经缩放到最大')
      }
    },
    //1
    reduce () {
      if (this.size < 20) {
        this.myMessage('warning', '已经缩放到最小')
      } else {
        this.size -= 10
        this.$refs.canvas.style.transform = 'scale(+' + this.size / 100 + ')'
        this.ruler.h += this.templateInfo.w * 0.1
        this.ruler.v += this.templateInfo.h * 0.1
      }
    },
    //-
    adaption () {
      this.size = 100
      this.$refs.canvas.style.transform = 'scale(+' + this.size / 100 + ')'
    },
    //撤销
    revoke () {
      if (this.canvasData.length < 1) {
        return this.$message({
          message: '没有可撤销的内容!',
          type: 'warning'
        });
      } else {
        this.changeCanvas.push(this.canvasData[this.canvasData.length - 1])
        this.canvasData.pop()
      }
    },
    //恢复
    recovery () {
      if (this.changeCanvas.length < 1) {
        return this.$message({
          message: '没有可恢复的内容！',
          type: 'warning'
        });
      } else {
        this.canvasData.push(this.changeCanvas[this.changeCanvas.length - 1])
        this.changeCanvas.pop()
      }
    },

  },
  computed: {
    minhMinw () {
      if (this.id.indexOf('TableBox') !== -1 || this.id.indexOf('DPhoto') !== -1) {
        return 40
      } else {
        return 2
      }
    },
    canvasStyle () {
      const width = this.templateInfo.w + 'px'
      const height = this.templateInfo.h + 'px'
      return { width, height }
    },
    zoomW () {
      return parseInt(this.templateInfo.w * 5)
    },
    zoomH () {
      return parseInt(this.templateInfo.h * 5)
    },
    matrixStyle () {
      let x = 18 - this.createDiploid.width
      let y = 16 - this.createDiploid.height
      return `transform:matrix(1, 0, 0, 1, ${x}, ${y})`

    },
    //生成尺子的刻度
    rulersSize () {
      const data = {}
      data.hRulers = Math.floor(this.ruler.h / 50)
      data.loseHRulers = Math.floor((this.zoomW - this.ruler.h) / 50)
      data.vRulers = Math.floor(this.ruler.v / 50)
      data.loseVRulers = Math.floor((this.zoomH - this.ruler.v) / 50)
      return data
    },
    //生成倍数
    createDiploid () {
      const data = {
        width: 0,
        height: 0
      }
      if (this.size !== 100) {
        const { w, h } = this.templateInfo
        let width = 0.1 * 100 * w / 100
        let height = 0.1 * 100 * h / 100
        const dip = (this.size - 100) / 10
        data.width = width * dip;
        data.height = height * dip;
      }
      return data
    }
  },
  components: {
    Header, ReightSet, Left, vuescroll
  },
  mixins: [messageMinxins]

}
</script>
<style scoped>
.warp {
  position: absolute;
  left: 0;
  right: 0;
  top: 55px;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 1200px;
  flex-wrap: nowrap;
}

.scrollBox {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  overflow: auto;
}

#zoom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.rulers {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  pointer-events: none;
}

.origin {
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: #0090ff;
  z-index: 999;
  pointer-events: all;
  cursor: pointer;
}

.nav-v {
  width: 18px;
  height: 100%;
  position: absolute;
  top: 16px;
  left: 0;
  padding-bottom: 10px;
  background: url("../../assets/ruler-v.png") repeat;
  background-clip: content-box;
  pointer-events: all;
  visibility: visible;
}

.nav-h {
  position: absolute;
  top: 0;
  left: 16px;
  padding-bottom: 10px;
  width: 100%;
  height: 28px;
  background: url("../../assets/ruler-h.png") repeat;
  background-clip: content-box;
  pointer-events: all;
  visibility: visible;
}

.h-point {
  position: absolute;
  top: 0;
  font-size: 12px;
  color: #333;
  pointer-events: none;
}

.v-point {
  position: absolute;
  left: 0;
  font-size: 12px;
  color: #333;
  transform-origin: 10px 6px;
  transform: rotateZ(-90deg);
  pointer-events: none;
}

.h-move-line,
.h-line {
  position: absolute;
  z-index: 100;
  top: -10px;
  left: 0;
  height: 100%;
  width: 1px;
  pointer-events: all;
  box-sizing: content-box;
  background-clip: content-box;
}

.v-move-line,
.v-line {
  position: absolute;
  z-index: 100;
  left: -10px;
  top: 0;
  height: 1px;
  width: 100%;
  pointer-events: all;
  box-sizing: content-box;
  background-clip: content-box;
}

.h-line-close {
  position: relative;
  display: inline-block;
  padding: 5px;
  font-size: 18px;
  color: red;
  cursor: pointer;
}

#container {
  position: relative;

  /*transform: matrix(1, 0, 0, 1, 200, 30);*/
}

.canvas-box {
  width: 100%;
}

#canvas {
  position: relative;

  width: 1000px;
  height: 500px;
  cursor: crosshair;
  background-color: white;
  z-index: 1;
  /*border: 5px solid rgba(237, 239, 241, 0.99);*/
  border-radius: 3px;
  transform-origin: left top;
}

.text-info {
  padding: 0 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  background-color: transparent;
}

.table {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
}

.table tr {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  border-bottom: 1px solid #000;
}

.table tr:nth-last-child(1) {
  border-bottom: none;
}

.table td {
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  border-right: 1px solid #000;
}

.table td:nth-last-child(1) {
  border-right: none;
}

/*标尺*/
#rulerTool {
  background-color: #f5f5f5;
}
</style>