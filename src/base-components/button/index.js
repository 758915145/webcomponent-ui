addComponent({
  name: 'base-button',
  props: ['type', 'disabled', 'style'],
  cssSrc: './base-components/button/index.css',
  html: function (option) {
    var attr = option.attrString.replace(/type=/g, 't=') // IE11中button的type不可以乱定义，所以把type变成t
    return '<button ' + attr + '><slot></slot></button>'
  }
})