// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let openId = event.userInfo.openId;;
  var paramdata = event.data;
  paramdata._openid = openId;
  return cloud.database().collection('goods_list').add({
    data : paramdata,
    success: res => {
      return res;
    },
    fail: res => {
      return res;
    }
  });

}