import Vue from 'vue'

Vue.directive('throttle', {
  bind: (el, binding) => {
    let throttleTime = binding.value; // 防抖时间
    if (!throttleTime) { // 用户若不设置防抖时间，则默认2s
      throttleTime = 2000;
    }
    let cbFun;
    el.addEventListener('click', event => {
      if (!cbFun) { // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  },
});


Vue.directive('drag', {
  inserted: function (el, binding) {
    const type = binding.value;
    let x = 0
    let y = 0;
    let px = 0;
    let py = 0;
    let onDrag = false;
    el.onmousedown = function (e) {
      x = e.clientX;
      y = e.clientY;
      px = el.offsetLeft;
      py = el.offsetTop;
      onDrag = true;
    },
      window.onmousemove = function (e) {
        if (onDrag && type === 'x') {
          let nx = e.clientX + px - x;
          el.style.left = nx + 'px'
        } else if (onDrag && type === 'y') {
          let ny = e.clientY + py - y;
          el.style.top = ny + 'px'
        }
      },
      el.onmouseup = function () {
        if (onDrag) {
          onDrag = false;
        }
      }
  }
})