Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:0,
    goods_desc: {
      goods_images: [], 
      goods_detail: [
      ],
      goods_price: 0, 
      goods_desc: '', 
      goods_postalTip:0.00, 
      goods_sale_num:0 ,
      saleAddress:'自营',
      goods_server_desc :[],
      server_desc: [],
      goods_rank_list:[{
        name:'',rank_desc:[]
      }],
      },
    
    discount : {title:'店铺优惠券',item:[]},
 
    common : {
      common_num:0,
      images:[],
      detail:'很好'
    },
    desc_image:[

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
    });
    this.refreData();
  },
  refreData:function(){
    let weak_self = this;
    wx.cloud.callFunction({
      name: 'getGoodsDetail',
      data: {
        goods_id: this.data.goodsId,
        detailType: 'goods_detail'
      },
      success: res => {
        console.log(res);
        weak_self.setData({
          goods_desc : res.result
        });
      },
      fail : function(res){
        console.log(res);
      }
    });
    wx.cloud.callFunction({
      name: 'getGoodsDetail',
      data: {
        goods_id: this.data.goodsId,
        detailType: 'comment'
      },
      success: res => {
        console.log(res);
        var comment = res.result[0];
        console.log(typeof(comment));
        if(!comment)return;
        comment.common_num = res.result.length;
        console.log(comment);
        weak_self.setData({
          common: comment
        });
      },
      fail: function (res) {
        console.log(res);
      }
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