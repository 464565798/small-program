//app.js
// 'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'


App({
  data : {
    

  },
  onLaunch: function () {
    // wx.getShareInfo({
    //   shareTicket: 'shareTicket',
    //   timeout:3000,
    //   success:res=>{
    //     console.log('hehe-success');
    //   },
    //   complete:function(){
    //     console.log('hehe');
    //   }
    // })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              getApp().globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        // if(res.authSetting['scope.userLocation']){
        //   wx.getLocation({
        //     success: function (res) {
        //       console.log(res);
        //       // console.log(getApp().globalData.longitude);
        //       getApp().globalData.longitude = res.longitude;
        //       getApp().globalData.latitude = res.latitude;
        //       console.log(getApp().globalData.longitude);
        //     }
        //   })
        // }
        if(res.authSetting['scope.werun']){
            wx.getWeRunData({
              success : res => {
                console.log(res);
              }
            })
        }
      }
    })
    wx.authorize({
      scope: 'scope.userLocation',
      success : function(res){
        console.log(res);


      }
    })
    wx.authorize({
      scope: 'scope.werun',
      success : res => {

      }
    })
    wx.authorize({
      scope: 'scope.address',
      success:res=>{
        
      }
    })
    
    
  },
  globalData: {
    userInfo: null,
    baseUrl: "https://xmallapi.iauto360.cn",
    longitude : 0,
    latitude : 0

  },
  
  onHide:function(){

  },
  onShow:function(options){
    console.log(options);
  },
  onPageNotFound(res){
    wx.redirectTo({
      url: 'pages/index/index',
    })
  },
  getPathWithDeepLinkUrl: function(url){
    var pathUrl = '';
    if(url == '' || !url)return pathUrl;
    var strArry = url.split("?");
    var path = strArry[0];
    if(!path)return;
    switch(path){
    case 'goods_detail':  //商品详情
      pathUrl = '/pages/desc/index';
    case 'contact_detail': //客户会话
      
    break;
    default:break
    }
    if(strArry.length > 1){
      pathUrl = pathUrl + '?' + strArry[1];
    }
    return pathUrl;
  },
})