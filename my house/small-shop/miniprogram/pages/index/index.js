//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goods: [{ name: '沐浴露', price: 100, id: 1, image: '../../resouce/common/shop_common_01.jpg' }, { name: '袜子', price: 130, id: 2, image: '../../resouce/common/shop_common_02.gif' }, { name: '禅语', price: 99, id: 3, image: '../../resouce/common/shop_common_03.jpg' }, { name: '花露', price: 10, id: 4, image: '../../resouce/common/shop_common_06.jpg' }, { name: '沐浴露', price: 100, id: 5, image: '../../resouce/common/shop_common_01.jpg' }, { name: '袜子', price: 130, id: 6, image: '../../resouce/common/shop_common_02.gif' }, { name: '禅语', price: 99, id: 7, image: '../../resouce/common/shop_common_03.jpg' }, { name: '花露', price: 10, id: 8, image: '../../resouce/common/shop_common_06.jpg' }, { name: '沐浴露', price: 100, id: 9, image: '../../resouce/common/shop_common_07.jpg' }, { name: '袜子', price: 130, id: 10, image: '../../resouce/common/shop_common_02.gif' }, { name: '禅语', price: 99, id: 11, image: '../../resouce/common/shop_common_06.jpg' }, { name: '花露', price: 10, id: 12, image: '../../resouce/common/shop_common_04.jpg' }],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cycleImageData: [{ url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', target: 'goods_detail?goodId=123' }, { url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', target: 'goods_detail?goodId=456' }, { url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', target: 'goods_detail?goodId=789'}],
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
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
