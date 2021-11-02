// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a: '2020LPL季后赛'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const content = [{
        id: 1,
        title: "2020LPL夏季赛",
        content: "2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛",
        imgSrc: "/images/swiper1.webp",
        reading: 120,
        collection: 98,
        dateTime: '2小时',
        headImgSrc: "/images/avatar.jpg",
        author: '猫',
        flag: true,
      },
      {
        id: 2,
        title: "2020LPL夏季赛1111",
        content: "2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛2020LPL夏季赛",
        imgSrc: "/images/swiper2.webp",
        reading: 120,
        collection: 98,
        dateTime: '2小时',
        headImgSrc: "/images/avatar.jpg",
        author: '猫',
        flag: true,
      }
    ]
    this.setData({
      posts: content
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})