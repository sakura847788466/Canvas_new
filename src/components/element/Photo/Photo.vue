<template>
  <div id="Photo">
    <span class="iconfont iconpicture" draggable="true" @dragstart="dragstart" @dragend="dragend"></span>
    <span>图片</span>
  </div>
</template>

<script>
  export default {
    name: "Photo",
    data() {
      return {}
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'DPhoto');
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
  #Photo {
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