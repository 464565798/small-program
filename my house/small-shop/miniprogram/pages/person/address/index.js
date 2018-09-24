Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '管理收货地址',
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
    
  },
  tap : function(){
    // console.log(123);
    
    // wx.chooseImage({
    //   success: function(res) {
    //     wx.cloud.uploadFile({
    //       cloudPath: 'goods/chabei.jpg',
    //       filePath: res.tempFilePaths[0],
    //       success: function (e) {
    //         console.log(e);
    //       },
    //       fail: function (e) {
    //         console.log(e);
    //       }
    //     });
    //   },
    // })
    // const db = wx.cloud.database();
    // db.collection('user_list').get({
    //   success : function(res){
    //     console.log(res.data[0]._id);
    //   }
    // });
    wx.cloud.callFunction({
      name : 'addGoods',
      data : {phone:13683748966},
      success : function(e){
        console.log(e);
      },
      fail : function(e){
        console.log(e);
      }
    });


  }
})