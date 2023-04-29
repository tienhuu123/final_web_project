const path = require('path')
const axios = require('axios')
const connect = require('../database/connect')
const crypto = require('crypto');
const nodemailer = require('nodemailer');

let home = async (req, res, next) => {


    if (req.query.resultCode == 0) {
        let query = `insert into public.invoice (date, cart_id,status,user_id,phone,fullname,address) select to_timestamp(${new Date() / 1000}),id,0,'${req.session.user.username}','${req.query.phone}','${req.query.fullname}','${req.query.address}' from public.cart where user_id = '${req.session.user.username}' and status = 0 `
        let result = await connect.query(query)
        let query2 = `update public.cart set status = 1 where id= ${req.query.cartid}`

        let result2 = await connect.query(query2)
        let result5 = await connect.query(`select * from public.cart_detail where cart_id= ${req.query.cartid}`)

        let result4
        if (result5.rowCount > 0) {
            let updatequantity = result5.rows.reduce((init, item) => {
                return init += `update public.product set quantity = quantity - ${item.product_quantity} where id = '${item.product_id}';`
            }, "")
            async function sendMail(from, to, subject, text, html) {
                try {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: "huutien1507@gmail.com", // generated ethereal user
                            pass: "tkgjcmywepqqrpfn", // generated ethereal password
                        }, tls: {
                            rejectUnauthorized: false
                        }
                    });

                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: from, // sender address
                        to: to, // list of receivers
                        subject: subject, // Subject line
                        text: text, // plain text body
                        html: html, // html body
                    });

                    console.log("Message sent: %s", info.messageId);
                } catch (err) {
                    console.error(err);
                }
            }
            sendMail(
                '"butuni"<huutien1507@gmail.com>', // from
                // req.session.user.email, // to
                'vothanhnamphuong20@gmail.com',
                'Test Email', // subject
                'Đơn hàng của bạn đang đợi xác nhận!', // plain text body
                '<h1>Hello World!</h1>' // html body
            );
            result4 = await connect.query(updatequantity)
            res.redirect('../user/invoice')
        } else {
        }

    }else{
        res.redirect('http://localhost:3000/checkout')
    }

    
}
module.exports = home

