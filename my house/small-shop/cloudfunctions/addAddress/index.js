// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let openId = event.userInfo.openId;
  let address = event.address
  if (address._id){
   return cloud.database().collection('address_list').where({
      _openid : openId,
      _id: address._id
    }).update({
      data:{
        name: address.name,
        phone: address.phone,
        province: address.province,
        city: address.city, 
        district: address.district,
        addressDetail: address.addressDetail,
        isDefault: address.isDefault
      }
    }).then(res=>{
      return res.stats.updated;
    });

  }else{
  return cloud.database().collection('address_list').add({
      data: {
        _openid: openId,
        name: address.name,
        phone: address.phone,
        province: address.province,
        city: address.city,
        district: address.district,
        addressDetail: address.addressDetail,
        isDefault: false
      }
    }).then(res => {
      return res.stats.updated;
    });

  }
}