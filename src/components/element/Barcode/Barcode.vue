<template>
  <div id="Barcode">
    <span class="iconfont icontiaoxingma" draggable="true" @dragstart="dragstart" @dragend="dragend"></span>
    <span>条形码</span>
  </div>
</template>

<script>
  export default {
    name: "Barcode",
    data() {
      return {}
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'DBarcode');
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
  #Barcode {
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