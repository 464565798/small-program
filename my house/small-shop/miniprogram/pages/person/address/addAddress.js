Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId : '',
    address:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '编辑收货地址',
    })
    let addressId = options.addressId;

    let weak_self = this;
    if (addressId){
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      wx.cloud.callFunction({
        name: 'getAddressList',
        data : {
          addressId : addressId
        },
        success: res => {
          wx.hideLoading();
          console.log(res);
          let list = res.result.data[0];
          
          if(!list){return;}
          weak_self.setData({
            addressId: addressId,
            address: list
          });
          console.log(list);
        },
        fail : res=>{
          wx.hideLoading();
          console.log(res);
        }
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

  //输入姓名
  changeName: function(res){
    console.log(res);
    let detail = res.detail.value;
    let address = this.data.address;
    address.name = detail;
    this.setData({
      address: address
    });
  },
  //输入电话
  changePhone : function(res){
    console.log(res);
    let detail = res.detail.value;
    let address = this.data.address;
    address.phone = detail;
    this.setData({
      address: address
    });
  },
  //选择地区
  bindRegionChange : function(e){
    let detail = e.detail.value;
    let address = this.data.address;
    address.province = detail[0];
    address.city = detail[1];
    address.district = detail[2];
    this.setData({
      address : address
    });
  },
  //输入详清
  inputDetail : function(res){
    console.log(res);
    let detail = res.detail.value;
    let address = this.data.address;
    address.addressDetail = detail;
    this.setData({
      address: address
    });
  },
  addAddress:function(){
    console.log(this.data);
    if (!this.data.address.name || this.data.address.name.length <= 0 || !this.data.address.phone || this.data.address.phone.length < 11 || !this.data.address.province || this.data.address.province.length <= 0 || !this.data.address.addressDetail || this.data.address.addressDetail.length <= 0){
      wx.show({
        title: '请输入完整信息',
      })
      return;
    }
    let weakSelf = this;
    wx.cloud.callFunction({
      name: 'addAddress',
      data : {
        address: weakSelf.data.address
      },
      complete:function(res){
        console.log(res);
        wx.navigateBack({
          complete : res=>{
            wx.showToast({
               title: weakSelf.data.address._id ? '修改成功' : '添加成功',
                })
              }
            })
      }
    });
  }
})