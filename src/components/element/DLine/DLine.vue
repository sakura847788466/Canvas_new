<template>
  <div id="Line">
    <span class="iconfont  iconxian" draggable="true" @dragstart="dragstart" @dragend="dragend"></span>
    <span>直线</span>
  </div>
</template>

<script>
  export default {
    name: "DLine",
    data() {
      return {
        move_x: 0,
        move_y: 0,
      }
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'DLine');
        event.dataTransfer.setDragImage(event.target, 0, 0);
      },
      dragend() {
        // this.createLine()
      },
      createLine() {
        const id = Date.now() + 'DLine'
        const line = document.querySelector('#line')
        const len = line.childNodes.length
        if (len === 0) {
          const div = document.createElement('div')
          div.style.position = 'absolute'
          div.style.borderTopColor = '#000'
          div.style.borderTopStyle = 'solid'
          div.style.borderTopWidth = '2px'
          div.style.width = 100 + 'px'
          div.style.height = 0 + 'px'
          div.style.cursor = 'move'
          div.draggable = true
          div.id = id
          div.addEventListener('dragstart', this.dragstart)
          div.addEventListener('dragend', this.dragend)
          line.appendChild(div)
        }
      },
    },
    components: {},
    props: {}

  }
</script>

<style scoped>
  #Line {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: move;
  }

  .iconfont {
    font-size: 40px;
    display: block;
    margin: 10px auto;
  }
</style>