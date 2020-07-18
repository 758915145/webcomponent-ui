addComponent({
  name: 'base-input',
  props: ['placeholder', 'disabled', 'style', 'value'],
  cssSrc: './base-components/button/index.css',
  html: function (option) {
    var attr = option.attrString
    return '<input ' + attr + '/>'
  },
  event: {
    output: [
      {
        selector: 'input',
        type: 'input change',
        handler: function (e, root) {
          root.value = e.target.value
          root.trigger(e.type)
          e.stopPropagation()
        }
      }
    ],
    input: {
      focus: function () {
        this.querySelector('input').focus()
      }
    }
  }
})