Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:null,
    goods_image : "",
    goods_name : "",
    buy_number : 1,
    goods_price : 0,
    rank_desc : "",
    all_price : 0,
    address : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情',
    });
 
    this.data.goods_id = options.goods_id;
    this.data.goods_image = options.goods_image;
    this.data.goods_name = options.goods_name;
    this.data.goods_price = options.goods_price;
    this.data.rank_desc = options.rank_desc;
    this.data.buy_number = parseInt(options.buy_number);
    this.data.all_price = options.goods_price * options.buy_number;
    this.setData(this.data);
    let weak_self = this;
    wx.cloud.callFunction({
      name: 'getAddressList',
      success: res => {
        let list = res.result.data;
        if(list.length == 0){
          return;
        }
        var address = list[0];
        for(let i = 0;i<list.length;i ++){
          if(list[i].isDefault){
            address = list[i];
            break;
          }
        }
        weak_self.setData({
          address: address
        });
      },

    });
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
  bind_address : function (){
    wx.navigateTo({
      url: '../../person/address/index?select_state=' + 1 + "&title=" + '选择收货地址',
    })
  },
  reduceNunberAction: function () {
    var current_number = this.data.buy_number;
    if (current_number == 1) {
      return;
    }
    this.setData({
      all_price : current_number * this.data.goods_price,
      buy_number: current_number - 1
    });
  },
  addNunberAction: function () {
    var current_number = this.data.buy_number;
    if (current_number == 99) {
      return;
    }
    this.setData({
      all_price: current_number * this.data.goods_price,
      buy_number: current_number + 1
    });
  }
  


})