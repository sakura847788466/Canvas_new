<template>
  <div id="TextBox">
    <span class="iconfont iconwenbenkuang" draggable="true" @dragstart="dragstart" @dragend="dragend"></span>
    <span>文本框</span>
  </div>
</template>

<script>
  export default {
    name: "TextBox",
    data() {
      return {
        move_x: 0,
        move_y: 0,
      }
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'DTextBox');
        event.dataTransfer.setDragImage(event.target, 0, 0);
      },
      dragend() {
        // this.createTextBox()
      },
      createTextBox() {
        const id = Date.now() + 'TextBox'
        const TextBox = document.querySelector('#TextBox')
        const len = TextBox.childNodes.length
        if (len === 0) {
          const div = document.createElement('div')
          div.style.position = 'absolute'
          div.style.width = 100 + 'px'
          div.style.height = 30 + 'px'
          div.style.border = '2px solid black'
          div.style.fontSize = 'font-size: 22px'
          div.style.cursor = 'move'
          div.draggable = true
          div.contentEditable = true
          div.id = id
          div.addEventListener('dragstart', this.dragstart)
          div.addEventListener('dragend', this.dragend)
          TextBox.appendChild(div)
        }
      }
    }
  }
</script>

<style scoped>
  #TextBox {
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