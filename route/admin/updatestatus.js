const nodemailer = require('nodemailer');

const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {
    let query
    if (req.query.type == "cancel") {
        query = `update public.invoice set status = 2 where id = ${req.query.id}`
    } else {
        query = `update public.invoice set status = 1 where id = ${req.query.id}`
    }
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
    let result = await connect.query(query)

    res.redirect('/admin/managerinvoice')

}

module.exports = home