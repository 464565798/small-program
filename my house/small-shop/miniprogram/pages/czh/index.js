const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    category: [],
    cate_list : [],
    current_index : 0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品分类',
    });
    let weak_self  = this;
    wx.cloud.callFunction({
      name: 'categoryList',
      data :{
        shop_id : app.globalData.shop_id
      },
      success : res =>{ 
        console.log(res.result);
        if (res.result.length) {
          weak_self.setData({
            category: res.result
          });
        }
      }
    });
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  tapCategory : function(e){
    let cu_id = e.currentTarget.dataset.indexKey;
    console.log(cu_id);
    this.setData({
      current_index:cu_id,
    });
  },
  tapDescCategoods : function(e){
    let cateName = e.currentTarget.dataset.cateName;
    console.log(cateName);
    wx.navigateTo({
      url: '../cateDescGoods/index?cateName=' + cateName,
    })
  },
  goSearch : function(){
    wx.navigateTo({
      url: '../cateDescGoods/index',
    })
  }
})