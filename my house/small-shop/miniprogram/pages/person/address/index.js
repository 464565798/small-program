Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[
     
    ],
    select_state : false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.select_state){
      this.data.select_state = options.select_state
    }
    wx.setNavigationBarTitle({
      title: options.title ? options.title : '管理收货地址'
    });
    // wx.cloud.callFunction();
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
    this.refreshData();
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
    this.refreshData();
  },
  refreshData: function(){
    let weak_self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getAddressList',
      success:res=>{
        wx.hideLoading();
        wx.stopPullDownRefresh();
        let list = res.result.data;
        weak_self.setData({
          addressList : list
        });
      },
      fail:res=>{
        wx.hideLoading();
      }
    });
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
      name : 'getGoods',
      data : {
        goods_type:'server_goods',
        shop_id : '100001'
      },
      success : function(e){
        console.log(e);
      },
      fail : function(e){
        console.log(e);
      }
    });
  },
  settingDefault : function(e){
    let positionIndex = e.currentTarget.dataset.positionIndex;
    let weak_self = this;
//设置默认
    console.log(positionIndex);
    wx.cloud.callFunction({
      name: 'settingDefaltAddress',
      data : {
        addressId : weak_self.data.addressList[positionIndex]._id
      },
      success :res => {
        console.log(res);
        if(res.result == 'success'){
          weak_self.refreshData();
        }
      },
    });
    
  },
  editAddress : function(e){
    let positionIndex = e.currentTarget.dataset.positionIndex;
//编辑地址
    wx.navigateTo({
      url: 'addAddress?addressId=' + this.data.addressList[positionIndex]._id,
    })
  
  },
  deleteAddress : function(e){
    
    let positionIndex = e.currentTarget.dataset.positionIndex;
    let weak_self = this;
    wx.showModal({
      title: '',
      content: '确认删除？',
      showCancel: true,
      confirmText: '删除',
      confirmColor: '#DA4444',
      success: function (res) { 
        console.log(res);
        if(res.confirm){
          // var list = weak_self.data.addressList;
          // list.splice(positionIndex,1);
          // weak_self.setData({
          //   addressList : list
          // });
          wx.cloud.callFunction({
            name: 'deleteAddress',
            data: {
              addressId: weak_self.data.addressList[positionIndex]._id
            },
            success : function(){
              weak_self.refreshData();
            }
          });
          
        }
      }
    })
  },
  addAddress : function(){
    wx.navigateTo({
      url: 'addAddress',
    })
  },
  bind_address : function(e){
    let index = parseInt(e.currentTarget.dataset.index);
    if(this.data.select_state){
      let pages = getCurrentPages();
      let prePage = pages[pages.length - 2];
      prePage.setData({
        address : this.data.addressList[index]
      });
      wx.navigateBack({
       delta : 1
      })
    }
  }
})