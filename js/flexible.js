(function flexible(window, document) {
  // 获取html的根元素
  var docEl = document.documentElement
  // dpr 物理像素比
  var dpr = window.devicePixelRatio || 1

  // adjust body font size 设置我们body的字体大小
  function setBodyFontSize() {
    // 如果有body这个元素 就设置body的字体大小
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      // 如果页面没有body这个元素，则等我们页面主要的DOM元素加载
      // 完毕后再次调用这个函数来设置body的字体大小
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 15    设置我们html元素的文字大小
  function setRemUnit() {
    //获取屏幕的宽度,并把它划分为 15 等分
    var rem = docEl.clientWidth / 15
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize 当我们页面尺寸大小发生变化的时候,要重新设置rem大小
  window.addEventListener('resize', setRemUnit)
  // pageshow 是我们重新加载页面触发的事件
  window.addEventListener('pageshow', function (e) {
    //e.persisted 返回的是true,就是说如果这个页面是从缓存取过来的,也要重新计算rem大小
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports 有些移动端的浏览器不支持0.5像素的写法
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
