// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openId = wxContext.APPID;
  var paramdata = event.data;
  paramdata._openid = openId;
  let _id = paramdata._id;
  delete paramdata._id;
  return cloud.database().collection('goods_list').doc(_id).update({
    data: paramdata,
    success : res => {
      return res;
    },
    fail : res => {
      return res;
    }
  });
}