<template>
  <div id="Rectangle">
    <span class="iconfont iconjuxing" draggable="true" @dragstart="dragstart" @dragend="dragend"></span>
    <span>矩形</span>
  </div>
</template>

<script>
  export default {
    name: "Rectangle",
    data() {
      return {
        move_x: 0,
        move_y: 0,
      }
    },
    methods: {
      dragstart(event) {
        event = event || window.event
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'DRectangle');
        event.dataTransfer.setDragImage(event.target, 0, 0);
      },
      dragend(event) {
        event.preventDefault();
        // this.createRectangle()
      },
      createRectangle() {
        const id = Date.now() + 'Rectangle'
        const rectangle = document.querySelector('#rectangle')
        const len = rectangle.childNodes.length
        if (len === 0) {
          const div = document.createElement('div')
          div.style.position = 'absolute'
          div.style.width = 100 + 'px'
          div.style.height = 30 + 'px'
          div.style.cursor = 'move'
          div.style.border = '2px solid black'
          div.draggable = true
          div.id = id
          div.addEventListener('dragstart', this.dragstart)
          div.addEventListener('dragend', this.dragend)
          rectangle.appendChild(div)
        }
      },
      handleClick(event) {
        const style = event.target.style
        style.borderColor = 'blue'
        console.log();
      }

    },
    components: {},
    props: {}
  }
</script>

<style scoped>
  #Rectangle {
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