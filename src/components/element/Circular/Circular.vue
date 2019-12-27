<template>
  <div id="Circular">
    <span class="iconfont iconbig-circle" draggable="true" @dragstart="dragstart" @dragend="dragend"></span>
    <span>圆</span>
  </div>
</template>

<script>
  export default {
    name: "Circular",
    data() {
      return {
        move_x: 0,
        move_y: 0,
      }
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'DCircular');
        event.dataTransfer.setDragImage(event.target, 0, 0);
      },
      dragend() {
        // this.createcircular()
      },
      createcircular() {
        const id = Date.now() + 'Circular'
        const circular = document.querySelector('#circular')
        const len = circular.childNodes.length
        if (len === 0) {
          const div = document.createElement('div')
          div.style.position = 'absolute'
          div.style.width = 35 + 'px'
          div.style.height = 35 + 'px'
          div.style.border = '2px solid black'
          div.style.borderRadius = '50%'
          div.style.cursor = 'move'
          div.draggable = true
          div.id = id
          div.addEventListener('dragstart', this.dragstart)
          div.addEventListener('dragend', this.dragend)
          circular.appendChild(div)
        }
      }
    }
  }
</script>

<style scoped>
  #Circular {
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