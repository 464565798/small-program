//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    page: 0,
    goods: [],
    server_goods_list:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cycleImageData: [],
    module_list: [{ module_name: '分类', module_id: 1, module_image: '../../resouce/module/cate.png' }, { module_name: '购物车', module_id: 2, module_image: '../../resouce/module/buy_car.png' }, { module_name: '新货', module_id: 3, module_image: '../../resouce/module/new_goods.png' }, { module_name: '购物券', module_id: 4, module_image: '../../resouce/module/noun.png' }, { module_name: '秒杀', module_id: 5, module_image: '../../resouce/module/clark.png' }, { module_name: '红包', module_id: 6, module_image: '../../resouce/module/redbao.png' }, { module_name: '优惠', module_id: 7, module_image: '../../resouce/module/jifen.png' }, { module_name: '签到', module_id: 8, module_image: '../../resouce/module/signa.png' }]
  },
  
  //轮播跳转
  tapImage: function (e) {
    var target = e.currentTarget.dataset.deepItemUrl;
    
    var path = app.getPathWithDeepLinkUrl(target);
    console.log(path);

    wx.navigateTo({
      url: path,
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh:function(){
    console.log('下拉更新了');
    this.data.page = 0;
    this.data.goods = [];
    this.refreshData();
  },
  onReachBottom:function(){
    // console.log('上拉加载了');
    // var arr = this.data.goods;
    // var newArr = arr.concat(this.data.goods);
    // this.setData({
    //   goods:newArr
    // });
    var weak_self = this;
    this.data.page ++;
    //推荐商品
    wx.cloud.callFunction({
      name: 'getGoods',
      data: {
        goods_type: 'recommend_goods',
        page: parseInt(this.data.page),
        shop_id: app.globalData.shop_id
      },
      success: function (e) {
        var new_goods = weak_self.data.goods;
        for (let i = 0; i < e.result.data.length; i++) {
          new_goods.push(e.result.data[i]);
        }
        console.log(new_goods);
        wx.stopPullDownRefresh();
        weak_self.setData({
          goods: new_goods
        });
      },
      fail: function (e) {
        console.log(e);
      }
    });
  },
  // onPageScroll:function(e){
  //   console.log(e);
  //   console.log(this.route);
  // },
  onShareAppMessage:function(e){
    console.log(e);
    return {
      "title":'车智汇上线了',
      "path":"/pages/czh/index",
      "iamgeUrl": "resouce/icon_chezhihui_H.png",'array':[1,2,3,5]
    };
  },
  onLoad: function () {
    let weak_self = this;

    wx.setNavigationBarTitle({
      title: '推荐商品',
    });
    this.refreshData();
  },
  refreshData : function(){
    var weak_self = this;
    wx.showLoading({
      title: '加载商品中...',
    })
    //轮播
    wx.cloud.callFunction({
      name: 'getGoods',
      data: {
        goods_type: 'ads',
        shop_id: app.globalData.shop_id
      },
      success : function(e){
        console.log(e.result.data[0].ads_image);
        weak_self.setData({
          cycleImageData : e.result.data[0].ads_image
        });
      }
    });
    //服务商品
    wx.cloud.callFunction({
      name: 'getGoods',
      data: {
        goods_type: 'server_goods',
        shop_id: app.globalData.shop_id
      },
      success: function (e) {
        console.log(e.result.data);
        weak_self.setData({
          server_goods_list: e.result.data
        });
      },
      fail: function (e) {
        console.log(e);
      }
    });
    
    //推荐商品
    wx.cloud.callFunction({
      name: 'getGoods',
      data: {
        goods_type: 'recommend_goods',
        page : parseInt(this.data.page),
        shop_id: app.globalData.shop_id
      },
      success: function (e) {
        wx.hideLoading();
        var new_goods = weak_self.data.goods;
        for(let i =0;i<e.result.data.length;i++){
          new_goods.push(e.result.data[i]);
        }
        console.log(new_goods);
        wx.stopPullDownRefresh();
        weak_self.setData({
          goods: new_goods
        });
      },
      fail: function (e) {
        wx.hideLoading();
        console.log(e);
      }
    });
    


  },
  
  // 点击图片
  selectDescAction : function(e){

    let currentId = e.currentTarget.id;
    wx.navigateTo({
      url: '../desc/index?goodId=' + e.currentTarget.id,
    })
  },
  //点击module
  tapModule : function(e){
    let module_id = e.currentTarget.dataset.moduleId;
    let targetUrl = {
      1:'',   //分类
      2:'',   //购物车
      3:'',   //新货
      4:'',   //购物券
      5:'',   //秒杀
      6:'',   //红包
      7:'',   //优惠
      8:'',   //签到
    };

  },
  //点击综合服务或热销品牌
  tapServerGoods : function(e){
    let goodsId = e.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: '../desc/index?goodId=' + goodsId,
    })
  }
})
