// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let goods_id = event.goods_id;
  var detail;
  let detailType = event.detailType;
  switch(detailType){
    case 'comment':
      detail = getCommentDetail(goods_id);
      break;
    case 'goods_detail':
      detail = getDetail(goods_id);
      break;
    case 'goods_simple':
      detail = getDetailSimple(goods_id);
      break;
    default:
      return '发生错误';
      break;
  }
  return detail;
}
function getDetail(goods_id){
  return cloud.database().collection('goods_list').where({
    goods_id: goods_id
  }).field({
    goods_detail:true,
    goods_price:true,
    goods_desc:true,
    goods_id:true,
    goods_sale_num:true,
    goods_rank_list:true,
    goods_server_desc:true,
    shop_id:true,
    goods_name:true,
    goods_image:true,
    goods_images: true,
    goods_cate_name : true
  }).get().then(res => {
    if(res.data.length)
    return res.data[0];
    else return {};
  });
}

function getCommentDetail(goods_id){
  return cloud.database().collection('goods_comment_list').where({
    goods_id: goods_id
  }).orderBy('comment_time','asc').limit(1).get().then(res=>{
    if (res.data.length)
      return res.data;
    else return [];
  });
}
function getDetailSimple(goods_id){
   return cloud.database().collection('goods_list').where({
     goods_id: goods_id
   }).field({
     goods_price: true,
     goods_desc: true,
     goods_id: true,
     shop_id: true,
     goods_name: true,
     goods_image: true,
   }).get().then(res => {
     if (res.data.length)
       return res.data[0];
     else return {};
   });
 }