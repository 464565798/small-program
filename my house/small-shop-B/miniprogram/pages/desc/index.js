Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'change',
    shop_category : [],
    shop_category_list : [],
    goods : {
      goods_desc: '',
      goods_detail: [],
      goods_id: '',
      goods_image: '',
      goods_images: [],
      goods_price: 0,
      goods_rank_list: [],
      _id: '',
      goods_cate_name: '',
    },
    value :[0,0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods_id = options.goodId;
    this.data.goods.goods_id = goods_id;
    console.log(goods_id);
    if(goods_id){
      this.refreshData();
    }else{
      this.data.type = 'add';
      this.getCateList();
    }
    // this.getCateList();
  },
  getCateList : function(){
    let weak_self = this;
    wx.cloud.callFunction({
      name: 'categoryList',
      data: {
        shop_id: "100001"
      },
      success: res => {
        console.log(res.result);
        if (res.result.length) {
          var ifComplete = false;
          var shop_category_list = res.result[0].list;
          var cate_name = shop_category_list[0];
          for (var i = 0; i < res.result.length;i++){
            let list = res.result[i].list;
            for (var j = 0; j < list.length; j++) {
              
              if (list[j] == weak_self.data.goods.goods_cate_name){
                console.log('success');
                weak_self.data.value = [i,j];
                console.log(weak_self.data.value);
                shop_category_list = list;
                cate_name = list[j];
                ifComplete = true;
                break;
              }
            }
            if (ifComplete) break;
          }
          weak_self.setData({
            shop_category_list: shop_category_list,
            shop_category: res.result,
            value: weak_self.data.value,
            'goods.goods_cate_name' : cate_name
          });
        }
      }
    });
  },
  refreshData:function(){
    let weak_self = this;
    wx.cloud.callFunction({
      name: 'getGoodsDetail',
      data: {
        goods_id: this.data.goods.goods_id,
        detailType: 'goods_detail'
      },
      success: res => {
        console.log(res);
        weak_self.setData({
          goods : res.result
        });

        weak_self.getCateList();
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  saveAction : function(){
    console.log(this.data);
    // return;
    let weak_self = this;
    if(this.data.type == 'add'){
      weak_self.data.goods.goods_id = new Date().getTime() + '';
      weak_self.data.goods.goods_image = weak_self.data.goods.goods_images[0];
      wx.cloud.callFunction({
        name: 'addGoods',
        data: {
          data: weak_self.data.goods
        },
        success: res => {
          wx.showModal({
            title: '添加成功',
            content: '',
            showCancel: false
          })
          console.log(res.result);
        },
        fail: res => {
          console.log(res);
        }
      });
      return;      
    }
 
    
    wx.cloud.callFunction({
      name: 'updateGoods',
      data :{
        data: weak_self.data.goods
      },
      success : res=>{
        wx.showModal({
          title: '更新成功',
          content: '',
          showCancel : false
        })
        console.log(res.result);
      },
      fail : res=>{
        console.log(res);
      }
    });
    
  },
  addMainAction : function(e){
    let weak_self = this;
    wx.chooseImage({
      success: function(res) {  

        for (var i = 0; i < res.tempFilePaths.length;i++){
          let date = new Date().getTime();
          let path = 'goods/' + date + Math.random() * 100 +'.png';
          let imageFilePath = res.tempFilePaths[i];
          wx.cloud.uploadFile({
            cloudPath: path,
            filePath: imageFilePath,
            success: result => {
              var images = weak_self.data.goods.goods_images ? weak_self.data.goods.goods_images : [];
              console.log(images);
              images[images.length] = "cloud:///" + path;
              console.log(images);
              weak_self.setData({
                'goods.goods_images': images
              });
            },
            fail: console.error
          });
        } 
      },
    })
  },
  addDetailAction : function(e){
    let weak_self = this;
    wx.chooseImage({
      success: function (res) {
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          let date = new Date().getTime();
          let path = 'goods/' + date + Math.random() * 100 + '.png';
          wx.cloud.uploadFile({
            cloudPath: path,
            filePath: res.tempFilePaths[i],
            success: result => {
              console.log(result);
              var images = weak_self.data.goods.goods_detail ? weak_self.data.goods.goods_detail : [];
              console.log(images);
              images[images.length] = "cloud:///" + path;
              console.log(images);
              weak_self.setData({
                'goods.goods_detail' : images
              });
            },
            fail: console.error
          });
        }
      },
    })
  },
  //长按主图
  touchLongMainAction : function(e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
    wx.showModal({
      title: '删除图片？',
      content: '',
      showCancel: true,
      confirmText: '删除',
      confirmColor: '#DA4444',
      success : function(res){
        console.log('sure');
      }
    })
  },
  //长按详情
  touchLongDetailAction : function (e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
    wx.showModal({
      title: '删除图片？',
      content: '',
      showCancel: true,
      confirmText: '删除',
      confirmColor: '#DA4444',
      success: function (res) {
        console.log('sure');
      }
    })
  },
  bindChange : function(e){
    let indexArray = e.detail.value;
    this.data.shop_category_list = this.data.shop_category[indexArray[0]].list;
    if(indexArray[0] == this.data.value[0]){
      this.data.value[1] = indexArray[1];
    }else{
      this.data.value[0] = indexArray[0];
      this.data.value[1] = 0;
    }
    this.data.goods.goods_cate_name = this.data.shop_category_list[this.data.value[1]];
    console.log(this.data.goods.goods_cate_name);
    this.setData(this.data);
  },
  detailChangeAction : function(e){
    let dataType = e.currentTarget.dataset.dataType;
    let detailData = e.detail.value;

    switch(dataType){
      case 'name' : //设置价格
      this.setData({
        'goods.goods_name' : detailData
      });
      break;
      case 'desc' : //设置描述
        this.setData({
          'goods.goods_desc' : detailData
        });
      break;
      case 'price' :  //设置价格
        this.setData({
          'goods.goods_price' : detailData
        });
      break;
    }
  }
})