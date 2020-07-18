# webcomponent-ui
基于 shadow dom 的原生 web component ui 组件

不管你用vue、react还是angular，或者什么框架都不用，都可以使用webcomponent-ui

# 使用方法
简单的用法
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webcomponent-ui</title>
  <script src="./utils/index.js"></script>
  <script src="./base-components/button/index.js"></script>
  <script src="./base-components/input/index.js"></script>
</head>
<body>
  <base-button></base-button>
  <base-input></base-input>
</body>
</html>
```
考虑IE兼容性的写法
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webcomponent-ui</title>
  <script src="./utils/index.js"></script>
  <script>
    if (!window.customElements)
    addJs("https://cdn.bootcdn.net/ajax/libs/webcomponentsjs/2.4.3/webcomponents-bundle.js", true)
    addJs("./base-components/button/index.js")
    addJs("./base-components/input/index.js")
  </script>
</head>
<body>
  <base-button></base-button>
  <base-input></base-input>
</body>
</html>
```