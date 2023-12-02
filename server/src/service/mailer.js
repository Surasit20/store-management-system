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
        //listInsallments.push(item)
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
    let tempResulUser  = resulUser.filter(x => x.USER_ID === tempMotorcycle[0].USER_ID && x.USER_ID !== null);
    temp = [item,tempResulUser[0]]
    dataResult.push(temp)

  })

  var _sendEmail = []

  dataResult.forEach(async (element) =>  {
    var item = [];
    console.log(element[1].USER_EMAIL)
    console.log(element[0].MONTH_INSTALLMENTS_DATE)
    item['from'] = 'wesringoki@gmail.com'
    item['to'] = element[1].USER_EMAIL
    item['subject'] = "แจ้งการชำระค่างวด"
    item['text'] = "งวดที่" + element[0].MONTH_INSTALLMENTS_DATE
    item['html'] = `<b>งวดที่  ${element[0].MONTH_INSTALLMENTS_DATE}</b>`

    var _sendEmail = await transporter.sendMail(_sendEmail);
  });
    //    var _sendEmail = await transporter.sendMail({
    //   from: 'wesringoki@gmail.com', // sender address
    //   to: element[1].USER_EMAIL, // list of receivers
    //   subject: "แจ้งการชำระค่างวด", // Subject line
    //   text: "งวดที่" + element[0].MONTH_INSTALLMENTS_DATE, // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });
  
  }
  catch(error){
    console.log(error)
  }
    
  }




module.exports  = sendEmail;