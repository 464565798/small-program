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
      return getRecommendGood(shops_id,parseInt(page));
      break;
    case 'ads':
      return getAdsImage(shops_id);
      break; 
    case 'categoods':
      
      let cate_name = event.cateName;
      let orderType = event.orderType;
      let searchWord = event.searchWord;
      return cateGoods(shops_id,cate_name,orderType,page,searchWord);
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

     }).orderBy('goods_sale_num','asc').limit(3).get().then(res => {
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

function cateGoods(shops_id, cateName, orderType, page,searchWord){
  var cateType;
  switch (orderType) {
    case 0:
      cateType = 'goods_price';
      break;
    case 1:
      cateType = 'goods_sale_num';
      break;
    case 2:
      cateType = 'add_time';
      break;
    default: 
    cateType = 'goods_price';
      break;
  }
  // return cateType;
  var coll = cloud.database().collection('goods_list');
  if(cateName && cateName != ''){
    coll = coll.where({
      goods_cate_name: cateName,
      shop_id: shops_id
    });
  }else{
    coll = coll.where({
      shop_id: shops_id
    });
  }
  return coll.field({
    goods_desc: true,
    goods_image: true,
    goods_name: true,
    goods_price: true,
    goods_id: true,
    goods_sale_num : true,
    add_time: true,
    shop_id : true
  }).orderBy(cateType,'asc').skip( page *4).limit(4).get().then(res=>{
    return res.data;
  });

}