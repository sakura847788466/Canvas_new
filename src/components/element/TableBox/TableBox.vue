<template>
  <div id="TableBox">
    <span class="iconfont iconbiaoge" draggable="true" @dragstart="dragstart" @dragend="dragend"></span>
    <span>表格</span>
  </div>
</template>

<script>
  export default {
    name: "TableBox",
    data() {
      return {}
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'DTableBox');
        event.dataTransfer.setDragImage(event.target, 0, 0);
      },
      dragend() {

      }
    },
    components: {},
    props: {}

  }
</script>

<style scoped>
  #TableBox {
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