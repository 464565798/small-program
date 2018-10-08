// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let openId = event.userInfo.openId;
  let addressId = event.addressId;
 return cloud.database().collection('address_list').where({
    _openid : openId,
    isDefault: true
  }).update({
    data:{
      isDefault : false
    }
  }).then(res=>{
    return cloud.database().collection('address_list').where({
      _openid: openId,
      _id: addressId
    }).update({
      data: {
        isDefault: true
      }
    }).then(res=>{
      return 'success';
    });
  });
  

}