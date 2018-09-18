//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goods: [{ name: '沐浴露', price: 100, id: 5, image: '../../resouce/common/shop_common_01.jpg' }, { name: '袜子', price: 130, id: 10, image: '../../resouce/common/shop_common_06.jpg' }, { name: '袜子', price: 130, id: 6, image: '../../resouce/common/shop_common_02.gif' }, { name: '禅语', price: 99, id: 7, image: '../../resouce/common/shop_common_03.jpg' }, { name: '花露', price: 10, id: 8, image: '../../resouce/common/shop_common_04.jpg' }, { name: '沐浴露', price: 100, id: 9, image: '../../resouce/common/shop_common_05.jpg' }, { name: '禅语', price: 99, id: 11, image: '../../resouce/common/shop_common_07.jpg' }],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cycleImageData: [{ url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', target: 'goods_detail?goodId=123' }, { url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', target: 'goods_detail?goodId=456' }, { url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', target: 'goods_detail?goodId=789'}],
    col1: [],
    col2: [],
    colWidth: 0,
    col1Height: 0,
    col2Height: 0,
    module_list: [{ module_name: '分类', module_id: 0, module_image: '../../resouce/module/cate.png' }, { module_name: '购物车', module_id: 2, module_image: '../../resouce/module/buy_car.png' }, { module_name: '新货', module_id: 3, module_image: '../../resouce/module/new_goods.png' }, { module_name: '购物券', module_id: 4, module_image: '../../resouce/module/noun.png' }, { module_name: '秒杀', module_id: 5, module_image: '../../resouce/module/clark.png' }, { module_name: '红包', module_id: 6, module_image: '../../resouce/module/redbao.png' }, { module_name: '优惠', module_id: 7, module_image: '../../resouce/module/jifen.png' }, { module_name: '签到', module_id: 0, module_image: '../../resouce/module/signa.png' }]
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
    wx.stopPullDownRefresh();
  },
  onReachBottom:function(){
    // console.log('上拉加载了');
    // var arr = this.data.goods;
    // var newArr = arr.concat(this.data.goods);
    // this.setData({
    //   goods:newArr
    // });
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
    wx.getSystemInfo({
      success: function (res) {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imageWidth = ww * 0.48;
        weak_self.setData({
          colWidth: imageWidth
        });
      },
    });
    // wx.stopPullDownRefresh();
    // wx.startPullDownRefresh();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
    wx.setNavigationBarTitle({
      title: '推荐商品',
    });
  },
  //图片加载完毕
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oriWidth = e.detail.width;
    let oriHeight = e.detail.height;
    let scale = this.data.colWidth / oriWidth;
    let imageHeight = scale * oriHeight;
    let imageObj = null;
    for (let i = 0; i < this.data.goods.length; i++) {
      let img = this.data.goods[i];
      
      if (img.id == imageId) {
        imageObj = img;
        break;
      }
    }
    if (this.data.col1Height <= this.data.col2Height) {
      this.data.col1Height += imageHeight;
      this.data.col1.push(imageObj);
    } else {
      this.data.col2Height += imageHeight;
      this.data.col2.push(imageObj);
    }
    if (this.data.col1.length + this.data.col2.length == this.data.goods.length) {
      
      this.setData({
        col1:this.data.col1,
        col2:this.data.col2
      });
    }


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
    console.log(module_id);
  }
})
