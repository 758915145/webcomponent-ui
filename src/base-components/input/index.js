customElements.define('base-input', createClass({
  extends: HTMLElement,
  constructor: function () {
    var shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = '<input/>'
  }
}))