Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId : '',
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressId = options.addressId;

    let weak_self = this;
    if (addressId){
      wx.cloud.callFunction({
        name: 'getAddressList',
        data : {
          addressId : addressId
        },
        success: res => {
          console.log(res);
          let list = res.result.data[0];
          
          if(!list){return;}
          weak_self.setData({
            addressId: addressId,
            address: list
          });
          console.log(list);
        },
        fail : res=>{
          console.log(res);
        }
      });
      
    }
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