// pages/posts/posts.js
import {
  posts
} from '../../data/data'
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
    // wx.setStorageSync('flag', true);
    // wx.removeStorageSync('flag')
    this.setData({
      posts
    })
  },
  gotoDetail(event) {
    const id = event.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?pid=${id}`,
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