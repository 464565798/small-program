const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanStr:"tap",
    imageSrc : '',
    countryArray :['中国','美国','韩国','意大利','西班牙'],
    address: [{ name: '中国', countryId: 1 }, { name: '美国', countryId: 2 },{ name: '日本', countryId: 3 }],
    province: [{ name: '广东省', provinceId: 100 }, { name: '广西省', provinceId: 200 },{ name: '海南省', provinceId: 200 }],
    index:[0,0],
    selectIndex:[],    
    latitude: 0,
    longitude: 0
    
  },
  confrim(e){
    console.log(e.detail.value);
  },
  bindChangeCountry(e){
    console.log('选择' + e.detail.value);
    this.setData({
      index:e.detail.value
    });
  },
  changeDetail(e){
    console.log(e.detail.value);
    this.setData({
      selectIndex:e.detail.value
    });
  },
  changeRegion(e){
    console.log(e.detail);
  },
  //点击多列选择器
  bindcolumnchange(e){
    console.log('第几列：'+e.detail.column+'\n'+'改变了：'+e.detail.value);
    if(e.detail.column == 0){
      let changeIndex = e.detail.value;
      if (this.data.address[changeIndex].countryId == 2){
        this.setData({
          index:[e.detail.value,0],
          province: [{ name: '洛杉矶', provinceId: 100 }, { name: '迈阿密', provinceId: 200 }, { name: '加利福尼亚', provinceId: 200 }, { name: '加利福尼亚A', provinceId: 200 }]
        });
      } else if (this.data.address[changeIndex].countryId == 3) {
        this.setData({
          index: [e.detail.value, 0],
          province: [{ name: '富士山', provinceId: 100 }, { name: '北海道', provinceId: 200 }, { name: '蝴蝶结a', provinceId: 200 }]

        });
      } else if (this.data.address[changeIndex].countryId == 1) {
        this.setData({
          index: [e.detail.value, 0],
          province: [{ name: '广东省', provinceId: 100 }, { name: '广西省', provinceId: 200 }, { name: '海南省', provinceId: 200 }]

        });
      }
    }
  },
  getPhone : function(e){
    console.log(e);
    console.log(this.data.latitude);
  },
  change(e){
    console.log(e.detail.value);
  },
  submit(result){
    console.log(result.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品分类',
    });
    // wx.setBackgroundColor({
    //   backgroundColor: '#8fb2da'
    // });
    // wx.showNavigationBarLoading();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    // wx.request({
    //   url: app.globalData.baseUrl + '/api/login',
    //   method:"POST",
    //   header:{
    //     "Content-Type": "text/plain; charset=utf-8",
    //     "token": "",
    //     "v": 1.0,
    //     "userId": "",
    //     "platform": "iOS"
    //   },
    //   data:{
    //     "data":
    //       {"mobile": "13683748966",
    //         "password": "123456"}
    //   },
    //   success:function(result){
    //     console.log(result.data);
    //   },
    //   fail:function(e){
    //     console.log('fail');
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var worker = wx.createWorker('workers/request/index.js');
    // worker.postMessage({
    //   msg: 'hello 张迪'
    // });
    // worker.onMessage(function(result){
    //   console.log(result['msg'] + 2000);
    //   worker.terminate();
    // });
    wx.getSetting({
      
     success:  res => {
       var weka_self = this;
    if (res.authSetting['scope.userLocation']) {
      wx.getLocation({
        success: function (res) {
          console.log(weka_self);
          weka_self.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
        }
      })
       }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('隐藏了');
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
    console.log(123);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  // onPageScroll: function (e) {
  //   console.log(e);
  //   console.log(this.route);
  // },

  /**
   * 用户点击右上角分享
   * 注意：只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
   */
  onShareAppMessage: function (res) {
    
  },
  bindtap :function(){
    // let time = wx.getStorage({
    //   key: 'time',
    //   success: function(res) {
    //     console.log(res.data);
    //   },
    //   fail : function(){
    //     wx.setStorage({
    //       key: 'time',
    //       data: {
    //         'name':'zhanghdi',
    //         'age':120
    //       },
    //     })
    //   }
    // });
    // console.log(21);
    // wx.openDocument({
    //   filePath: '',
    //   success : function(data){
    //     console.log(data);
    //   },
    //   fail: function(res){
    //     console.log(res);
    //   }
    // })
    // wx.getSetting({
    //   success:function(result){
    //     console.log(result.authSetting);
    //   }
    // })
    // wx.getLocation({
    //   success: function(res) {
    //     wx.openLocation({
    //       latitude: res.latitude,
    //       longitude: res.longitude,
    //       scale: 10
    //     })
    //   },
    // })
    // wx.getSystemInfo({
    //   success: function(res) {
    //     console.log(res);
    //   }
    // })
    // wx.makePhoneCall({
    //   phoneNumber: '13683748966',
    // })
    // wx.scanCode({
    //   success:res => {
    //     console.log(res);
    //     this.setData({
    //       scanStr:res.result
    //     });
    //   }
    // })
    // wx.showToast({
    //   title: 'hehe',
    // })
    // wx.showLoading({
    //   title: 'loading...',
    // })
    // wx.showModal({
    //   title: 'hehe',
    //   content: 'haha',
    //   success : res => {
    //     if(res.confirm){
    //       console.log("点击确定");
    //     }else if(res.cancel){
    //       console.log('点击取消');
    //     }
    //   } 
    // })
    // wx.showActionSheet({
    //   itemList: ["相机","相册"],
    //   // itemColor : '#80f73c',
    //   success : res => {
    //     console.log(res.tapIndex);
    //   }
    // })
    // wx.redirectTo({
    //   url: 'index',
    // })
    // wx.navigateTo({
    //   url: '../desc/index',
    // })
    // wx.switchTab({
    //   url: '../desc/index',
    // })
    // wx.reLaunch({
    //   url: '../desc/index',
    // })
    //缓存和相册
    // if(wx.getStorageSync('avater')){
    //   console.log('取出缓存' + wx.getStorageSync('avater'));
    //   return;
    // }else{
    //   console.log('暂无缓存');
    // }
    // wx.chooseImage({
    //   success: function(res) {
    //     var temFilePath = res.tempFilePaths
    //     wx.saveFile({
    //       tempFilePath: temFilePath[0],
    //       success:function(res){
    //         console.log('存储成功'+res.savedFilePath);
    //         wx.setStorage({
    //           key: 'avater',
    //           data: res.savedFilePath,
    //         })
    //       }
    //     })
    //   },
    // })

    // var recordManager = wx.getRecorderManager()
    // recordManager.onStart(()=>{
    //   console.log('record start')
    // })
    // recordManager.onStop((res)=>{
    //   console.log('record stop'+'路径：'+res.tempFilePath)

    // })
    // const options = {
    //   duration: 10000,
    //   sampleRate: 44100,
    //   numberOfChannels: 1,
    //   encodeBitRate: 192000,
    //   format: 'aac',
    //   frameSize: 50
    // }
    // recordManager.start(options)


    wx.navigateTo({
      url: '../desc/index',
    })
  //   var audioManager = wx.createInnerAudioContext();
  //   audioManager.autoPlay = true;
  //   audioManager.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46";
    
  // audioManager.onPlay(()=>{
  //   console.log('开始播放')
  // });

  


  },
  takePhoto(){
    const ctc = wx.createCameraContext(this)
    ctc.takePhoto({
      quality:'height',
      success : (res)=>{
        this.setData({
          userImagePath:res.tempImagePath
        });
      }
    });
  }
})