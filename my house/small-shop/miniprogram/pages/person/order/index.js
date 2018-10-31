Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    titleArray :['全部','待付款','待收货','待评价','退款退货'],
    orderList : [
    ]
  },
  refreshData: function(){
    let weak_self = this;
    wx.showLoading({
      title: '加载中...',
      mask : true
    });
    wx.cloud.callFunction({
      name: 'getOrderList',
      data: {
        order_state : weak_self.data.index - 1
      },
      success : function(res){
        console.log(res);
        let all_result = res.result.data;
        if(!all_result || all_result.length == 0){
          wx.hideLoading();
          weak_self.setData(weak_self.data);
          return;
        }
        
        for (var i = 0; i < all_result.length;i++){
          var goods_list = all_result[i].goods_list;
          var count = 0;
          for(var j = 0;j< goods_list.length;j++){
            var goods = goods_list[j];
                count += goods.buy_number;
                wx.cloud.callFunction({
                  name: 'getGoodsDetail',
                  data: {
                    goods_id: goods.goods_id,
                    detailType: 'goods_detail'
                  },
                  success: result => {
                    wx.hideLoading();
                    
                    weak_self.insertIntoGoods(result.result);

                  },
                  fail: function (res) {
                    console.log('fail');
                  }
                });
          }
          all_result[i].goods_number = count;
            console.log(all_result);
        }
        weak_self.setData({
          orderList: all_result
        });
      }
    });
  },
  insertIntoGoods:function(goodsDetail){
    
    let all_result = this.data.orderList;
    for (var i = 0; i < all_result.length; i++) {
      var goods_list = all_result[i].goods_list;
    
      for (var j = 0; j < goods_list.length; j++) {
        var goods = goods_list[j];
        if(goods.goods_id == goodsDetail.goods_id){
          console.log('相等');
          let buy_number = goods.buy_number;
          goods = goodsDetail;
          goods.buy_number = buy_number;
          goods_list[j] = goods;
          console.log(goods_list);
          this.setData({
            orderList: all_result
          });
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.setNavigationBarTitle({
     title: '我的订单',
   })
   this.setData({
     index : options.index ? options.index : 0,
   });
   this.refreshData();
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
  // 商品详情
  goGoodsDescAction : function(e){
    let goodsId = e.currentTarget.dataset.goodsId;
  
    wx.navigateTo({
      url: '../../desc/index?goodId=' + goodsId,
    })
  },
  changePage : function(e){
    
    let index = e.currentTarget.dataset.currentIndex;
    console.log(index);
    this.data.index = index;
    this.data.orderList = [];
    this.refreshData();
    this.setData({
      index : index
    });
  },
  cancelOrderAction : function(e){
    console.log(e);
    let orderId = e.currentTarget.dataset.orderIndex;
    wx.showModal({
      content: '确定取消订单？',
      complete:res=>{
        console.log(res);
        if(res.confirm){
          console.log('取消订单'+orderId);
        }
      }
    })
  }, 
  returnOrderAction: function (e) {
    console.log(e);
    let orderId = e.currentTarget.dataset.orderIndex;
    wx.showModal({
      content: '确定退款退货订单？',
      complete: res => {
        console.log(res);
        if (res.confirm) {
          console.log('取消订单' + orderId);
        }
      }
    })
  },  
  // 去支付、评价、收货、退款
  bottom_action : function(e){
    let orderId = e.currentTarget.dataset.orderIndex;
    let orderState = e.currentTarget.dataset.orderState;
    console.log(e);
    switch(orderState){
      case 0: //去支付
        wx.showModal({
          title: '提示',
          content: order,
          success: function (res) {
            if (res.confirm) {
              wx.showToast({
                title: '暂未开放',
                icon: 'none'
              })
            }
          }
        })
        break;
      case 1: //确认收货
      {
        wx.showModal({
          title : '确认收货？',
          content: '请确认已收到货物，避免造成经济损失',
          complete: res => {
            console.log(res);
            if (res.confirm) {
              console.log('确认订单' + orderId);
            }
          }
        })
        break;
        }
      case 2:   //去评价

        break;
        default:break;
    }
  }
})