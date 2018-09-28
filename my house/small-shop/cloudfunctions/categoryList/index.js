// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    let id = event.shop_id;
    if(!id){
      return '未知商铺';
    }
    return cloud.database().collection('category_list').where({
      shop_id : id
    }).field({
      cate_list : true
    }).get().then( res =>{
      return res.data[0].cate_list;
    });
}