window.addJs = function (url, sync) {
  if (window.addJs.sync) {
    window.addJs.syncList = window.addJs.syncList || []
    window.addJs.syncList.push({ url: url, sync: sync})
    return
  }
  window.addJs.sync = sync
  var s = document.createElement('script')
  s.src = url
  s.addEventListener('load', function () {
    window.addJs.sync = false
    while (window.addJs.syncList && window.addJs.syncList.length) {
      var option = window.addJs.syncList.shift()
      window.addJs(option.url, option.sync)
      if (option.sync) {
        break
      }
    }
  })
  document.head.appendChild(s)
}
window.addComponent = function (option) {
  var componentName = option.name
  var Extends = option.extends || HTMLElement
  var props = option.props || []
  var cssSrc = option.cssSrc
  var event = option.event || {}
  customElements.define(componentName, window.$wc_utiles.createClass({
    extends: Extends,
    constructor: function () {
      var root = this
      var html = option.html || ''
      var shadow = this.attachShadow({ mode: 'open' })
      var attrString = window.$wc_utiles.attributesString(this, props)
      var link = cssSrc ? ('<link rel="stylesheet" href="' + cssSrc + '">') : ''
      if (typeof html === 'function') {
        html = html.call(this, { attrString: attrString}) || ''
      }
      html = link + html
      shadow.innerHTML = html
      var output = event.output || []
      output.forEach(function (item) {
        Array.prototype.forEach.call(shadow.querySelectorAll(item.selector), function (el) {
          item.type.split(' ').forEach(function (eventType) {
            el.addEventListener(eventType, function (e) {
              item.handler.call(this, e, root)
            })
          })
        })
      })
      var input = event.input || {}
      Object.keys(input).forEach(function (eventName) {
        root[eventName] = input[eventName].bind(shadow)
      })
    },
    prototype: {
      trigger: function (eventName) {
        window.$wc_utiles.trigger({
          event: eventName,
          target: this
        })
      }
    }
  }))
}
window.$wc_utiles = {
  createClass: function (option) {
    function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
    function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
    function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
    function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }
    function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
    function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
    return (function (superClass) {
      _inherits(subClass, superClass);
      Object.assign(subClass.prototype, option.prototype)
      var _super = _createSuper(subClass);
      function subClass() {
        var _this;
        _classCallCheck(this, subClass);
        _this = _super.call(this);
        option.constructor.call(_this)
        return _this;
      }
      return subClass;
    })(_wrapNativeSuper(option.extends || {}))
  },
  attributesString: function (el, props) {
    var str = ''
    props = props || []
    Array.prototype.forEach.call(el.attributes, function (attr) {
      if (props.indexOf(attr.name) > -1) {
        str += attr.name + '="' + attr.nodeValue + '" '
      }
    })
    return str
  },
  trigger: function (option) {
    var target = option.target
    var eventName = option.event
    var event
    if (window.Event) {
      event = new Event(eventName)
    } else {
      event = document.createEvent('Event')
      event.initEvent(eventName, true, true)
    }
    
    target.dispatchEvent(event)
  }
}