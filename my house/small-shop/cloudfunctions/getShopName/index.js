// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let shop_id = event.shop_id;

  return cloud.database().collection("shop_user_list").where({
      shop_id : shop_id
    }).field({
      shop_name : true,
      shop_id : true
    }).get().then(res => {
      return res.data.length ? res.data[0] : [];
    });

}