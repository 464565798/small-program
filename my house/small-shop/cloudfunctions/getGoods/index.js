// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var goods_type = event.goods_type;
  var shops_id = event.shop_id;
  let page = event.page;
  if(!shops_id){
    return '参数异常';
  }
  switch(goods_type){
    case 'server_goods':  //服务区商品
      return getServerGoods(shops_id);
      break;
    case 'common_goods':  //普通商品，默认
      
      break;
    case 'recommend_goods': //推荐商品
      return getRecommendGood(shops_id,page);
      break;
    case 'ads':
      return getAdsImage(shops_id);
      break; 
    case 'categoods':
      
      let cate_name = event.cateName;
      return cateGoods(cate_name);
      break;
    default:
    return '错误';
    break;
  }
}
// 服务商品
function getServerGoods(id) {
  
   return cloud.database().collection('goods_list').where({
      shop_id: id
    }).field({
      goods_desc: true,
      goods_image: true,
      goods_name: true,
      goods_price: true,
      goods_id: true,

     }).orderBy('goods_sale_num','desc').limit(3).get().then(res => {
      return res;
    });
}

function getRecommendGood(id,page){
    return cloud.database().collection('goods_list').where({
      shop_id: id
    }).field({
      goods_desc: true,
      goods_image: true,
      goods_name: true,
      goods_price: true,
      goods_id: true,
      add_time : true
      }).orderBy('add_time', 'asc').skip(page * 4).limit(4).get().then(res => {
      return res;
    });
}

//获取轮播
function getAdsImage(id){
  return cloud.database().collection('ads_list').where({
    shop_id : id
  }).get().then(res =>{
    return res;
  });
}

function cateGoods(cateName){
 return cloud.database().collection('goods_list').where({
    goods_cate_name : cateName
  }).field({
    goods_desc: true,
    goods_image: true,
    goods_name: true,
    goods_price: true,
    goods_id: true,
    goods_sale_num : true,
    add_time: true,
    shop_id : true
  }).get().then(res=>{
    return res.data;
  });

}