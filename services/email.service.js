const nodemailer = require('nodemailer');

const config = require('config');
let mailConfig = config.get('appConfig.mailConfig');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure, // true for 465, false for other ports
    auth: {
        user: mailConfig.username, // generated ethereal user
        pass: mailConfig.password // generated ethereal password
    }
});

var sendInvoice = (bookingInfo, subject) => {
    const output = `
      
    <div style="width: 800px; padding:10px;">
        <div style="width: 100%; height: 170px;">
            <div style=" width: 400px; float: left;">
                <h2>
                    Luxo Cabs
                </h2>
                <small><p>ACN : 617385967</p>
                <p> 0452 622 391</p>
                <p>orders@luxocabs.com.au</p></small>
            </div>
            <div style=" width: 350px;float: right; text-align: right">
                <h2> Invoice </h2>
                <small>
                    <p><strong>Invoice No :</strong> &nbsp;&nbsp;&nbsp;&nbsp; A203</p>
                    <p><strong>Date :</strong> &nbsp;&nbsp;&nbsp;&nbsp; Date</p>
                    <p><strong>Terms :</strong> &nbsp;&nbsp;&nbsp;&nbsp; NET 14</p>
                </small>
            </div>
        </div>
        <div style="background: #f7f7f7; text-align: left; padding:20px ;">
            <table>
                <tr>
                    <th>Bill to :</th><td> ${bookingInfo.firstName} ${bookingInfo.lastName}</td>
                </tr>
            </table>
        </div>
        <div>
             <div style=" text-align: left; padding:10px ;">
                    <div style="border-bottom: 2px solid blue;border-top: 2px solid blue;">
                        <table  >
                            <tr style="width: 600px; font-weight: 500">
                                <th style="padding: 10px; width: 330px;"> Description </th>
                                <th style="padding: 10px; width: 90px; text-align: right">Quantity</th>
                                <th style="padding: 10px; width: 90px; text-align: right">Rate</th>
                                <th style="padding: 10px; width: 90px;text-align: right ">Service fees </th>
                                <th style="padding: 10px; width: 90px; text-align: right">Amount</th>
                            </tr>
                        </table>
                    </div>
                    <div style="border-bottom: 1px solid #7a7a7c;">
                        <table>
                            <tr style="width:600px; font-weight: 300">
                                <td style="width: 330px ;padding: 10px; ">${bookingInfo.pickupAddress} To ${bookingInfo.destinationAddress}</td>
                                <td style="width: 90px ;padding: 10px; text-align: right"></td>
                                <td style="width: 90px ;padding: 10px; text-align: right">$${bookingInfo.totalFare}</td>
                                <td style="width: 90px ;padding: 10px; text-align: right">${bookingInfo.serviceFee}%</td>
                                <td style="width: 90px ;padding: 10px; text-align: right">$${bookingInfo.totalFare}</td>
                            </tr>
                        </table>
                    </div>          
            </div>
        
        </div>
        <div>
            <div style="width: 50%; float: left; padding:10px; background: #cecedd">
                    <p style="float: left;">
                        <strong>Payment Detail</strong> <br><br>
                        Chhabra Service Pty Ltd<br>
                        BSB : 083297<br>
                        ACC : 718104351<br>
                    </p>
                    <div style="color: green; font-size: 40px; font-weight: 500; float: right; ">
                    <p style="border: 5px solid green; border-radius: 10px; padding: 3px;"> Paid</p>
                </div>
            </div>
            <div style="width: 40%;  padding: 10px ; float: right;">
                <table>
                    <tr>
                        <th style="width: 200px; padding: 3px; text-align: right;">
                            Subtotal
                        </th>
                        <td  style="width: 200px; padding: 3px; text-align: right;">
                            $432
                        </td>
                    </tr>
                    <tr>
                            <th style="width: 200px; padding: 3px; text-align: right;">
                                Service Fees 
                            </th>
                            <td  style="width: 200px; padding: 3px; text-align: right;">
                                5%
                            </td>
                        </tr>
                        <tr>
                                <th style="width: 200px; padding: 3px; text-align: right;">
                                    Total
                                </th>
                                <td  style="width: 200px; padding: 3px; text-align: right;">
                                    5%
                                </td>
                            </tr>
                            <tr>
                                    <th style="width: 200px; padding: 3px; text-align: right;">
                                        PAID
                                    </th>
                                    <td  style="width: 200px; padding: 3px; text-align: right;">
                                        $23
                                    </td>
                                </tr>
                </table>
                <div style="border-bottom: 2px solid blue;border-top: 2px solid blue; "> 
                    <table>
                        <tr>
                                <th style="width: 200px; padding: 3px; text-align: right; font-size: 25px;">
                                        Balance Due
                                    </th>
                                    <th style="width: 200px; padding: 3px; text-align: right;  font-size: 25px;">
                                            $0.00
                                        </th>          
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    `;

    // setup email data with unicode symbols
    let mailOptions = {
        from: mailConfig.username, // sender address
        to: bookingInfo.email, // list of receivers
        subject: subject, // Subject line
        //text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        console.log("Mail sent")
    });

}

module.exports = sendInvoice;