
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    cateName: '',               //分类ID
    current_sort_index: 0,     //筛选ID
    goods_list: [],
    isBlockStyle: true, //是否块状
    searchWord: '',
    userType: 0,
    page: 1,
  },
  onShow : function(){
    this.data.page = 1;
    this.data.goods_list = [];
    this.refreshData();
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    let userType = options.userType;
    this.setData({
      userType: userType
    });
  },
  refreshData: function () {
    wx.cloud.callFunction({
      name: "getGoodsList",
      data: {
        page: this.data.page,
        count: 10
      },
      success: res => {
        wx.stopPullDownRefresh();
        console.log('success');
        console.log(res);
        var list = this.data.goods_list;
        let goods = res.result.data;
        for (var i = 0; i < goods.length; i++) {
          list.push(goods[i]);
        }
        console.log(goods);
        this.setData({
          goods_list: list
        });
      },
      fail: res => {
        wx.stopPullDownRefresh();
        console.log(res);
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('上拉');
    this.data.page = 1;
    this.data.goods_list = [];
    this.refreshData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(123);
    this.data.page = this.data.page + 1;
    this.refreshData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  searchGoods: function (e) {
    console.log(e);
    let text = e.detail.value;

    if (!text || text == '') {
      wx.showToast({
        title: '请输入搜索内容'
      }, 2000)
      return;
    }
    // this.data.cateName = '';
    // this.data.current_sort_index = 0;
    this.data.searchGoods = text;
    // this.refreshData();
  },
  changeSort: function (e) {

    let module_id = parseInt(e.currentTarget.dataset.moduleId);
    if (this.data.current_sort_index == module_id) return;
    console.log(module_id);
    this.data.goods_list = [];
    this.setData({
      current_sort_index: module_id,
      page: 1,

    });
    this.refreshData();
  },

  // 点击图片
  selectDescAction: function (e) {

    let currentId = e.currentTarget.id;
    wx.navigateTo({
      url: '../desc/index?goodId=' + currentId,
    })
  },
  //改变排版
  changeGoodsStyle: function () {
    let isChange = !this.data.isBlockStyle;
    this.setData({
      isBlockStyle: isChange,
    });
  },
  selectRowGoodsAction: function (e) {
    let goodsId = e.currentTarget.dataset.goodsId;
    console.log(goodsId);
    wx.navigateTo({
      url: '../desc/index?goodId=' + goodsId,
    })
  },
  addGoodsAction : function (){

    wx.navigateTo({
      url: '../desc/index'
    })
  }
})