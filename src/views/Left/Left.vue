<template>
  <div class="left">
    <h3>原件</h3>
    <div class="left-box">
      <div class="left-item">
        <DLine />
      </div>
      <div class="left-item">
        <Rectangle />
      </div>
    </div>
    <div class="left-box">
      <div class="left-item">
        <TextBox />
      </div>
      <div class="left-item">
        <Circular />
      </div>
    </div>
    <h3>控件</h3>
    <div class="left-box">
      <div class="left-item">
        <TableBox />
      </div>
      <div class="left-item">
        <Photo />
      </div>
    </div>
    <div class="left-box">
      <div class="left-item">
        <Qrcode />
      </div>
      <div class="left-item">
        <Barcode />
      </div>
    </div>
  </div>
</template>

<script>
import DLine from "../../components/element/DLine/DLine";
import Rectangle from "../../components/element/Rectangle/Rectangle";
import TextBox from "../../components/element/TextBox/TextBox";
import Circular from "../../components/element/Circular/Circular"
import TableBox from "../../components/element/TableBox/TableBox";
import Photo from "../../components/element/Photo/Photo";
import Qrcode from "../../components/element/Qrcode/Qrcode";
import Barcode from "../../components/element/Barcode/Barcode";

export default {
  name: "Left",
  data () {
    return {}
  },
  methods: {},
  components: { Barcode, Qrcode, Photo, TableBox, DLine, Rectangle, TextBox, Circular },
  props: {}

}
</script>

<style scoped>
.left {
  width: 250px;
  flex: 0 0 250px;
  background-color: #ffffff;
}
.left-box {
  display: flex;
  width: 100%;
  height: 100px;
}
.left-item {
  flex: 1;
  border: 1px solid #ddd;
  text-align: center;
}
.left h3 {
  height: 32px;
  line-height: 32px;
  background-color: #ffffff;
  padding-left: 20px;
  font-size: 14px;
  color: #666666;
}
</style>