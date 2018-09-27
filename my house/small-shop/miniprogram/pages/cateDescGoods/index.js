Page({

  /**
   * 页面的初始数据
   */
  data: {

    cate_id: 0,               //分类ID
    current_sort_index: 0,     //筛选ID
    goods_list: [{ name: '紫金茶壶', desc: '德国进口茶具', price: 100, id: 885, image: '../../resouce/goods/chahu.jpg', shopName: '张迪旗舰店' }, { name: '茶壶', desc: '英国进口茶具', price: 130, id: 1088, image: '../../resouce/goods/fruit.jpg', shopName: '张迪旗舰店' }, { name: '车厘子', desc: '自产水果', price: 130, id: 88, image: '../../resouce/goods/ping.jpg', shopName: '张迪旗舰店' }, { name: '月饼', desc: '月饼 祝福4只', price: 99, id: 787, image: '../../resouce/goods/swish.jpg', shopName: '张迪旗舰店' }, { name: '洗衣机', desc: '德国进口茶具', price: 10, id: 778, image: '../../resouce/goods/chabei.jpg', shopName: '张迪旗舰店' }, { name: '茶杯 定制 情侣杯', desc: '青花瓷茶杯特价炫彩', price: 100, id: 90000, image: '../../resouce/goods/miaoao.jpg', shopName: '张迪旗舰店' }, { name: '棉袄', desc: '德国进口茶具', price: 9009, id: 1100, image: '../../resouce/goods/shuibei.jpg', shopName: '张迪旗舰店'}, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 500, image: '../../resouce/goods/pijiu.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 10000, image: '../../resouce/goods/xiyiji.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 60, image: '../../resouce/goods/shubao.jpg' }, { name: '禅语', desc: '德国进口茶具', price: 99, id: 70, image: '../../resouce/goods/wangzijiu.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 80, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 90, image: '../../resouce/goods/kafei.jpg' }, { name: '咖啡', desc: '雀巢情侣咖啡 提神', price: 99, id: 102, image: '../../resouce/goods/xiezi.jpg' }, { name: '足球鞋', desc: '学生足球鞋短钉跑步鞋', price: 99, id: 71, image: '../../resouce/goods/touying.jpg' }, { name: '投影仪', desc: '投影仪器公司家用特价', price: 10, id: 800, image: '../../resouce/goods/jianshen.jpg' }, { name: '举重棒', desc: '美国进口20kg 男士室内健身', price: 1000, id: 9, image: '../../resouce/goods/kafei.jpg' }, { name: '咖啡', desc: '雀巢情侣咖啡 提神',price: 99, id: 101, image: '../../resouce/goods/xiezi.jpg' }],
    isBlockStyle : true //是否块状
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cate_good_id = options.cate_good_id;
    if(cate_good_id){
      this.setData({
        cate_id : cate_good_id
      });
    };
    
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
  searchGoods : function(e){
    console.log(e);
    let text = e.detail.value;
    
    if(!text||text == ''){
      wx.showToast({
        title: '请输入搜索内容'
      },2000)    
    }
  },
  changeSort:function(e){
    let module_id = e.currentTarget.dataset.moduleId;
    if (this.data.current_sort_index == module_id)return;
    console.log(module_id);
 
    var goods ;
    if(module_id == 2){
      goods = [{ name: '咖啡', desc: '雀巢情侣咖啡 提神', price: 99, id: 11, image: '../../resouce/goods/xiezi.jpg' }, { name: '足球鞋', desc: '学生足球鞋短钉跑步鞋', price: 99, id: 7, image: '../../resouce/goods/touying.jpg' }, { name: '投影仪', desc: '投影仪器公司家用特价', price: 10, id: 8, image: '../../resouce/goods/jianshen.jpg' }, { name: '举重棒', desc: '美国进口20kg 男士室内健身', price: 100, id: 9, image: '../../resouce/goods/kafei.jpg' }, { name: '咖啡', desc: '雀巢情侣咖啡 提神', price: 99, id: 0, image: '../../resouce/goods/xiezi.jpg' }, { name: '紫金茶壶', desc: '德国进口茶具', price: 100, id: 599, image: '../../resouce/goods/chahu.jpg' }, { name: '茶壶', desc: '英国进口茶具', price: 130, id: 1077, image: '../../resouce/goods/fruit.jpg' }, { name: '车厘子', desc: '自产水果', price: 130, id: 699, image: '../../resouce/goods/ping.jpg' }, { name: '月饼', desc: '月饼 祝福4只', price: 99, id: 799, image: '../../resouce/goods/swish.jpg' }, { name: '洗衣机', desc: '德国进口茶具', price: 10, id: 899, image: '../../resouce/goods/chabei.jpg' }, { name: '茶杯 定制 情侣杯', desc: '青花瓷茶杯特价炫彩', price: 100, id: 999, image: '../../resouce/goods/miaoao.jpg' }, { name: '棉袄', desc: '德国进口茶具', price: 99, id: 119, image: '../../resouce/goods/shuibei.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 59, image: '../../resouce/goods/pijiu.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 109, image: '../../resouce/goods/xiyiji.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 69, image: '../../resouce/goods/shubao.jpg' }, { name: '禅语', desc: '德国进口茶具', price: 99, id: 79, image: '../../resouce/goods/wangzijiu.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 89, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 99, image: '../../resouce/goods/kafei.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 89, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 99, image: '../../resouce/goods/kafei.jpg' }];
    } else if (module_id == 1){
      goods = [{ name: '袜子', desc: '德国进口茶具', price: 130, id: 1213209, image: '../../resouce/goods/xiyiji.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id:4669, image: '../../resouce/goods/shubao.jpg' }, { name: '禅语', desc: '德国进口茶具', price: 99, id: 732139, image: '../../resouce/goods/wangzijiu.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 4341289, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 3213299, image: '../../resouce/goods/kafei.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 1239, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 9459, image: '../../resouce/goods/kafei.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 109, image: '../../resouce/goods/xiyiji.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 769, image: '../../resouce/goods/shubao.jpg' }, { name: '禅语', desc: '德国进口茶具', price: 99, id: 749, image: '../../resouce/goods/wangzijiu.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 289, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 939, image: '../../resouce/goods/kafei.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 89, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 99, image: '../../resouce/goods/kafei.jpg' },{ name: '咖啡', desc: '雀巢情侣咖啡 提神', price: 99, id: 11, image: '../../resouce/goods/xiezi.jpg' }, { name: '足球鞋', desc: '学生足球鞋短钉跑步鞋', price: 99, id: 7, image: '../../resouce/goods/touying.jpg' }, { name: '投影仪', desc: '投影仪器公司家用特价', price: 10, id: 8, image: '../../resouce/goods/jianshen.jpg' }, { name: '举重棒', desc: '美国进口20kg 男士室内健身', price: 100, id: 9, image: '../../resouce/goods/kafei.jpg' }, { name: '咖啡', desc: '雀巢情侣咖啡 提神', price: 99, id: 0, image: '../../resouce/goods/xiezi.jpg' }, { name: '紫金茶壶', desc: '德国进口茶具', price: 100, id: 599, image: '../../resouce/goods/chahu.jpg' }, { name: '茶壶', desc: '英国进口茶具', price: 130, id: 1077, image: '../../resouce/goods/fruit.jpg' }, { name: '车厘子', desc: '自产水果', price: 130, id: 699, image: '../../resouce/goods/ping.jpg' }, { name: '月饼', desc: '月饼 祝福4只', price: 99, id: 799, image: '../../resouce/goods/swish.jpg' }, { name: '洗衣机', desc: '德国进口茶具', price: 10, id: 899, image: '../../resouce/goods/chabei.jpg' }, { name: '茶杯 定制 情侣杯', desc: '青花瓷茶杯特价炫彩', price: 100, id: 999, image: '../../resouce/goods/miaoao.jpg' }, { name: '棉袄', desc: '德国进口茶具', price: 99, id: 119, image: '../../resouce/goods/shuibei.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 59, image: '../../resouce/goods/pijiu.jpg' }];
    }else{
      goods = [{ name: '袜子', desc: '德国进口茶具', price: 130, id: 109, image: '../../resouce/goods/xiyiji.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 69, image: '../../resouce/goods/shubao.jpg' }, { name: '禅语', desc: '德国进口茶具', price: 99, id: 79, image: '../../resouce/goods/wangzijiu.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 89, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 99, image: '../../resouce/goods/kafei.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 32389, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 3499, image: '../../resouce/goods/kafei.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 18909, image: '../../resouce/goods/xiyiji.jpg' }, { name: '袜子', desc: '德国进口茶具', price: 130, id: 6769, image: '../../resouce/goods/shubao.jpg' }, { name: '禅语', desc: '德国进口茶具', price: 99, id: 7899, image: '../../resouce/goods/wangzijiu.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 8909, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 9659, image: '../../resouce/goods/kafei.jpg' }, { name: '花露', desc: '德国进口茶具', price: 10, id: 8977, image: '../../resouce/goods/waitao.jpg' }, { name: '沐浴露', desc: '德国进口茶具', price: 100, id: 9966, image: '../../resouce/goods/kafei.jpg' }, { name: '咖啡', desc: '雀巢情侣咖啡 提神', price: 99, id: 11889, image: '../../resouce/goods/xiezi.jpg' }, { name: '足球鞋', desc: '学生足球鞋短钉跑步鞋', price: 99, id: 467, image: '../../resouce/goods/touying.jpg' }, { name: '投影仪', desc: '投影仪器公司家用特价', price: 10, id: 8654, image: '../../resouce/goods/jianshen.jpg' }, { name: '举重棒', desc: '美国进口20kg 男士室内健身', price: 100, id: 669, image: '../../resouce/goods/kafei.jpg' }, { name: '咖啡', desc: '雀巢情侣咖啡 提神', price: 99, id: 6578, image: '../../resouce/goods/xiezi.jpg' }, { name: '紫金茶壶', desc: '德国进口茶具', price: 100, id: 595559, image: '../../resouce/goods/chahu.jpg' }, { name: '茶壶', desc: '英国进口茶具', price: 130, id: 107557, image: '../../resouce/goods/fruit.jpg' }, { name: '车厘子', desc: '自产水果', price: 130, id: 696789, image: '../../resouce/goods/ping.jpg' }, { name: '月饼', desc: '月饼 祝福4只', price: 99, id: 79669, image: '../../resouce/goods/swish.jpg' }];
    }

    this.setData({

      goods_list : goods,
    
    });
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