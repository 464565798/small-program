Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList : null,
    allMoney : 0,
    allNumber : 0,
    shopNameList :{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车',
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
    const db = wx.cloud.database();
    let weak_self = this;
    db.collection("goods_car_list").get({
      success: res => {
        
        weak_self.setData({
          orderList : res.data
        });
        console.log(weak_self.data);
        for(var i = 0;i < res.data.length;i ++){
          let shop_id = res.data[i].shop_id;
          console.log(shop_id);
          wx.cloud.callFunction({
            name: "getShopName",
            data: {
              shop_id: shop_id
            },
            success: result => {
              console.log(result.result);
              var shopNameList = weak_self.data.shopNameList;
              shopNameList[shop_id] = result.result.shop_name;
              console.log(shopNameList);
              weak_self.setData({
                shopNameList : shopNameList
              });
            },
            fail: result => {
              console.log(res);
            }
          });
        }
        
      },
      error: res => {
        wx.showModal({
          title: 'error',
          content: '加载失败',
        })
      }
    });
    
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
  select_shop : function(res){
    let index = res.currentTarget.dataset.index;
    console.log('点击了index=' + index);
    var list = this.data.orderList[index];
    list.hadSelect = !list.hadSelect;
    this.data.orderList[index] = list; 
    this.setData(this.data);
  },
  bind_shop_title : function (res){
    let shopId = res.currentTarget.dataset.shopId;
    console.log('点击了shop_id=' + shopId);
  }
})