// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
  let openId = event.userInfo.openId;
  let orderDesc = event.orderDesc;
  var data = JSON.parse(orderDesc);
  data._openid = openId;
  data.state = data.state ? data.state : 0;
  data.shopName = data.shopName ? data.shopName : '旗舰店';
  data.orderTime = cloud.database().serverDate();
  return cloud.database().collection('order_list').add({
    data : data
  }).then(res=>{
    return res;
  });

}