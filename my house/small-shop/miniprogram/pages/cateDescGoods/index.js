const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    cateName: '',               //分类ID
    current_sort_index: 0,     //筛选ID
    goods_list: [],
    isBlockStyle : true, //是否块状
    searchWord : '',
    page : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cateName = options.cateName;
    if(cateName){
      this.data.cateName = cateName;
    }
    this.refreshData();
  },
  refreshData:function(){

      var weak_self = this;
      wx.cloud.callFunction({
        name: 'getGoods',
        data: {
          searchWord : this.data.searchGoods,
          page : this.data.page,
          goods_type: 'categoods',
          cateName: this.data.cateName,
          shop_id: app.globalData.shop_id,
          orderType: this.data.current_sort_index
        },
        success: res => {
          console.log(this.data.page);
          console.log(res);
          wx.stopPullDownRefresh();
          var goods = res.result;
          if(this.data.page > 0){
            goods = this.data.goods_list;
          for(var i =0;i<res.result.length;i++){
            goods.push(res.result[i]);
          }
          }
          console.log(this.data.goods_list);
          this.data.goods_list = goods;
          this.setData(this.data);
        }
      });

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('上拉');
    this.data.page = 0;
    this.data.goods_list = [];
    this.refreshData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page = this.data.page + 1;
    this.refreshData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  searchGoods : function(e){
    console.log(e);
    let text = e.detail.value;
    
    if(!text||text == ''){
      wx.showToast({
        title: '请输入搜索内容'
      },2000)
      return;    
    }
    // this.data.cateName = '';
    // this.data.current_sort_index = 0;
    this.data.searchGoods = text;
    // this.refreshData();
  },
  changeSort:function(e){
    
    let module_id = parseInt(e.currentTarget.dataset.moduleId);
    if (this.data.current_sort_index == module_id)return;
    console.log(module_id);
    this.data.goods_list = [];  
    this.setData({
      current_sort_index : module_id,
      page : 0,
      
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
  changeGoodsStyle : function(){
    let isChange = !this.data.isBlockStyle;
    this.setData({
      isBlockStyle: isChange,
    });
  },
  selectRowGoodsAction : function(e){
      let goodsId = e.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: '../desc/index?goodId=' + goodsId,
    })
  }
})