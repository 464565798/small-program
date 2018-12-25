// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let page = event.page;
  let count = event.count ? event.count : 10;
  return cloud.database().collection('goods_list').orderBy('add_time','desc').skip((page-1) * 10).limit(count).field({
    goods_name : true,
    goods_price : true,
    goods_id : true,
    goods_image : true,
    goods_desc : true
  }).get();
}