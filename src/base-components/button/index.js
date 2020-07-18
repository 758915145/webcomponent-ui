customElements.define('base-button', createClass({
  extends: HTMLElement,
  constructor: function () {
    var shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = '按钮'
  }
}))