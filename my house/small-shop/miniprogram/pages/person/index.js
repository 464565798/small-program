Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{ title: '待付款', image: '../../resouce/person/wait_money.png', targetUrl: 'order/index' }, { title: '待收货', image: '../../resouce/person/wait_receive.png', targetUrl: 'order/index' }, { title: '待评价', image: '../../resouce/person/wait_common.png', targetUrl: 'order/index' }, { title: '退款/退货', image: '../../resouce/person/wait_return.png', targetUrl: 'order/index'}],
    propertyList: [{ title: '奖励金', image: '../../resouce/person/wait_money.png', targetUrl: 'property/money/index' }, { title: '优惠券', image: '../../resouce/person/wait_receive.png', targetUrl: 'property/discount/index' }, { title: '红包', image: '../../resouce/person/wait_ziti.png', targetUrl: 'property/discount/index' }, { title: '积分', image: '../../resouce/person/wait_ziti.png', targetUrl: 'property/signal/index' }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心',
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
  bindtap(){

    wx.cloud.callFunction({
      name : 'add',
      data :{
        a : 1,
        b : 2
      },
      success : res=> {
        console.log(res);
      }
    });

  },
  //签到、红包、优惠
  goAction: function(e){

    let targetUrl = e.currentTarget.dataset.targetUrl;
    console.log(targetUrl);
    let targetUrlParam = { collection: 'myCollection/index', buycar: 'buyCar/index', signa:'property/signal/index'};
    wx.navigateTo({
      url: targetUrlParam[targetUrl],
    }) 
  },
  //我的财产或我的订单
  goTargetUrl: function(e){
    let targetUrl = e.currentTarget.dataset.targetUrl;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: targetUrl + '?index=' + index,
    }) 
  },
  //地址管理
  goAddress: function(){
    wx.navigateTo({
      url: 'address/index',
    })
  }
  

})