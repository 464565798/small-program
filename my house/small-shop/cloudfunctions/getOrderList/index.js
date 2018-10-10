// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let openId = event.userInfo.openId;
  var order_state = event.order_state;
  if (order_state == -1){
    return cloud.database().collection('order_list').where({
      _openid : openId,
    
    }).get();
  }else{

    return cloud.database().collection('order_list').where({
      _openid: openId,
      state : order_state
    }).get();
  }
}