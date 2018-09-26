// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var goods_type = event.goods_type;
  var shops_id = event.shop_id;
  switch(goods_type){
    case 'server_goods':  //服务区商品
      return cloud.database().collection('goods_list').where({
          shop_id: shops_id
        }).field({
          goods_desc: true,
          goods_image: true,
          goods_name: true,
          goods_price: true,
          goods_id: true,
        }).get() 
      break;
    case 'common_goods':  //普通商品，默认
      
      break;
    case 'recommend_goods': //推荐商品
      break; 
  }
}
// 服务商品
function getServerGoods(CallBack,shops_id) {
  
  if(shops_id){
    cloud.database().collection('goods_list').where({
      shop_id : shops_id
    }).field({
      goods_desc:true,
      goods_image:true,
      goods_name:true,
      goods_price:true,
      goods_id:true,
    }).get({
      succecc : function(e){
        CallBack(e);
      }
    });
  }else{
    cloud.database().collection('goods_list').field({
      goods_desc: true,
      goods_image: true,
      goods_name: true,
      goods_price: true,
      goods_id: true,
    }).get({
      succecc: function (e) {
        CallBack(e);
      }
    });
  }

}