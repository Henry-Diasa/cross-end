### 小程序运行机制

#### 启动机制

- 冷启动 （首次打开小程序，下载小程序包）
- 热启动 （从后台切换到前台）
- 有时冷启动也会从缓存中读取程序包，检查版本更新，下次冷启动会更新

#### 双线程架构

- View视图线程
- App Service 逻辑线程
- 视图层和逻辑层都是都过数据的改变或者触发事件来和WexinJSBridge 通信，然后WexinJSBridge 调用底层的native

### Icon组件

#### 实现icon图标的方案

- 直接使用图片

- 雪碧图结合background-position

  ```css
  .sprite_icon {  
    display: block;
    width: 80px;
    height: 80px;  
    /* 此处在wxss中，可以使用网络图片，不能使用本地图片 */
    background: url("https://cdn.nlark.com/yuque/0/2020/png/1252071/1589205723989-7de580b9-c9fd-4485-8b5b-3768f2f31bd0.png") -180px -310px;
  }
  ```

- CSS3绘制

  ```css
  .icon-close {
    display: inline-block;
    width: 17px;
    height: 2px;
    background: green;
    transform: rotate(45deg);
  }
  .icon-close::after {
    content: '';
    display: block;
    width: 17px;
    height: 2px;
    background: red;
    transform: rotate(-90deg);
  }
  ```

- iconfont

  ```css
  <icon class="iconfont icon-sun1"></icon>
  
  @font-face {
    font-family: 'iconfont'; 
    src: url('//at.alicdn.com/t/font_1716930_3m30jvz589y.eot');
    src: url('//at.alicdn.com/t/font_1716930_3m30jvz589y.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1716930_3m30jvz589y.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1716930_3m30jvz589y.woff') format('woff'),
    url('//at.alicdn.com/t/font_1716930_3m30jvz589y.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1716930_3m30jvz589y.svg#iconfont') format('svg');
  }
  @font-face {
    font-family: 'iconfont'; 
    src: url('//at.alicdn.com/t/font_1716930_3m30jvz589y.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon-sun1:after {
    content: "\e603";
    color: red;
    font-size: 20px;
  }
  ```

- Base64

#### 真机icon空白不显示

- 可能是字体格式不兼容
- 可以改成svg格式的图片

### Progress组件

#### 动态进度条

```html
<progress show-info bindtap="onTapProgressBar" stroke-width="2" percent="{{percentValue}}" backgroundColor="#f2f2f2" active-mode="forwards" active bindactiveend="onProgressActiveEnd"/>
```

```js
Page({
  data: {
    iconSize: [20, 30, 40, 50, 60, 100],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],
    iconName:'icon-sun',
    percentValue: 0
  },
  onProgressActiveEnd(e){
    console.log(e)
  },
onTapProgressBar(e){
  console.log(e)
  let progress = this.data.percentValue
  if (progress < 100){
    progress += 5
    this.setData({percentValue:Math.min(100, progress)})
  }
},
```

#### 设置圆角

```css
.wx-progress-inner-bar {
  border-radius: 5px;
}
```

```html
<progress border-radius="5" percent="20" show-info />
```

#### 加载完的进度条，重新加载

```html
<progress bindtap=" " stroke-width="2" percent="{{percentValue}}" active-mode="forwards" active show-info="{{false}}" bindactiveend="onProgressActiveEnd"/>
<button bindtap="onTapReloadBtn">重新加载</button>
```

```js
onTapReloadBtn(e){
  // 设置两次
  this.setData({percentValue:0})
  this.setData({percentValue:50})
},
```

#### 环形进度条

```html
<!--环形组件在当前目录下-->
<circle-progress id="progress1" percent="{{percentValue}}" />
<button bindtap="drawProgress">redraw</button>
```

```js
drawProgress(){
  if (this.data.percentValue >= 100){
    this.setData({
      percentValue:0
    })
  }
  this.setData({
    percentValue:this.data.percentValue+10
  })
}
```

### Rich-text组件

#### 预览、保存rich-test组件中的图片

```html
<rich-text space="emsp" nodes="{{nodes}}" bindtap="tap"></rich-text>
```

```js
Page({
  data: {
    // 示例 1 代码
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 20px;padding:20px;'
      },
      children: [
        {
          type: 'text',
          text: '小程序实践'
        }, {
          name: 'img',
          attrs: {
            src: 'http://t.cn/A622uHwp',
            style: 'width:100%'
          }
        }, {
          name: 'img',
          attrs: {
            src: 'http://t.cn/A622upBw',
            style: 'width:100%'
            // ,style:'width:100%;font-size:0;display:block;'//修改样式
            ,class: 'img'
          }
        }, {
          name: 'img',
          attrs: {
            src: 'http://t.cn/A622upBw',
            style: 'width:100%'
          }
        }
      ]
    }],
    urls: [],
    tagStyle: {
      img: 'font-size:0;display:block;',
    },
    html:"<div>小程序实践<span>message</span><img src='http://t.cn/A622upBw' /><img src='http://t.cn/A622upBw' /></div>"
  },
  tap(e) {
    let urls = this.data.urls
    wx.previewImage({
      current: urls[0],
      urls: urls
    })
  },
  onReady() {
    // 取出 urls
    function findUrl(nodes) {
      let urls = []
      nodes.forEach(item => {
        if (item.name == 'img' && item.attrs) {
          for (const key in item.attrs) {
            if (key == 'src') {
              urls.push(item.attrs[key])
            }
          }
        }
        if (item.children) {
          urls = urls.concat(findUrl(item.children))
        }
      })
      return urls
    }
    this.data.urls = findUrl(this.data.nodes)
  },
  onTapImage(e) {
    console.log('iamge url', e.detail.src)
  }
})

```

#### 图片之间的间距问题

```js
// nodes节点
nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 20px;padding:20px;'
      },
      children: [
        {
          type: 'text',
          text: '小程序实践'
        }, {
          name: 'img',
          attrs: {
            src: 'http://t.cn/A622uHwp',
            style: 'width:100%'
          }
        }, {
          name: 'img',
          attrs: {
            src: 'http://t.cn/A622upBw',
            style: 'width:100%'
            // ,style:'width:100%;font-size:0;display:block;'//修改样式  直接修改样式
            ,class: 'img'
          }
        }, {
          name: 'img',
          attrs: {
            src: 'http://t.cn/A622upBw',
            style: 'width:100%'
          }
        }
      ]
    }],
```

```css
// 通用的css
.img{
  font-size:0;
  display:block;
}
```

#### rich-text直接呈现HTML文本解析

```html
<!--https://hub.fastgit.org/jin-yufeng/mp-html-->
<parser bindimgtap="onTapImage" html="{{html}}" tag-style="{{tagStyle}}" />
```

```js
Page({
  data: {
    tagStyle: {
      img: 'font-size:0;display:block;',
    },
    html:"<div>小程序实践<span>message</span><img src='http://t.cn/A622upBw' /><img src='http://t.cn/A622upBw' /></div>"
  },
  onTapImage(e) {
    console.log('iamge url', e.detail.src)
  }
})

```

