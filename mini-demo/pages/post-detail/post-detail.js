// pages/post-detail/post-detail.js
import {
  posts
} from '../../data/data'

const app = getApp();
console.log(app.test); // 全局变量 小程序不重启始终存在
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    pid: '',
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = posts.find(item => item.id == options.pid);
    this.data.pid = options.pid;
    if (wx.getStorageSync('posts_collected')[options.pid]) {
      this.setData({
        collected: true
      })
    }
    this.setData({
      postData
    })
  },
  onCollect(event) {
    const storage = wx.getStorageSync('posts_collected') || {};
    wx.setStorageSync('posts_collected', {
      ...storage,
      [this.data.pid]: true
    })
    this.setData({
      collected: true
    })
    // wx.showToast({
    //   title: '收藏',
    //   duration: '3000'
    // })

    wx.showModal({
      title: "是否收藏文章",
      success(res) {
        /*
          cancel: false
          confirm: true
          content: null
          errMsg: "showModal:ok"
        */
        console.log(res);
      }
    })
  },
  onShare() {
    wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信'],
      success(res) {
        console.log(res);
      }
    })
  },
  onMusic(event) {
    const mgr = wx.getBackgroundAudioManager()
    // http://music.163.com/song/media/outer/url?id=557581284.mp3  id换一下就可以了
    mgr.src = this.data.postData.music.url;
    mgr.title = this.data.postData.music.title;
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