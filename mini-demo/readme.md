### 尺寸

按照iphone6 设计稿的图片大小 设置相应的rpx  就会响应设置大小, 也可以设置为大小的一半 px 但是不会响应式

### 第三方依赖

npm 安装后 还需要在 工具=> 构建npm才可以使用


### swiper

定长宽  需要swiper和 image都要设置

### 跳转

- navigateTo  前一个页面不会销毁
- redirectTo 前一个页面会进行销毁

### 事件

- bind:tap 不会阻止事件冒泡
- catch:tap 会阻止事件冒泡