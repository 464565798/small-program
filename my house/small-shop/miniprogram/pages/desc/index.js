Page({

  /**
   * 页面的初始数据
   */
  data: {
    // goodsId:0,
    // goods_desc: {
    //   goods_image : '',
    //   goods_images: [], 
    //   goods_detail: [
    //   ],
    //   goods_price: 0, 
    //   goods_desc: '', 
    //   goods_postalTip:0.00, 
    //   goods_sale_num:0 ,
    //   saleAddress:'自营',
    //   goods_server_desc :[],
    //   server_desc: [],
    //   goods_rank_list:[{
    //     name:'',rank_desc:[]
    //   }],
    //   },
    
    // discount : {title:'店铺优惠券',item:[]},
 
    // common : {
    //   common_num:0,
    //   images:[],
    //   detail:'很好'
    // },
    // desc_image:[

    // ],
    buy_number : 1,
    rank_desc : "",
    hadSelectRank:{},
    windowWidth:375,
    imagesScale: [{ width: 0, height: 0 }, { width: 0, height: 0 }, { width: 0, height: 0}],
    rankAnimation : null,
    windowHeight:0,
    rankMode:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情'
    });

    this.animation = wx.createAnimation()
  
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
        console.log(ww);
        weak_self.setData({
          windowWidth : ww,
          windowHeight: res.windowHeight
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
        wx.stopPullDownRefresh();
        console.log(res);
        weak_self.setData({
          goods_desc : res.result
        });
      },
      fail : function(res){
        wx.stopPullDownRefresh();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.refreData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
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
    this.animation.translate(0, -this.data.windowHeight).step()
    this.setData({ 
      rankAnimation: this.animation.export(),
      rankMode : false
      })
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
        if(this.rankComplete()){

          wx.navigateTo({
            url: 'order_desc/index?goods_image=' + this.data.goods_desc.goods_image + "&goods_id=" + this.data.goods_desc.goods_id + "&goods_price=" + this.data.goods_desc.goods_price + "&goods_name=" + this.data.goods_desc.goods_desc + "&rank_desc=" + this.data.rank_desc + "&buy_number=" + this.data.buy_number
          })
        }else{
          this.server_rank();
        }
      break;
    }

  },
  touchMask:function(){
    this.animation.translate(0, this.data.windowHeight).step()
    this.setData({
      rankAnimation: this.animation.export(),
      rankMode: true
    })
  },
  touchView : function(){},
  //点击规格
  bindRank : function(e){
    let rankType = e.currentTarget.dataset.type;
    let descName = e.currentTarget.dataset.desc;
    console.log(rankType);
    console.log(descName);
    var selectRank = this.data.hadSelectRank;
    selectRank[rankType] = descName;
    console.log(selectRank);
    var hadSelected = "";
    for(let i=0;i<this.data.goods_desc.goods_rank_list.length;i++){
      let rank = this.data.goods_desc.goods_rank_list[i];
      if(selectRank[rank.name]){
        hadSelected = hadSelected + selectRank[rank.name]+" ";
      }
    }
    this.setData({
      hadSelectRank : selectRank,
      rank_desc : hadSelected
    });
  },
  rankComplete:function(){
    var selectRank = this.data.hadSelectRank;
    var hadComplete = true;
    for (let i = 0; i < this.data.goods_desc.goods_rank_list.length; i++) {
      let rank = this.data.goods_desc.goods_rank_list[i];
      if (!selectRank[rank.name]) {
        hadComplete = false;
        break;
      }
    }
    return hadComplete;
  },
  sureRankAction : function(){
    
    if(this.rankComplete()){
      this.touchMask();
    }else{
      wx.showToast({
        icon : "none",
        title: '请选择规格',
      })
    }
  },
  reduceNunberAction : function(){
    var current_number = this.data.buy_number;
    if (current_number == 1){
      return;
    }
    this.setData({
      buy_number: current_number - 1
    });
  },
  addNunberAction : function(){
    var current_number = this.data.buy_number;
    if (current_number == 99) {
      return;
    }
    this.setData({
      buy_number: current_number + 1
    });
  }


})