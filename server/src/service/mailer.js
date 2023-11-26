const BaseController = require('../controllers/base.controller.js');
const nodemailer = require("nodemailer");



   const sendEmail = async (app)=>{

  try{
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'wesringoki@gmail.com',
      pass: 'uhuuvhrzdueoeehm'
    }
  });

  let firstDate = Date.now();

  let listEmail = [];
  let listInsallments = [];

  let result = await app.get('db')["MONTH_INSTALLMENTS"].findAll({}); 


  result.forEach(item => {
    if(item.MONTH_INSTALLMENTS_DATE != null){
      secondDate = new Date(item.MONTH_INSTALLMENTS_DATE),
      timeDifference = Math.abs(secondDate.getTime() - firstDate);
      let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      if(differentDays == 7)
      {
        listInsallments.push(item)
      }  
      listInsallments.push(item)  
    }
 
  });


  const resulInsallments = await app.get('db')["INSTALLMENTS"].findAll({}); 
  const resulMotorcycle = await app.get('db')["MOTORCYCLE"].findAll({});
  const resulUser = await app.get('db')["USER"].findAll({});
  let dataResult =  []

  listInsallments.forEach(item=>
  {
    let temp = []
    let tempInsallments  = resulInsallments.filter(x => x.INSTALLMENTS_ID === item.INSTALLMENTS_ID);
    let tempMotorcycle  = resulMotorcycle.filter(x => x.MOTORCYCLE_ID === tempInsallments[0].MOTORCYCLE_ID);
    let tempResulUser  = resulUser.filter(x => x.USER_ID === tempMotorcycle[0].USER_ID);
    temp = [item,tempResulUser[0]]
    dataResult.push(temp)

  })

//   const joinedArray = listInsallments.map(item1 => ({
//     ...item1,
//     ...resulInsallments1.find(item2 => parseInt(item2.INSTALLMENTS_ID) == item1.INSTALLMENTS_ID)
// }));


//    let arr1 = listInsallments.map((item, i) =>Object.assign({}, item,  resulInsallments.find(item2 => parseInt(item2.INSTALLMENTS_ID) == 6).MOTORCYCLE_ID ))
//  console.log(arr1[0].MOTORCYCLE_ID)



  // let arr2 = arr1.map((item, i) =>
  // Object.assign({}, item, resulMotorcycle[i]))

  // let arr3 = arr2.map((item, i) =>
  // Object.assign({}, item, resulUser[i]))


  dataResult.forEach(async (element) =>  {
    console.log(element[1].USER_EMAIL)
    console.log(element[0].MONTH_INSTALLMENTS_DATE)
    
    //    var _sendEmail = await transporter.sendMail({
    //   from: 'wesringoki@gmail.com', // sender address
    //   to: element[1].USER_EMAIL, // list of receivers
    //   subject: "แจ้งการชำระค่างวด", // Subject line
    //   text: "งวดที่" + element[0].MONTH_INSTALLMENTS_DATE, // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });
  });
 


  
  }
  catch(error){
    console.log(error)
  }
    
  }




module.exports  = sendEmail;