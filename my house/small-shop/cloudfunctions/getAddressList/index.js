// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let openId = event.userInfo.openId;
  let addressId = event.addressId;
  if(addressId && addressId != ''){
    return cloud.database().collection('address_list').where({
      _openid: openId,
      _id: addressId
    }).field({
      addressDetail: true,
      _id: true,
      city: true,
      district: true,
      isDefault: true,
      phone: true,
      province: true,
      name: true
    }).get();
  }else{
  return cloud.database().collection('address_list').where({
    _openid: openId
  }).field({
    addressDetail : true,
    _id : true,
    city : true,
    district : true,
    isDefault : true,
    phone : true,
    province : true,
    name : true
  }).get();
  }
}