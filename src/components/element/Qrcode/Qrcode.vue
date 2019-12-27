<template>
  <div id="Qrcode">
    <span class="iconfont iconico" draggable="true" @dragstart="dragstart" @dragend="dragend"></span>
    <span>二维码</span>
  </div>
</template>

<script>
  export default {
    name: "Qrcode",
    data() {
      return {}
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'DQrcode');
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
  #Qrcode {
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