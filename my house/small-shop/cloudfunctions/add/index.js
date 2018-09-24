// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const fs = require('fs');
const path = require('path')
// 云函数入口函数
exports.main = async (event, context) => {
  // return{

  //   sum : event.a + event.b

  // }
  // return new Promise((resolve,object)=>{
  //   setTimeout(()=>{
  //     resolve({ sum: event.a + event.b});
  //   },3000);
  // });


  // var result = db.collection('user_list').get();

  // const fileStream = fs.createReadStream(__dirname + 'index.txt')
  var data = fs.readFileSync(__dirname + '/car.jpg', 'utf8');
  // console.log(data);
  return __dirname;

}