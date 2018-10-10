Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    titleArray :['全部','待付款','待收货','待评价','退款退货'],
    orderList : [
      {
        _id : '12323dasdsa12',
        shopName:'旗舰店',
    
        state : 0,    //0--待付款   1-待收货    2-待评价   3-退款退货
        goods_list: [{
          _id:'',
          goods_name: "妈妈长袖", 
          goods_desc: "2018新款妈妈长袖洋气上衣服中老年女春秋装中年气质短款外套高贵", 
          goods_price: 330, 
          goods_id: "10023", 
          goods_image: "cloud:///goods/O1CN0122xEagZJDTIAVrM_!!1973837186-0-item_pic.jpg_460x460Q90.jpg",
      
          buy_number: 3
        }, {
            _id: '',
            goods_name: "妈妈长袖",
            goods_desc: "2018新款妈妈长袖洋气上衣服中老年女春秋装中年气质短款外套高贵",
            goods_price: 330,
            goods_id: "10023",
            goods_image: "cloud:///goods/O1CN0122xEagZJDTIAVrM_!!1973837186-0-item_pic.jpg_460x460Q90.jpg",
            buy_number: 3
          }],
        all_price:1000,
        goods_number : 10,
      },
      {
        _id: '12323dasdsa12',
        shopName: '旗舰店',
        
        state: 1,    //0--待付款   1-待收货    2-待评价   3-退款退货
        goods_list: [{
          goods_name: "妈妈长袖",
          goods_desc: "2018新款妈妈长袖洋气上衣服中老年女春秋装中年气质短款外套高贵",
          goods_price: 330,
          goods_id: "100049",
          goods_image: "cloud:///goods/O1CN0122xEagZJDTIAVrM_!!1973837186-0-item_pic.jpg_460x460Q90.jpg",
          shop_id: "100001",
          buy_number: 3
        }, {
          goods_name: "妈妈长袖",
          goods_desc: "2018新款妈妈长袖洋气上衣服中老年女春秋装中年气质短款外套高贵",
          goods_price: 330,
          goods_id: "100049",
          goods_image: "cloud:///goods/O1CN0122xEagZJDTIAVrM_!!1973837186-0-item_pic.jpg_460x460Q90.jpg",
          shop_id: "100001",
          buy_number: 3
        }],
        all_price: 1000,
        goods_number: 10,
      },
      
    ]
  },
  refreshData: function(){
    wx.cloud.callFunction({
      name: 'getOrderList',
      data: {
        order_state : this.data.index - 1
      },
      success : function(res){
        console.log(res);
      }
    });
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