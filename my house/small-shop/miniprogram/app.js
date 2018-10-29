//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        fail : function(){
          console.log('fail');
        },
        success : function(){
          console.log('success');
        }
      })
    }
  },
  globalData : {
    shop_id : '100001'
  },
  getPathWithDeepLinkUrl: function (url) {
    var pathUrl = '';
    if (url == '' || !url) return pathUrl;
    var strArry = url.split("?");
    var path = strArry[0];
    if (!path) return;
    switch (path) {
      case 'goods_detail':  //商品详情
        pathUrl = '/pages/desc/index';
      case 'contact_detail': //客户会话

        break;
      default: break
    }
    if (strArry.length > 1) {
      pathUrl = pathUrl + '?' + strArry[1];
    }
    return pathUrl;
  }
})
