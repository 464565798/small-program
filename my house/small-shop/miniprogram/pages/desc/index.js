Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:0,
    goods_desc: {
      image: ['../../resouce/goods_desc/goods.jpg','../../resouce/goods/chabei.jpg'], price: 100, title: 'Samsung/三星 GALAXY S8 Plus港版盖乐世s8+全网通4G曲屏智能手机', postalTip:0.00, saleNum:98 ,saleAddress:'自营'},
    server_desc: [{ image: '', name: '正品保证', detail: '' }, { image: '', name: '极速退款', detail: '' }, { image: '', name: '赠送运险', detail: '' }],
    discount : {title:'店铺优惠券',item:[]},
    rank_desc : {selected:false,title:'规格'},
  
    rank_list: {
        name: '颜色分类', current_list: [
          { name: '紫色', current_list: [{ name: '4G', code: 11004 }, { name: '8G', code: 11005 }, { name: '16G', code: 11096 }] }, 
          { name: '黑色', current_list: [{ name: '4G', code: 10004 }, { name: '8G', code: 10005 }, { name: '16G', code: 10096 }, { name: '256G', code: 11099 }] }],
      },
    common : {
      common_num:2,
      image:'../../resouce/common/common.png',
      detail:'很好'
    },
    desc_image:[
      '../../resouce/goods_desc/goods1.jpg', '../../resouce/goods_desc/goods2.jpg', '../../resouce/goods_desc/goods3.jpg', '../../resouce/goods_desc/goods4.jpg', '../../resouce/goods_desc/goods5.jpg', '../../resouce/goods_desc/goods6.jpg', '../../resouce/goods_desc/goods7.jpg','../../resouce/goods_desc/goods8.jpg'
    ],
    windowWidth:750,
    imagesScale: [{ width: 0, height: 0 }, { width: 0, height: 0 }, { width: 0, height: 0}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情'
    });
    console.log('页面参数' + options.goodId);
    if (options.goodId) {
      this.setData({
        goodsId: options.goodId
      });
    }
    let weak_self = this;
    wx.getSystemInfo({
      success: function(res) {
        let ww = res.windowWidth;
        weak_self.setData({
          windowWidth : ww
        });

      },
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
  loadImage:function(e){
    let index = e.currentTarget.id;
    let oriWidth = e.detail.width;
    let oriHeight = e.detail.height;
    let scale = oriWidth / oriHeight;
    let currentScale = this.data.windowWidth/300;
   
    var scaleTraget = { width: 0, height :0};
    if(scale < currentScale){
      scaleTraget.height = 300;
      scaleTraget.width = 300 * scale;
    }else{
      scaleTraget.height = this.data.windowWidth /scale;
      scaleTraget.width = this.data.windowWidth;
    }
    this.data.imagesScale[index] = scaleTraget;
    console.log(this.data.imagesScale);
    this.setData({
      imagesScale : this.data.imagesScale
    });

  },
  //服务描述
  server_module : function(){

  },
  //规格选择
  server_rank : function(){

  },
  bottomAction : function(e){
    let targetType = e.currentTarget.dataset.type;
    console.log(targetType);
    switch(targetType){
      case 'collection':

      break;
      case 'share':
        
      break;
      case 'add_car':
      break;
      case 'now_buy':
      break;
    }

  }

})