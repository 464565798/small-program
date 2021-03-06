Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList : null,
    allMoney : 0,
    allNumber : 0,
    shopNameList :{},
    goodDetailList :{},
    selectAll : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车',
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
  refreshData : function(){
    const db = wx.cloud.database();
    let weak_self = this;
    db.collection("goods_car_list").get({
      success: res => {
        wx.stopPullDownRefresh();
        weak_self.data.orderList = res.data;
        weak_self.setData(weak_self.data);
        weak_self.getShopName();
        weak_self.getGoodsDetail();
        console.log(weak_self.data);  
      },
      error: res => {
        wx.stopPullDownRefresh();
        wx.showModal({
          title: 'error',
          content: '加载失败',
        })
      }
    });
    
  },
  // 加载详情
  getGoodsDetail : function(){
    let weak_self = this;
    for (var i = 0; i < this.data.orderList.length; i++) {
      
      let goods_list = this.data.orderList[i].goods_list;
      for (var j = 0; j < goods_list.length; j++) {
        let goods_id = goods_list[j].goods_id;
        console.log(goods_id);
        if(this.data.goodDetailList[goods_id])continue;
        wx.cloud.callFunction({
          name: 'getGoodsDetail',
          data: {
            goods_id: goods_id,
            detailType: 'goods_simple'
          },
          success: res => {
            console.log(res);
            var goodDetailList = weak_self.data.goodDetailList;
            goodDetailList[goods_id] = res.result;
            console.log(goodDetailList);
            weak_self.setData({
              goodDetailList: goodDetailList
            });
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    }
  },
// 加载店名
  getShopName : function (){
    for (var i = 0; i < this.data.orderList.length; i++) {
      let shop_id = this.data.orderList[i].shop_id;
      console.log(shop_id);
      if(this.data.shopNameList[shop_id])continue;
      wx.cloud.callFunction({
        name: "getShopName",
        data: {
          shop_id: shop_id
        },
        success: result => {
          console.log(result.result);
          var shopNameList = this.data.shopNameList;
          shopNameList[shop_id] = result.result.shop_name;
          console.log(shopNameList);
          this.setData({
            shopNameList: shopNameList
          });
        },
        fail: result => {
          console.log(res);
        }
      });
    }
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
  select_good : function(res){
    let index = res.currentTarget.dataset.index;
    let goods_index = res.currentTarget.dataset.row;
    //改变内层选中状态
    let goods = this.data.orderList[index].goods_list[goods_index];
    goods.hadSelect = !goods.hadSelect;
    this.data.orderList[index].goods_list[goods_index] = goods;
    //改变外层选中状态
    var list = this.data.orderList[index];
    list.hadSelect = true;
    for (var i = 0; i < list.goods_list.length; i++) {
      let good = list.goods_list[i];
      if(!good.hadSelect){
        list.hadSelect = false;
        break;
      }
    }
    
    if(list.hadSelect){
      var select_all_shop = true;
      for (var i = 0; i < this.data.orderList.length; i++) {
        if(!this.data.orderList[i].hadSelect){
          select_all_shop = false;
          break;
        }
      }
      this.data.selectAll = select_all_shop;
    } else {
      this.data.selectAll = false;
    }
    this.data.orderList[index] = list;
    this.setShopAllPrice(); 
    this.setData(this.data);
  },
  select_shop : function(res){
    let index = res.currentTarget.dataset.index;
    console.log('点击了index=' + index);
    //改变外层选中状态
    var list = this.data.orderList[index];
    list.hadSelect = !list.hadSelect;
    //改变外层选中状态
    for(var i =0;i< list.goods_list.length; i++){
      let good = list.goods_list[i];
      good.hadSelect = list.hadSelect;
    }
    if (list.hadSelect) {
      var select_all_shop = true;
      for (var i = 0; i < this.data.orderList.length; i++) {
        if (!this.data.orderList[i].hadSelect) {
          select_all_shop = false;
          break;
        }
      }
      this.data.selectAll = select_all_shop;
    }else{
      this.data.selectAll = false;
    }
    this.setShopAllPrice();
    // this.allPrice();
    this.data.orderList[index] = list; 
    this.setData(this.data);
  },
  select_all : function(){
    this.data.selectAll = !this.data.selectAll;
    for (var i = 0; i < this.data.orderList.length; i++) {
      let list = this.data.orderList[i];
      list.hadSelect = this.data.selectAll;
      this.data.orderList[i] = list;
      for (var j = 0; j < list.goods_list.length; j++) {
        let good = list.goods_list[j];
        good.hadSelect = this.data.selectAll;
        list.goods_list[j] = good;
      }
    }
    this.setData(this.data);
    this.setShopAllPrice();
  },
  //总结价格
  setShopAllPrice : function(){
    var all_price = 0;
    var all_number = 0;
    for (var i = 0; i < this.data.orderList.length; i++) {
      var all_money = 0;
      let list = this.data.orderList[i];
      for (var j = 0; j < list.goods_list.length; j++) {
        let good = list.goods_list[j];
        if(good.hadSelect){
          all_number += good.buy_number;
          all_money += this.data.goodDetailList[good.goods_id].goods_price * good.buy_number;
        }
      }
      list.all_price = all_money;
      all_price += all_money;
      this.data.orderList[i] = list;
      
    }

    this.data.allMoney = all_price;
    this.data.allNumber = all_number;
    this.setData(this.data);
  },
  bind_shop_title : function (res){
    let shopId = res.currentTarget.dataset.shopId;
    console.log('点击了shop_id=' + shopId);
  },
  // 点击商品
  bind_tap_goods : function(res){
    let goodsId = res.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: '../../desc/index?goodId=' + goodsId,
    })
  }
})