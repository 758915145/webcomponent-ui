customElements.define('base-button', createClass({
  extends: HTMLElement,
  constructor: function () {
    var shadow = this.attachShadow({ mode: 'open' })
    var attr = window.$wc_utiles.attributesString(this).replace(/type=/g, 't=') // IE11中button的type不可以乱定义，所以把type变成t
    var html = '<link rel="stylesheet" href="./base-components/button/index.css">'
    html += '<button ' + attr
    html += '><slot></slot></button>'
    shadow.innerHTML = html
  }
}))