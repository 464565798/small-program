Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateragy:[{cate_name:'生活用品',cate_id:0},{cate_name:'美味食品',cate_id:1},{cate_name: '家具材料',cate_id : 2},{cate_name:'化妆用品',cate_id: 3},{cate_name: '保健用品',cate_id: 4}],
    cate_goods: [{ name: '沐浴露', desc: '飘柔', image: '../../resouce/common/shop_common_04.jpg', cate_goods_id: 0 }, { name: '洗发水', desc: '力士', image: '../../resouce/common/shop_common_05.jpg', cate_goods_id: 1 }, { name: '厨具', desc: '双立人', image: '../../resouce/common/shop_common_06.jpg', cate_goods_id: 2 }, { name: '卫生纸', desc: '心相印', image: '../../resouce/common/shop_common_07.jpg', cate_goods_id: 4 }],
    current_id : null,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品分类',
    });
    if(this.data.cateragy.length){
    let first_id = this.data.cateragy[0].cate_id;
    this.setData({
      current_id:first_id
    });
    }
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
  tapCateragy : function(e){
    let cu_id = e.currentTarget.dataset.indexKey;
    var cate_goods ;
    switch(cu_id){
      case 0:
        cate_goods = [{ name: '沐浴露', desc: '飘柔', image: '../../resouce/common/shop_common_04.jpg', cate_goods_id: 0 }, { name: '洗发水', desc: '力士', image: '../../resouce/common/shop_common_05.jpg', cate_goods_id: 1 }, { name: '厨具', desc: '双立人', image: '../../resouce/common/shop_common_06.jpg', cate_goods_id: 2 }, { name: '卫生纸', desc: '心相印', image: '../../resouce/common/shop_common_07.jpg', cate_goods_id: 4 }];break;
      case 1:
        cate_goods = [{ name: '三只松鼠', desc: '飘柔', image: '../../resouce/common/shop_common_04.jpg', cate_goods_id: 0 }, { name: '米老头', desc: '力士', image: '../../resouce/common/shop_common_05.jpg', cate_goods_id: 1 }, { name: '亲嘴豆干', desc: '双立人', image: '../../resouce/common/shop_common_06.jpg', cate_goods_id: 2 }, { name: '甜心圈', desc: '心相印', image: '../../resouce/common/shop_common_07.jpg', cate_goods_id: 4 }]; break;
      case 2:
        cate_goods = [{ name: '马桶', desc: '飘柔', image: '../../resouce/common/shop_common_04.jpg', cate_goods_id: 0 }, { name: '飞航地板', desc: '力士', image: '../../resouce/common/shop_common_05.jpg', cate_goods_id: 1 }, { name: '铝合金门窗', desc: '双立人', image: '../../resouce/common/shop_common_06.jpg', cate_goods_id: 2 }]; break;
      case 3:
        cate_goods = [{ name: '科颜氏', desc: '飘柔', image: '../../resouce/common/shop_common_04.jpg', cate_goods_id: 0 }, { name: '欧莱雅', desc: '力士', image: '../../resouce/common/shop_common_05.jpg', cate_goods_id: 1 }, { name: '迪奥', desc: '双立人', image: '../../resouce/common/shop_common_06.jpg', cate_goods_id: 2 }, { name: '安其拉', desc: '心相印', image: '../../resouce/common/shop_common_07.jpg', cate_goods_id: 4 }]; break;
      case 4:
        cate_goods = [{ name: '枸杞子', desc: '飘柔',  cate_goods_id: 0 }, { name: '脑白金', desc: '力士',  cate_goods_id: 1 }, { name: '太太', desc: '双立人', cate_goods_id: 2 }, { name: '心尘变', desc: '心相印',  cate_goods_id: 4 }]; break;
    }
    console.log(cu_id);
    this.setData({
      current_id:cu_id,
      cate_goods : cate_goods
    });
  },
  tapDescCategoods : function(e){
    let cate_good_id = e.currentTarget.dataset.categoodsid;
    console.log(cate_good_id);
    wx.navigateTo({
      url: '../cateDescGoods/index?cate_good_id=' + cate_good_id,
    })
  }
})