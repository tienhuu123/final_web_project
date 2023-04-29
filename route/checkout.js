const path = require('path')
const axios = require('axios')
const connect = require('../database/connect')
const crypto = require('crypto');
const nodemailer = require('nodemailer');

let home = async (req, res, next) => {
    let city = await axios.get(`https://provinces.open-api.vn/api/p/${req.body.city}`)
    let district = await axios.get(`https://provinces.open-api.vn/api/d/${req.body.district}`)
    let ward = await axios.get(`https://provinces.open-api.vn/api/w/${req.body.ward}`)


    const address = `${req.body.address}, ${district.data.name},${ward.data.name},${city.data.name}`
    if (req.body.type == "code") {
        let query = `insert into public.invoice (date, cart_id,status,user_id,phone,fullname,address) select to_timestamp(${new Date() / 1000}),id,0,'${req.session.user.username}','${req.body.phone}','${req.body.fullname}','${address}' from public.cart where user_id = '${req.session.user.username}' and status = 0`
        let result = await connect.query(query)
        let query2 = `update public.cart set status = 1 where id= ${req.body.cartid}`

        let result2 = await connect.query(query2)
        let result5 = await connect.query(`select * from public.cart_detail where cart_id= ${req.body.cartid}`)

        let result4
        if (result5.rowCount > 0) {
            let updatequantity = result5.rows.reduce((init, item) => {
                return init += `update public.product set quantity = quantity - ${item.product_quantity} where id = '${item.product_id}'`;
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

    }
    if (req.body.type == "momo") {
        let result5 = await connect.query(`select * from public.cart_detail as cd,public.product as p  where cd.cart_id= ${req.body.cartid} and cd.product_id = p.id`)
        let total = result5.rows.reduce((init,item,i)=>{
            return init+= item.product_quantity* item.price
        },0)
        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = "pay with MoMo";
        var redirectUrl = `http://localhost:3000/success?cartid=${req.body.cartid}&address=${address}&phone=${req.body.phone}&fullname=${req.body.fullname}`;
        var ipnUrl = "https://callback.url/notify";
        var amount = total;
        var requestType = "captureWallet"
        var extraData = ""; //pass empty value if your merchant does not have stores
        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
        //puts raw signature
        //signature
        var signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'en'
        });
        //Create the HTTPS objects
        const https = require('https');
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        }
        //Send the request and get the response
        const reqq = https.request(options, ress => {

            ress.setEncoding('utf8');
            ress.on('data', (body) => {
                console.log(JSON.parse(body).payUrl)
                res.redirect(JSON.parse(body).payUrl);
            });
            ress.on('end', () => {
                console.log('No more data in response.');
            });
        })
        reqq.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        reqq.write(requestBody);
        reqq.end();
    }
}
module.exports = home
