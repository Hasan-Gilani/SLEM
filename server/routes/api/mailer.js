const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Record = require("../../models/Records")

function deadlineMailSender(){
    // Math.floor((date2 - date1) / (1000*60*60*24))
    Record.find({ "books": {}})
        .then()
        .catch()
}

/*
cron.schedule("*//*3 * * * * *", () => {
    Record.aggregate([{$project: {_id: 0,  id: true,books: true}}])
        .then(ans =>{
            ans.forEach(each => {
                console.log(each.id)
                each.books.forEach(i => {
                    console.log(i.isbn, i.rdate, i.rdate - (new Date()));
                });
            })
            console.log("Huzzah")
        })
        .catch(err => console.log(err));
});
*/
function sendMail(fromID, toID) {
    let mailOptions = {
        from: fromID,
        to: toID,
        subject: 'Test Mail',
        text: 'El O El',
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromID,
            pass: '05012000gilani14',
        }
    });
    // cron.schedule('')
    transporter.sendMail(mailOptions)
        .then( any => {
        console.log('mail sent');
    })
        .catch(err => console.log(err));

}
module.exports = sendMail;
