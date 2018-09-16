// var colorArray = ['black','red','green'];
Page({
  onPageScroll: function (e) {
    console.log(e);
    console.log(this.route);
  },
  data: {
    goodsId:'',
    animationData: {},
    imagePath: '',
    array : [1,2,4,5],
    imageData: { pathUrl:'../../resouce/icon_chezhihui_H.png'},
    objectArray: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    currentColor : 'black',
    numberArray: [1, 2, 3, 4],



  },
  onLoad : function(options){
    wx.setNavigationBarTitle({
      title : '商品详情'
    });
    console.log('页面参数'+options.goodId);
    if(options.goodId){
      this.setData({
       goodsId : options.goodId
       });
    }
  },
  // changeColor : function(){
  //   // console.log(parseInt(Math.random() * 4));
  //   this.setData({
  //     currentColor: colorArray[parseInt(Math.random() * 3)]
  //   });
  // },
  // switch: function (e) {
  //   const length = this.data.objectArray.length
  //   for (let i = 0; i < length; ++i) {
  //     const x = Math.floor(Math.random() * length)
  //     const y = Math.floor(Math.random() * length)
  //     const temp = this.data.objectArray[x]
  //     this.data.objectArray[x] = this.data.objectArray[y]
  //     this.data.objectArray[y] = temp
  //   }
  //   this.setData({
  //     objectArray: this.data.objectArray
  //   })
  // },
  // addToFront: function (e) {
  //   const length = this.data.objectArray.length
  //   this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
  //   this.setData({
  //     objectArray: this.data.objectArray
  //   })
  // },
  // addNumberToFront: function (e) {
  //   this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
  //   this.setData({
  //     numberArray: this.data.numberArray
  //   })
  // },
  onShareAppMessage:function(){
    console.log('123');
  },
  onShow: function () {
  //   var animation = wx.createAnimation({
  //     duration: 3000,
  //     delay : 3000,
  //     timingFunction: 'ease',
  //   })
  
  //   this.animation = animation
  //   // animation.rotateZ(45).step();
  //   animation.translate3d(90,90,90).step();
  //   animation.scale(2,2).step({delay:3000,duration:6000});
  //   this.setData({
  //     animationData: animation.export()
  //   });
  //   var cav = wx.createCanvasContext(canvasid, this);
  //   return;
  //   animation.scale(2, 2).rotate(0).step()

  //   this.setData({
  //     animationData: animation.export()
  //   })

  //   setTimeout(function () {
  //     animation.translate(30,30).step()
  //     this.setData({
  //       animationData: animation.export()
  //     })
  //   }.bind(this), 1000)
  // },
  // rotateAndScale: function () {
  //   // 旋转同时放大
  //   this.animation.rotateY(360).scale(1, 1).step()
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  // },
  // rotateThenScale: function () {
  //   // 先旋转后放大
  //   this.animation.rotate(45).step()
  //   this.animation.scale(2, 2).step()
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  // },
  // rotateAndScaleThenTranslate: function () {
  //   // 先旋转同时放大，然后平移
  //   this.animation.rotate(45).scale(2, 2).step()
  //   this.animation.translate(100, 100).step({ duration: 1000 })
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  },
  bindTap : function(){
    // wx.showShareMenu({
    //   withShareTicket:false,
    //   success:result=>{
    //     console.log(123);
    //   },
    //   fail:error=>{
    //     console.log(456);
    //   }
    // })
    // wx.hideShareMenu({
    //   complete:function(){
    //     console.log(123);
    //   }
    // })
    // wx.getShareInfo({

    // })
    // console.log('desc被点击');
    // wx.navigateBack({
      
    // })
    // var query = wx.createSelectorQuery().in(this);
    // query.select('.anima').boundingClientRect(function(res){
    //   console.log(res);
    // }).exec()
    // query.select('.anima').boundingClientRect().exec(function(res){
    //   res.forEach(function(res){
    //     console.log(res.width);
    //   })
       
    //  });
    // console.log(arr);
    
    // wx.login({
    //   success:function(res){
    //     console.log(res.code);
    //   }
    // });
    // wx.requestPayment({
    //   'timeStamp': '',
    //   'nonceStr': '',
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success': function (res) {
    //   },
    //   'fail': function (res) {
    //   }
    // })
//选择地址
    // wx.chooseAddress({
    //   success:res=>{
    //     console.log(res);
    //   }
    // // })
    // wx.openSetting({
    //   success:res=>{
    //     console.log('发起成功');
    //   }
    // })
    // this.setData({
    //   imagePath: '../../resouce/icon_chezhihui_H.png'
    // });
    wx.navigateTo({
      url: '../movableView/index',
    })

  },
  // viewLongPress : function(event){
  //   // if(event.target.id == event.currentTarget.id)
  //   console.log('长按触发父视图view');
  // },
  // longpress : function(event){
  //   console.log('长按触发');
  //   console.log(event);
  // },
  // touchEnd : function(event){
  //   console.log('长按结束');
  //   console.log(event);
  // },
  // touchStart: function (event) {
  //   console.log('长按开始');
  //   console.log(event);
  // }
})